from app.database import SessionLocal
from app.models.User import fastapi_users

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

def current_user():
    return fastapi_users.current_user()
    
