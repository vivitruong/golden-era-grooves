from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime

class Comment(db.Model):
    __tablename__ = 'comments'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    comment = db.Column(db.String(1000))
    song_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('songs.id')), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.now)
    updated_at = db.Column(db.DateTime, default=datetime.now)

    song = db.relationship('Song', back_populates='comments')
    user = db.relationship('User', back_populates='comments')

    def to_dict(self):
        return{
            'id': self.id,
            'comment': self.comment,
            'songId': self.song_id,
            'userId': self.user_id
        }
