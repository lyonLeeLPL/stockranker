import databases
import sqlalchemy
from sqlalchemy.ext.declarative import DeclarativeMeta, declarative_base
from httpx_oauth.clients.google import GoogleOAuth2
from sqlalchemy.orm import sessionmaker

# database adapter

DATABASE_URL = "sqlite:///./test.db"
SECRET = "SECRET"
database = databases.Database(DATABASE_URL)
Base: DeclarativeMeta = declarative_base()
google_oauth_client = GoogleOAuth2("CLIENT_ID", "CLIENT_SECRET")


engine = sqlalchemy.create_engine(
    DATABASE_URL, connect_args={"check_same_thread": False}
)
Base.metadata.create_all(engine)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


