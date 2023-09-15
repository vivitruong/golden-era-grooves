from flask import Blueprint, jsonify, session, request, app
from flask_login import login_required, current_user
from app.models import Playlist, db, Playlist_Song, Song
from app.forms import PlaylistForm, AddSongForm


playlist_routes = Blueprint('playlists', __name__)

#get all playlist(done)
@playlist_routes.route('/all')
def get_all():
    playlists = Playlist.query.all()
    return {
        'playlists': [playlist.to_dict() for playlist in playlists]
    }, 200

#get all user_playlists and returns them in a list of user_playlist dictionaries(done)
@playlist_routes.route('/current')
def user_playlists():
    current_user_info = current_user.to_dict()
    current_user_id = current_user_info['id']

    user_playlists = Playlist.query.filter(Playlist.user_id == current_user_id).all()
    return {
        'playlists': [playlist.to_dict() for playlist in user_playlists]
    }, 200
#get a single playlist from user(donme)
@playlist_routes.route('/<int:playlist_id>')
@login_required
def get_list(playlist_id):
    current_user_info = current_user.to_dict()
    current_user_id = current_user_info['id']

    playlist = Playlist.query.get(playlist_id)
    if not playlist:
        return {'error': {
            'message': 'Cannot find this playlist',
            'statusCode': 404
        }}, 404
    if playlist.user_id != current_user_id:
        return {'error': {
            'message': 'Forbidden',
            'statusCode': 403
        }}, 403
    return playlist.to_dict(), 200

#create playlist
@playlist_routes.route('/', methods=['POST'])
@login_required
def create_playlist():
    current_user_info = current_user.to_dict()
    current_user_id = current_user_info['id']
    form = PlaylistForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate():
        try:
            new_playlist = Playlist(
                name = form.data['name'],
                description = form.data['description'],
                user_id = current_user_id
            )
            db.session.add(new_playlist)
            db.session.commit()
            return new_playlist.to_dict(), 201
        except Exception:
            return {'error': 'There is an error, please try later'}, 500
    if form.errors:
        return {'error': form.errors}, 400

#update a playlist
@playlist_routes.route('/<int:playlist_id>', methods=['PUT'])
@login_required
def update_playlist(playlist_id):
    current_user_info = current_user.to_dict()
    current_user_id = current_user_info['id']
    update_playlist = Playlist.query.get(playlist_id)
    if update_playlist:
        if update_playlist.user_id == current_user_id:
            data = request.get_json()
            if data['name'].isspace() or not data['name']:
                return { 'error ': {
                    'message': 'Name cannot be blank',
                    'statusCode': 400
                }}, 400
            update_playlist.name = data['name']
            update_playlist.description = data['description']
            db.session.commit()
            return update_playlist.to_dict(), 200
        else:
            return {'error': {
                'message': 'Forbidden',
                'statusCode': 403
            }}, 403
    else:
        return { 'error' : {
            'message': 'Cannot find playlist',
            'statusCode': 404
        }}, 404

#delete a playlist(done)
@playlist_routes.route('/<int:playlist_id>', methods=['DELETE'])
@login_required
def delete_playlist(playlist_id):
    current_user_info = current_user.to_dict()
    current_user_id = current_user_info['id']
    delete_playlist = Playlist.query.get(playlist_id)
    if delete_playlist:
        if delete_playlist.user_id == current_user_id:
            db.session.delete(delete_playlist)
            db.session.commit()
            return {
                'message': 'Playlist has been successfully deleted'
            }
        else:
            return {
                'error': {
                    'message': 'Forbidden',
                    'statusCode': 403
                }
            }, 403
    else:
        return {
            'error': {
                'message': 'Cannot find playlist',
                'statusCode': 404
            }
        }, 404

#add a song to playlist(done)
@playlist_routes.route('/<int:playlist_id>/songs', methods=['POST'])
@login_required
def add_song(playlist_id):
    current_user_info = current_user.to_dict()
    current_user_id = current_user_info['id']
    playlist = Playlist.query.get(playlist_id)

    if not playlist:
        return {
            'error': {
                'message': 'Cannot find playlist',
                'statusCode': 404
            }
        }, 404

    form = AddSongForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if playlist.user_id != current_user_id:
        return {
            'error': {
                'message': 'Forbidden',
                'statusCode': 403
            }
        }, 403

    if not form.validate_on_submit():
        return {
            'error': {
                'message': 'Form validation failed',
                'statusCode': 400
            }
        }, 400

    song_id = form.data['song_id']
    added_song = Song.query.get(song_id)

    if not added_song:
        return {
            'error': {
                'message': 'This song does not exist',
                'statusCode': 404
            }
        }, 404

    if song_id in [s.song_id for s in playlist.playlist_songs]:
        return {
            'error': {
                'message': 'This song already exists in this playlist',
                'statusCode': 403
            }
        }, 403

    try:
        new_song = Playlist_Song(
            playlist_id=playlist_id,
            song_id=song_id
        )
        db.session.add(new_song)
        db.session.commit()
        return {
            'message': 'Song added to playlist successfully',
            'statusCode': 201
        }, 201
    except Exception as e:
        return {
            'error': {
                'message': 'Internal server error',
                'statusCode': 500
            }
        }, 500


#delete a song from playlist(done)
@playlist_routes.route('/songs/<int:playlist_id>/<int:song_id>', methods=['DELETE'])
@login_required
def delete_song(playlist_id,song_id):
    current_user_info = current_user.to_dict()
    current_user_id = current_user_info['id']

    # Check if the playlist exists
    playlist = Playlist.query.get(playlist_id)
    if not playlist:
        return {
            'error': {
                'message': 'Cannot find playlist',
                'statusCode': 404
            }
        }, 404

    # Check if the song exists
    song = Playlist_Song.query.filter_by(playlist_id=playlist_id, song_id=song_id).first()
    if not song:
        return {
            'error': {
                'message': 'Cannot find song in the playlist',
                'statusCode': 404
            }
        }, 404

    # Check if the user has permission to delete the song from the playlist
    if playlist.user_id != current_user_id:
        return {
            'error': {
                'message': 'Forbidden',
                'statusCode': 403
            }
        }, 403

    # Delete the song from the playlist
    db.session.delete(song)
    db.session.commit()

    return {
        'message': 'This song has been successfully deleted from the playlist',
        'statusCode': 200
    }, 200
