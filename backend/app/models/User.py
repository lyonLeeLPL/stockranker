from app import schemas
from app.database import Base, database, SECRET
from fastapi_users import FastAPIUsers
from fastapi_users.authentication import JWTAuthentication,CookieAuthentication
from sqlalchemy.orm import relationship
from fastapi_users.db import (
    SQLAlchemyBaseOAuthAccountTable,
    SQLAlchemyBaseUserTable,
    SQLAlchemyUserDatabase,
)


class UserTable(Base, SQLAlchemyBaseUserTable):
    votes = relationship("Vote", cascade="all, delete-orphan", backref="user")


class OAuthAccount(SQLAlchemyBaseOAuthAccountTable, Base):
    pass


users = UserTable.__table__
oauth_accounts = OAuthAccount.__table__
user_db = SQLAlchemyUserDatabase(schemas.UserDB, database, users, oauth_accounts)
jwt_authentication = JWTAuthentication(
    secret=SECRET, lifetime_seconds=3600, tokenUrl="/auth/jwt/login"
)


fastapi_users = FastAPIUsers(
    user_db,
    [jwt_authentication],
    schemas.User,
    schemas.UserCreate,
    schemas.UserUpdate,
    schemas.UserDB,
)
