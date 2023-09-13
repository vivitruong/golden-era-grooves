from app.models import db, Playlist_Song, environment, SCHEMA

def seed_playlist_songs():
    playlist_songs1 = Playlist_Song(
        playlist_id=1,
        song_id=1,
    )
    playlist_songs2 = Playlist_Song(
        playlist_id=1,
        song_id=2,
    )
    playlist_songs3 = Playlist_Song(
        playlist_id=1,
        song_id=3,
    )
    playlist_songs4 = Playlist_Song(
        playlist_id=2,
        song_id=2,
    )
    playlist_songs5 = Playlist_Song(
        playlist_id=2,
        song_id=1,
    )
    db.session.add(playlist_songs1)
    db.session.add(playlist_songs2)
    db.session.add(playlist_songs3)
    db.session.add(playlist_songs4)
    db.session.add(playlist_songs5)

    db.session.commit()

def undo_playlist_songs():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.playlist_songs RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM playlist_songs")

    db.session.commit()
