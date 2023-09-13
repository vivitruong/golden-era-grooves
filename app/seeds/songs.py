from app.models import db, Song, environment, SCHEMA

def seed_songs():
    demo_song1 = Song(
        user_id = 1,
        name='Melody',
        genre='Instrumental',
        artist='Batman',
        cover_photo='https://goldeneragrooves.s3.us-east-2.amazonaws.com/avatar1.png',
        file_path='https://goldeneragrooves.s3.us-east-2.amazonaws.com/a-small-miracle-132333.mp3'
    )
    demo_song2 = Song(
        user_id = 1,
        name='Eternal Echoes',
        genre='Pop',
        artist='Vivi',
        cover_photo='https://goldeneragrooves.s3.us-east-2.amazonaws.com/avatar2.png',
        file_path='https://goldeneragrooves.s3.us-east-2.amazonaws.com/cinematic-fairy-tale-story-main-8697.mp3'

    )
    demo_song3 = Song(
        user_id = 1,
        name='Midnight Serenade',
        genre='Rock',
        artist='50cent',
        cover_photo='https://goldeneragrooves.s3.us-east-2.amazonaws.com/avatar3.png',
        file_path='https://goldeneragrooves.s3.us-east-2.amazonaws.com/forest-lullaby-110624.mp3'

    )
    demo_song4 = Song(
        user_id = 2,
        name='Sunset Serenity',
        genre='Country',
        artist='Lily Aurora',
        cover_photo='https://goldeneragrooves.s3.us-east-2.amazonaws.com/avatar4.png',
        file_path='https://goldeneragrooves.s3.us-east-2.amazonaws.com/just-relax-11157.mp3'

    )
    demo_song5 = Song(
        user_id = 2,
        name='Golden Memories',
        genre='Blues',
        artist='Leo Stone',
        cover_photo='https://goldeneragrooves.s3.us-east-2.amazonaws.com/avatar5.png',
        file_path='https://goldeneragrooves.s3.us-east-2.amazonaws.com/lofi-study-112191.mp3'

    )
    demo_song6 = Song(
        user_id = 1,
        name='Starry Dreams',
        genre='Jazz',
        artist='Oliver Rain',
        cover_photo='https://goldeneragrooves.s3.us-east-2.amazonaws.com/avatar6.png',
        file_path='https://goldeneragrooves.s3.us-east-2.amazonaws.com/loneliness-of-the-winner-110416.mp3'

    )
    demo_song7 = Song(
        user_id = 3,
        name='Melody',
        genre='Classical',
        artist='Nova Starling',
        cover_photo='https://goldeneragrooves.s3.us-east-2.amazonaws.com/avatar7.png',
        file_path='https://goldeneragrooves.s3.us-east-2.amazonaws.com/relaxed-vlog-night-street-131746.mp3'

    )
    demo_song8 = Song(
        user_id = 3,
        name='Dancing in Moonlight',
        genre='Reggae',
        artist='One direction',
        cover_photo='https://goldeneragrooves.s3.us-east-2.amazonaws.com/avatar8.png',
        file_path='https://goldeneragrooves.s3.us-east-2.amazonaws.com/relaxing-145038.mp3'

    )
    db.session.add(demo_song1)
    db.session.add(demo_song2)
    db.session.add(demo_song3)
    db.session.add(demo_song4)
    db.session.add(demo_song5)
    db.session.add(demo_song6)
    db.session.add(demo_song7)
    db.session.add(demo_song8)
    db.session.commit()

def undo_songs():
        if environment == "production":
            db.session.execute(f"TRUNCATE table {SCHEMA}.songs RESTART IDENTITY CASCADE;")
        else:
            db.session.execute("DELETE FROM songs")

        db.session.commit()
