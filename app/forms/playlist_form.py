from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired

class PlaylistForm(FlaskForm):
    name = StringField('Playlist Name', validators=[DataRequired()])
    description = StringField('Description', validators=[DataRequired()])
