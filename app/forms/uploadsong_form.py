from flask_wtf import FlaskForm
from wtforms import StringField, FileField
from wtforms.validators import DataRequired

from flask_wtf.file import FileAllowed, FileField
from flask_wtf.file import FileField, FileAllowed, FileRequired

class UploadSongForm(FlaskForm):
    name = StringField('Name', validators=[DataRequired()])
    artist = StringField('Artist', validators=[DataRequired()])
    genre = StringField('Genre', validators=[DataRequired()])
    cover_photo = FileField('Cover Photo', validators=[FileRequired()])
    file_path = FileField('File Path', validators=[FileRequired()])
