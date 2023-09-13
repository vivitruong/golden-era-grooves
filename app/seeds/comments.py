from app.models import db, Comment, environment, SCHEMA


def seed_comments():
    comment1 = Comment(
        song_id=1,
        user_id=1,
        comment='Amazing song!'
    )

    comment2 = Comment(
        song_id=1,
        user_id=2,
        comment='This song gives me chills.'
    )

    comment3 = Comment(
        song_id=2,
        user_id=3,
        comment='Incredible lyrics and melody.'
    )

    comment4 = Comment(
        song_id=3,
        user_id=1,
        comment='One of my all-time favorites.'
    )

    comment5 = Comment(
        song_id=5,
        user_id=2,
        comment='Such a powerful and emotional song.'
    )

    comment6 = Comment(
        song_id=6,
        user_id=3,
        comment='Cannot stop listening to this!'
    )

    comment7 = Comment(
        song_id=3,
        user_id=3,
        comment='Great beat and rhythm.'
    )

    db.session.add(comment1)
    db.session.add(comment2)
    db.session.add(comment3)
    db.session.add(comment4)
    db.session.add(comment5)
    db.session.add(comment6)
    db.session.add(comment7)

    db.session.commit()

def undo_comments():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.comments RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM comments")

    db.session.commit()
