from app.database import Base
from sqlalchemy import Column, Integer, ForeignKey, DateTime, Boolean
from sqlalchemy.orm import relationship
from sqlalchemy_utils.types import uuid
from datetime import datetime


class Vote(Base):
    __tablename__ = "votes"
    stock_id = Column(Integer, ForeignKey("stock.id"), primary_key=True)
    user_id = Column(uuid.UUIDType, ForeignKey("user.id"), primary_key=True)
    date = Column(DateTime, nullable=False, default=datetime.now())
    type = Column(Boolean)
