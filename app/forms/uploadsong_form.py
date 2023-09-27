from flask_wtf import FlaskForm
from wtforms import StringField, FileField, SubmitField, IntegerField
from wtforms.validators import DataRequired
from app.aws import ALLOWED_EXTENSIONS
from flask_wtf.file import FileAllowed, FileField

class UploadSongForm(FlaskForm):
    name = StringField('Name', validators=[DataRequired()])
    artist = StringField('Artist', validators=[DataRequired()])
    genre = StringField('Genre', validators=[DataRequired()])
    cover_photo = FileField('Cover Photo', validators=[FileAllowed(list(ALLOWED_EXTENSIONS))])
    file_path = FileField('File Path')
    duration = IntegerField('Duration', validators=[DataRequired()])
    submit = SubmitField('Upload')
