from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime

class Like(db.Model):
    __tablename__ = 'likes'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    song_id = db.Column('songs', db.Integer, db.ForeignKey(add_prefix_for_prod('songs.id')), primary_key=True )

    # song = db.relationship('Song', back_populates='likes')
    # user = db.relationship('User', back_populates='likes')

    def to_dict(self):
        return{
            'id': self.id,
            'userId': self.user_id,
            'songId': self.song_id
        }
