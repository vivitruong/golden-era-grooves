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
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    file_path = db.Column(db.String, nullable=True)
    cover_photo = db.Column(db.String, nullable=True)
    duration = db.Column(db.Integer, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.now)
    updated_at = db.Column(db.DateTime, default=datetime.now)
    file_id = db.Column(db.Integer, db.ForeignKey("files.id"), nullable=False)
    file = db.relationship('File', back_populates='song', uselist=False, cascade="all, delete")
    user = db.relationship('User', back_populates='songs')
    playlist_songs = db.relationship('Playlist_Song', back_populates='song', cascade='all, delete-orphan')
    comments = db.relationship('Comment', back_populates='song', cascade='all, delete-orphan')
    liked_songs= db.relationship(
        'User',
        secondary=likes,
        back_populates='user_likes'
    )
    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'artist': self.artist,
            'genre': self.genre,
            'user_id': self.user_id,
            'file_path': self.file_path,
            'cover_photo': self.cover_photo,
            'duaration': self.duration,
            'fileId': self.file_id,
        }


    # When accessing liked_songs, it triggers a SELECT query to load the related songs immediately.
# user = User.query.get(user_id)
# liked_songs = user.liked_songs  # This executes a query to fetch the liked songs.
