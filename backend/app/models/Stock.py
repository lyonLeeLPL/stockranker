from app.database import Base
from sqlalchemy import Column, Integer, ForeignKey, DateTime, Float, String
from sqlalchemy.orm import relationship
from datetime import datetime


class Stock(Base):
    __tablename__ = "stock"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    price = Column(Float, nullable=False,default=0)
    sector = Column(String)
    symbol = Column(String,index=True,unique=True)
    last_updated = Column(DateTime,default=datetime.now())
    votes = relationship("Vote", cascade="all, delete-orphan", backref="stock")
