from pydantic import BaseModel
from fastapi_users.models import (
    BaseOAuthAccountMixin,
    BaseUserCreate,
    BaseUserUpdate,
    BaseUserDB,
    BaseUser,
)


class User(BaseUser, BaseOAuthAccountMixin):
    pass


class UserCreate(BaseUserCreate):
    pass


class UserUpdate(User, BaseUserUpdate):
    pass


class UserDB(User, BaseUserDB):
    pass

class VoteRequest(BaseModel):
    votetype:bool
    symbol:str
