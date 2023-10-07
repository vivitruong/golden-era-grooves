from app.models import db, Song, environment, SCHEMA

def seed_songs():
    demo_song1 = Song(
        user_id = 1,
        name='Super Shy',
        genre='Pop',
        artist='New Jeans',
        cover_photo='https://goldeneragrooves.s3.us-east-2.amazonaws.com/avatar1.png',
        file_path='https://goldeneragrooves.s3.us-east-2.amazonaws.com/zamona-net-newjeans-super-shy.mp3'
    )
    demo_song2 = Song(
        user_id = 1,
        name='Cupid',
        genre='Pop',
        artist='Fifty Fifty',
        cover_photo='https://goldeneragrooves.s3.us-east-2.amazonaws.com/avatar2.png',
        file_path='https://goldeneragrooves.s3.us-east-2.amazonaws.com/zamona-net-fifty-fifty-cupid.mp3'

    )
    demo_song3 = Song(
        user_id = 1,
        name='So Sick',
        genre='R&B',
        artist='Ne Yo',
        cover_photo='https://goldeneragrooves.s3.us-east-2.amazonaws.com/avatar3.png',
        file_path='https://goldeneragrooves.s3.us-east-2.amazonaws.com/sosick.mp3'

    )
    demo_song4 = Song(
        user_id = 2,
        name='Hype Boy',
        genre='Pop',
        artist='New Jeans',
        cover_photo='https://goldeneragrooves.s3.us-east-2.amazonaws.com/avatar4.png',
        file_path='https://goldeneragrooves.s3.us-east-2.amazonaws.com/hyoeboy.mp3'

    )
    demo_song5 = Song(
        user_id = 2,
        name='Ditto',
        genre='Blues',
        artist='New Jeans',
        cover_photo='https://goldeneragrooves.s3.us-east-2.amazonaws.com/avatar5.png',
        file_path='https://goldeneragrooves.s3.us-east-2.amazonaws.com/Ditto.mp3'

    )
    demo_song6 = Song(
        user_id = 1,
        name='Mr. Brightside',
        genre='Jazz',
        artist='The Killers',
        cover_photo='https://goldeneragrooves.s3.us-east-2.amazonaws.com/avatar6.png',
        file_path='https://goldeneragrooves.s3.us-east-2.amazonaws.com/brightside.mp3'

    )
    demo_song7 = Song(
        user_id = 3,
        name='Complicated',
        genre='Hiphop',
        artist='Avril Lavigne',
        cover_photo='https://goldeneragrooves.s3.us-east-2.amazonaws.com/avatar7.png',
        file_path='https://goldeneragrooves.s3.us-east-2.amazonaws.com/Compilated.mp3'

    )
    demo_song8 = Song(
        user_id = 3,
        name='Cua',
        genre='Hip Hop',
        artist='Hon Chu Nhat',
        cover_photo='https://goldeneragrooves.s3.us-east-2.amazonaws.com/avatar8.png',
        file_path='https://goldeneragrooves.s3.us-east-2.amazonaws.com/Cua.mp3'

    )
    demo_song9 = Song(
        user_id = 3,
        name='Let Me Blow Ya Mind',
        genre='Hip Hop',
        artist='Eve ft Qwen Stefani',
        cover_photo='https://goldeneragrooves.s3.us-east-2.amazonaws.com/avatar9.png',
        file_path='https://goldeneragrooves.s3.us-east-2.amazonaws.com/letmeblow.mp3'
    )
    demo_song10 = Song(
        user_id = 3,
        name='Love Me Piano Cover by Vivi',
        genre='Hip Hop',
        artist='Yiruma',
        cover_photo='https://goldeneragrooves.s3.us-east-2.amazonaws.com/avatar10.png',
        file_path='https://goldeneragrooves.s3.us-east-2.amazonaws.com/Loveme.mp3'
    )
    demo_song11 = Song(
        user_id = 1,
        name='Maybe Piano Cover by Vivi',
        genre='Hip Hop',
        artist='Yiruma',
        cover_photo='https://goldeneragrooves.s3.us-east-2.amazonaws.com/avatar11.png',
        file_path='https://goldeneragrooves.s3.us-east-2.amazonaws.com/Maybe.mp3'
    )
    demo_song12 = Song(
        user_id = 1,
        name='Sprinter',
        genre='Hip Hop',
        artist='Central Cee',
        cover_photo='https://goldeneragrooves.s3.us-east-2.amazonaws.com/avatar2.png',
        file_path='hhttps://goldeneragrooves.s3.us-east-2.amazonaws.com/Spinter-centralCee.mp3'
    )
    demo_song13 = Song(
        user_id = 2,
        name='Anh Sao Va Bau Troi',
        genre='Ballad',
        artist='T.R.I x Ca',
        cover_photo='https://goldeneragrooves.s3.us-east-2.amazonaws.com/avatar1.png',
        file_path='https://goldeneragrooves.s3.us-east-2.amazonaws.com/anh+sao+bau+troo.mp3'
    )
    demo_song14 = Song(
        user_id = 3,
        name='Stay',
        genre='Ballad',
        artist='Black Pink',
        cover_photo='https://goldeneragrooves.s3.us-east-2.amazonaws.com/avatar3.png',
        file_path='https://goldeneragrooves.s3.us-east-2.amazonaws.com/stay.mp3'
    )
    demo_song15 = Song(
        user_id = 3,
        name='Just A Dream',
        genre='Pop',
        artist='T.R.I x Ca',
        cover_photo='https://goldeneragrooves.s3.us-east-2.amazonaws.com/avatar4.png',
        file_path='https://goldeneragrooves.s3.us-east-2.amazonaws.com/justadream.mp3'
    )
    demo_song16 = Song(
        user_id = 2,
        name='Apologize',
        genre='Ballad',
        artist='Timbaland ft. OneRepublic',
        cover_photo='https://goldeneragrooves.s3.us-east-2.amazonaws.com/avatar5.png',
        file_path='https://goldeneragrooves.s3.us-east-2.amazonaws.com/apologize-timbalandftonerepuclic.mp3'
    )
    demo_song17 = Song(
        user_id = 2,
        name='Choi Nhu Tui My',
        genre='Hip Hop',
        artist='Andree Left Hand',
        cover_photo='https://goldeneragrooves.s3.us-east-2.amazonaws.com/avatar6.png',
        file_path='https://goldeneragrooves.s3.us-east-2.amazonaws.com/choinhutuime.mp3'
    )
    demo_song18 = Song(
        user_id = 1,
        name='greedy',
        genre='Hip Hop',
        artist='Tate McRae',
        cover_photo='https://goldeneragrooves.s3.us-east-2.amazonaws.com/avatar7.png',
        file_path='https://goldeneragrooves.s3.us-east-2.amazonaws.com/greedy.mp3'
    )


    db.session.add(demo_song1)
    db.session.add(demo_song2)
    db.session.add(demo_song3)
    db.session.add(demo_song4)
    db.session.add(demo_song5)
    db.session.add(demo_song6)
    db.session.add(demo_song7)
    db.session.add(demo_song8)
    db.session.add(demo_song9)
    db.session.add(demo_song10)
    db.session.add(demo_song11)
    db.session.add(demo_song12)
    db.session.add(demo_song13)
    db.session.add(demo_song14)
    db.session.add(demo_song15)
    db.session.add(demo_song16)
    db.session.add(demo_song17)
    db.session.add(demo_song18)


    db.session.commit()

def undo_songs():
        if environment == "production":
            db.session.execute(f"TRUNCATE table {SCHEMA}.songs RESTART IDENTITY CASCADE;")
        else:
            db.session.execute("DELETE FROM songs")

        db.session.commit()
