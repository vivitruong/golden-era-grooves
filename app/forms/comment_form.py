from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired

class CommentForm(FlaskForm):
    song_id = IntegerField('Song ID', validators=[DataRequired()])
    user_id = IntegerField('User ID', validators=[DataRequired()])
    comment = StringField('Comment', validators=[DataRequired()])
