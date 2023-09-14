from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired

class UploadSongForm(FlaskForm):
    name = StringField('Name', validators=[DataRequired()])
    artist = StringField('Artist', validators=[DataRequired()])
    genre = StringField('Genre', validators=[DataRequired()])
    cover_photo = StringField('Cover Photo')
    file_path = StringField('File Path')
