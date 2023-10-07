from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, FileField
from wtforms.validators import DataRequired
from app.models import Song
import os

class SongForm(FlaskForm):
  # user_id = IntegerField('User Id', validators=[DataRequired()])
  name = StringField('Title', validators=[DataRequired()])
  genre = StringField('Genre', validators=[DataRequired()])
  artist = StringField('Artist', validators=[DataRequired()])
  # cover_photo  = FileField('Cover Photo')
  # file_path = FileField('File Path')
