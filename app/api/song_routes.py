from flask import Blueprint, jsonify, session, request
from flask_login import login_required, current_user
from app.models import db, Song, Comment, likes, User
from app.forms import CommentForm, LikeForm, UploadSongForm, SongForm
from app.aws import (upload_file_to_s3, allowed_file, get_unique_filename)
from app.api.auth_routes import validation_errors_to_error_messages
from sqlalchemy import select, func
import base64
import json
from requests import post, get
from dotenv import load_dotenv
import os

load_dotenv()
client_id = os.environ.get('CLIENT_ID')
client_secret = os.environ.get('CLIENT_SECRET')

def get_token():
    auth_string = client_id + ":" + client_secret
    auth_bytes = auth_string.encode("utf-8")
    auth_base64 = str(base64.b64encode(auth_bytes), 'utf-8')

    url = 'https://accounts.spotify.com/api/token'
    headers = {
        'Authorization': 'Basic ' + auth_base64,
        'Content-Type': 'application/x-www-form-urlencoded'
    }
    data = {'grant_type': 'client_credentials'}
    result = post(url, headers=headers, data=data)
    json_result = json.loads(result.content)
    token = json_result['access_token']
    return token

def get_auth_header(token):
    return {'Authorization': 'Bearer ' + token}
#search artist
def search_for_artist(token, artist_name):
    url = 'http://api.spotify.com/v1/search'
    headers = get_auth_header(token)
    query = f'?q={artist_name}&type=artist&limit=1'

    query_url = url + query
    result = get(query_url, headers=headers)
    json_result = json.loads(result.content)['artists']['items']
    if len(json_result) == 0:
        print('No artist with this name exists...')
        return None
    return json_result[0]
#search songs
def get_songs_by_artist(token, artist_id):
    url = f'http://api.spotify.com/v1/artists/{artist_id}/top-tracks?country=US'
    headers = get_auth_header(token)

    result = get(url, headers=headers)
    json_result = json.loads(result.content)['tracks']

    return json_result




# token = get_token()
# # result1 = search_for_artist(token, 'ACDC')
# # artist_id = result1['id']
# songs = get_songs_by_artist(token, artist_id)
# for idx, song in enumerate(songs):
#     print(f"{idx+1}. {song['name']}")



song_routes = Blueprint('songs', __name__)
#get all song(done)
@song_routes.route('/')
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

    print('Request Files:', request.files)  #

    if request.files.get('file_path'):
        songfile = request.files['file_path']
        print('Received file_path:', songfile.filename)
        songfile.filename = get_unique_filename(songfile.filename)
        upload = upload_file_to_s3(songfile)

        if "url" not in upload:
            return {'errors': validation_errors_to_error_messages(upload)}, 400
        song_url = upload["url"]
    else:
        song_url = None

    if request.files.get('cover_photo'):
        coverphoto = request.files['cover_photo']
        print('Received cover_photo:', coverphoto.filename)
        coverphoto.filename = get_unique_filename(coverphoto.filename)
        upload2 = upload_file_to_s3(coverphoto)

        if 'url' not in upload2:
            return {'errors': validation_errors_to_error_messages(upload2)}, 400
        coverphoto_url = upload2['url']
    else:
        coverphoto_url = None

    if form.validate_on_submit():
        new_song = Song(
            name=form.data['name'],
            artist=form.data['artist'],
            genre=form.data['genre'],
            cover_photo=coverphoto_url,
            file_path=song_url,
            user_id=current_user_id
        )
        db.session.add(new_song)
        db.session.commit()
        return new_song.to_dict(), 201

    return jsonify({'error': 'Invalid form data'}), 400


#update a song(done
@song_routes.route('/<int:song_id>', methods=['PUT'])
@login_required
def update_song(song_id):
    update_song = Song.query.get(song_id)
    form = UploadSongForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        form.populate_obj(update_song)
        db.session.add(update_song)
        db.session.commit()
        return update_song.to_dict(), 201
    else:

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
    result = [{'song': item.name, 'artist': item.artist, 'id': item.id} for item in Song.query.filter(Song.name.ilike(f'%{keyword}%') | Song.artist.ilike(f'%{keyword}%')).order_by(
            func.char_length(func.replace(Song.name, keyword, '')),
            func.char_length(func.replace(Song.artist, keyword, ''))
    ).limit(10)]
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

#get all likes for a song by song id(done)
@song_routes.route('<int:song_id>/likes')
def all_like(song_id):
    stmt = select(likes)
    result = db.session.execute(stmt)

    all_like = result.fetchall()
    filtered = filter(lambda like: like[1] == song_id, all_like)
    dict_version = dict(filtered)

    valuesI = dict_version.values()
    total_likes = len(list(valuesI))
    return {'likes': total_likes}, 200
    # all_like = db.session.execute(db.select(likes).fetchall())
    # filtered = filter(lambda like: like[1] == song_id, all_like)
    # dict_version = dict(filtered)

    # valuesI = dict_version.values()
    # total_likes = len(list(valuesI))
    # return {'likes': total_likes}, 200

#create like for a song by song-id(maybe) will check back when test with react.
@song_routes.route('<int:song_id>/likes', methods=['POST'])
def post_like(song_id):
    form = LikeForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        user_id = form.users.data
        selected_songs = Song.query.get(song_id)
        selected_users = User.query.get(user_id)

        if selected_songs is None:
            return jsonify({'error': 'Song not found'}), 404

        if selected_users is None:
            return jsonify({'error': 'User not found'}), 404

        if selected_users in selected_songs.liked_songs:
            selected_songs.liked_songs.remove(selected_users)
            db.session.commit()
            return all_like(song_id)
        else:
            selected_songs.liked_songs.append(selected_users)
            db.session.commit()
            return all_like(song_id)

    return jsonify({'error': 'Invalid form data'}), 400
