"""Stock Selectors."""

from app import models
from sqlalchemy.orm import Session
from fastapi import Depends


def get_stocks(db: Session):
    """Return stocks with votes added in."""
    stocklist = db.query(models.Stock).all()
    for stock in stocklist:
        stock.likes = len([v for v in stock.votes if v.type == True])
        stock.dislikes = len([v for v in stock.votes if v.type == False])
    return stocklist
