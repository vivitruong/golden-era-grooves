from app.models import db, likes, environment, SCHEMA

def seed_likes():
    likes_data = [
        {"users": 1, "songs": 2},
        {"users": 2, "songs": 3},
        {"users": 3, "songs": 1},
        {"users": 2, "songs": 1},
        {"users": 1, "songs": 3},
    ]
    db.session.execute(likes.insert().values(likes_data))

def undo_likes():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.likes RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM likes")

    db.session.commit()
