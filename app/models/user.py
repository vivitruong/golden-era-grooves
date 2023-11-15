from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
from datetime import datetime
from .like import likes


class User(db.Model, UserMixin):
    __tablename__ = 'users'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(40), nullable=False, unique=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    first_name = db.Column(db.String(50), nullable=False)
    last_name = db.Column(db.String(50), nullable=False)
    bio = db.Column(db.String(2000), nullable=True)
    image_url = db.Column(db.String(1000), nullable=True)
    hashed_password = db.Column(db.String(255), nullable=False)
    # created_at = db.Column(db.DateTime, default=datetime.now)
    # updated_at = db.Column(db.DateTime, default=datetime.now)

    playlists = db.relationship('Playlist', back_populates='user', cascade='all, delete-orphan')
    songs = db.relationship('Song', back_populates='user', cascade='all, delete-orphan')
    likes = db.relationship('Like', back_populates='user', cascade='all, delete-orphan')

    comments = db.relationship("Comment", cascade='all, delete-orphan', back_populates='user')

    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email,
            'firstName': self.first_name,
            'lastName': self.last_name,
            'bio': self.bio,
            'imageUrl': self.image_url,


        }
