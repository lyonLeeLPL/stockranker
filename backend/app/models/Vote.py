from app.database import Base
from sqlalchemy import Column, Integer, ForeignKey, DateTime, Boolean,String
from datetime import datetime


class Vote(Base):
    __tablename__ = "votes"
    stock_id = Column(Integer, ForeignKey("stock.id"), primary_key=True)
    user_id = Column(String,primary_key=True)
    date = Column(DateTime, nullable=False, default=datetime.now())
    type = Column(Boolean)
