from flask import Blueprint, jsonify, session, request
from flask_login import login_required, current_user
from app.models import Playlist, db, Playlist_Song, Song
from app.forms import PlaylistForm, AddSongForm

playlist_routes = Blueprint('playlists', __name__)

#get all playlist
@playlist_routes.route('/all')
def get_all():
    playlists = Playlist.query.all()
    return {
        'playlists': [playlist.to_dict() for playlist in playlists]
    }, 200

#get all user_playlists and returns them in a list of user_playlist dictionaries
@playlist_routes.route('/current')
def user_playlists():
    current_user_info = current_user.to_dict()
    current_user_id = current_user_info['id']

    user_playlists = Playlist.query.filter(Playlist.user_id == current_user_id).all()
    return {
        'playlists': [playlist.to_dict() for playlist in user_playlists]
    }, 200
#get a single playlist from user
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

#delete a playlist
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

#add a song to playlist
@playlist_routes.route('/<int:playlist_id>/songs', methods=['POST'])
@login_required
def add_song(playlist_id):
    current_user_info = current_user.to_dict()
    current_user_id = current_user_info['id']
    playlist = Playlist.query.get(playlist_id)

    if not playlist:
        return {'error' : {
            'message': 'Cannot find playlist',
            'statusCode': 404
        }}, 404

    form = AddSongForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    song_id = form.data['song_id']

    if playlist.user_id != current_user_id:
        return{
            'error': {
                'message': 'Forbidden',
                'statusCode': 403
            }
        }, 403
    if form.validate():
        added_song = Song.query.get(song_id)
        if not added_song:
            return {'error': {
                'message': 'This song does not exist',
                'statusCode': 403
            }}, 403
        if song_id in [s.song_id for s in playlist.playlist_songs]:
            return {
                'error': {
                    'message': 'This song already exist in this playlist',
                    'statusCode': 403
                }
            }, 403
        try:
            new_song = Playlist_Song(
                playlist_id = playlist_id,
                song_id = form.data['song_id']
            )
            db.session.add(new_song)
            db.session.commit()
        except Exception:
            return { 'error' : 'There is an error'}
    if form.errors:
        return{'error': form.errors}, 401

#delete a song from playlist
@playlist_routes.route('/songs/<int:song_id>', methods=['DELETE'])
@login_required
def delete_song(song_id):
    current_user_info = current_user.to_dict()
    current_user_id = current_user_info['id']
    delete_song = Playlist_Song.query.get(song_id)

    if not delete_song:
        return { 'error' : {
            'message': 'Cannot find song',
            'statusCode': 404
        }}, 404
    playlist = Playlist.query.get(delete_song.playlist_id)
    if playlist.user_id != current_user_id:
        return {'error': {
            'message': 'Forbidden',
            'statusCode': 403
        }}, 403
    db.session.delete(delete_song)
    db.session.commit()
    return {'message': 'This song has been successfully deleted'}
