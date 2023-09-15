from flask import Blueprint, jsonify, session, request
from flask_login import login_required, current_user
from app.models import db, Song, Comment, likes, User
from app.forms import CommentForm, LikeForm, UploadSongForm, SongForm
from app.aws import (upload_file_to_s3, allowed_file, get_unique_filename)


song_routes = Blueprint('songs', __name__)
#get all song(done)
@song_routes.route('/all')
def get_all_songs():
    songs = Song.query.all()
    return {'songs': [song.to_dict() for song in songs]}, 200

#get all song of a current user(done)
@song_routes.route('/current')
def user_songs():
    current_user_info = current_user.to_dict()
    current_user_id = current_user_info['id']
    songs = Song.query.filter(Song.user_id == current_user_id).all()
    return {'songs': [song.to_dict() for song in songs]}, 200

#get a song(done)
@song_routes.route('/<int:song_id>', methods=['GET'])
def get_song(song_id):
    song_info = Song.query.get(song_id)
    if song_info:
        return song_info.to_dict(),201
    else:
        return {'error': {
            'message': 'Cannot find this song',
            'statusCode': 404
        }},404


@song_routes.route('/', methods=['POST'])
@login_required
def upload_song():
    current_user_info = current_user.to_dict()
    current_user_id = current_user_info['id']
    form = UploadSongForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        song_file = request.files.get('file_path')
        # Check if the file has an allowed extension (e.g., mp3, wav)
        if not allowed_file(song_file.filename):
            return jsonify({'error': 'Invalid file format'}), 400
         # Generate a unique filename for the uploaded song
        # unique_filename = get_unique_filename(song_file.filename)

        #upload to s3
        result = upload_file_to_s3(song_file)

        if 'url' in result:
            s3_url = result['url']

            new_song = Song(
                name=form.data['name'],
                artist = form.data['artist'],
                genre = form.data['genre'],
                cover_photo = form.data['cover_photo'],
                file_path = s3_url
            )
            db.session.add(new_song)
            db.session.commit()
            return new_song.to_dict(), 201
        else:
            return jsonify({'error': 'Failed to upload song'}), 500
    return jsonify({'error': 'Invalid form data'}), 400




#update a song
@song_routes.route('/<int:song_id>', methods=['PUT'])
@login_required
def update_song(song_id):
    update_song = Song.query.get(song_id)
    form = SongForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        form.populate_obj(update_song)
        db.session.add(update_song)
        db.session.commit()
        return update_song.to_dict(), 201
    else:
        # Handle the case where form validation fails, for example, return an error response.
        return {"errors": form.errors}, 400

#delete a song(done)
@song_routes.route('/<int:song_id>', methods=['DELETE'])
@login_required
def delete_song(song_id):
    current_user_info = current_user.to_dict()
    current_user_id = current_user_info['id']
    delete_song = Song.query.get(song_id)
    if delete_song:
        if delete_song.user_id == current_user_id:
            db.session.delete(delete_song)
            db.session.commit()
            return {
                'message': 'Succesfully delete this song'
            }
        else :
            return { 'error': {
                'message': 'Forbidden',
                'statusCode': 403
            }}, 403
    else:
        return{
            'error': {
                'message': 'Cannot find this song',
                'statusCode': 404
            }
        }, 404

#search song
@song_routes.route('/search/<string:keyword>')
def search_music(keyword):
    result = [{'song': item.name, 'artist': item.artist, 'id': item.id} for item in Song.query.filter(Song.name.ilike(f'%{keyword}%') | Song.artist.ilike(
    f'%{keyword}%')).order_by(Song.name.startswith(keyword), Song.artist.startswith(keyword)).limit(10)]
    return jsonify(result)



#get all comments base on a song(done)
@song_routes.route('/<int:song_id>/comments')
def all_comments(song_id):
    comments = Comment.query.filter(Comment.song_id == song_id)
    return {'comments': [comment.to_dict() for comment in comments]}, 200

#create a comment for song(done)
@song_routes.route('/<int:song_id>/comments', methods=['POST'])
@login_required
def post_comment(song_id):
    form = CommentForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        new_comment = Comment()
        form.populate_obj(new_comment)
        new_comment.song_id = song_id
        db.session.add(new_comment)
        db.session.commit()
        return new_comment.to_dict(), 201
    if form.errors:
        return {
            'errors': form.errors
        }, 400

#update a comment for a song(done)
@song_routes.route('/comments/<int:comment_id>', methods=['PUT'])
@login_required
def update_comment(comment_id):
    current_user_info = current_user.to_dict()
    current_user_id = current_user_info['id']
    comment = Comment.query.get(comment_id)
    form = CommentForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if not comment:
        return jsonify({"error": "Comment not found"}), 404
    if comment.user_id != current_user_id:
        return jsonify({'errors': 'Unauthorized'}), 403

    if form.validate_on_submit():
        form.populate_obj(comment)
        db.session.add(comment)
        db.session.commit()
        return comment.to_dict(),200
    else:
        return jsonify({"errors": form.errors}), 400

#delete a comment(done)
@song_routes.route('/comments/<int:comment_id>', methods=['DELETE'])
@login_required
def delete_comment(comment_id):
    current_user_info = current_user.to_dict()
    current_user_id = current_user_info['id']
    comment = Comment.query.get(comment_id)

    if not comment:
        return jsonify({'error': 'Comment not found'}), 404
    if comment.user_id != current_user_id:
        return jsonify({'error': 'Unauthorized'}), 403

    try:
        db.session.delete(comment)
        db.session.commit()
        return jsonify({'message': 'Comment deleted successfully'}), 200
    except Exception:
        return {'error': 'There is an error'}, 500
