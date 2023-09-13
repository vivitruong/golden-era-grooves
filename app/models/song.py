from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime
from .like import likes
class Song(db.Model):
    __tablename__ = 'songs'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}


    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    artist = db.Column(db.String, nullable=False)
    genre = db.Column(db.String, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id'), nullable=False))
    file_path = db.Column(db.String, nullable=False)
    cover_photo = db.Column(db.String, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.now)
    updated_at = db.Column(db.DateTime, default=datetime.now)

    user = db.relationship('User', back_populates='songs')
    playlist_songs = db.relationship('Playlist_Song', back_populates='song', cascade='all, delete-orphan')
    comments = db.relationship('Comment', back_populates='song', cascade='all, delete-orphan')
    song_likes = db.relationship(
        "User",
        secondary=likes,
        back_populates="user_likes"
  )
    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'artist': self.artist,
            'genre': self.genre,
            'userId': self.user_id,
            'filePath': self.file_path,
            'coverPhoto': self.cover_photo
        }
