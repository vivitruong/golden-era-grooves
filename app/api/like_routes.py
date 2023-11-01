from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import db, Like

like_routes = Blueprint('likes', __name__)

#get a list of all users like songs
@like_routes.route('', methods=['GET'])
@login_required
def get_user_likes():

    query = Like.query.filter(Like.user_id == current_user.id)

    allLike = [like.to_dict() for like in query.all()]

    return jsonify({
        'user_id': current_user.id,
        'song_id': [like['song_id'] for like in allLike]
    }), 200

#create a like
@like_routes.route('', methods=['POST'])
@login_required
def add_like():
    body = request.get_json()
    query = Like.query.filter(Like.user_id == current_user.id)

    allLike = [like.to_dict() for like in query.all()]

    if body['song_id'] in [like['song_id'] for like in allLike]:
        return jsonify({
            'message': 'you already liked this song',
            'status_code': 200
        }),200

    try:
        post_like = Like(user_id=current_user.id, song_id = body['song_id'])
        db.session.add(post_like)
        db.session.commit()
        return jsonify({'id': post_like.id, 'user_id': post_like.user_id, 'song_id': post_like.song_id}), 200

    except:
        return jsonify({'message': 'Song couldnt be found', 'status_code': 404}),404

#delete like
@like_routes.route('/<int:song_id>', methods=['DELETE'])
@login_required
def delete_like(song_id):
    query = Like.query.filter(Like.user_id == current_user.id).filter(Like.song_id == song_id).first()

    if query is None:
        return jsonify({'message':'You havent liked this song yet', 'status_code': 404}), 404
    db.session.delete(query)
    db.session.commit()
    return jsonify({'message': 'You have successfully unlike this song', 'status_code': 200}), 200
