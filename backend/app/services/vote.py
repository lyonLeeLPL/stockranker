from app import models
from fastapi import Depends
from sqlalchemy import and_
from app.dependencies import get_db
from sqlalchemy.orm import Session


def create_vote(votetype: bool, stock_id: int, user_id: str, db: Session = Depends(get_db)):
    """Create vote in db."""
    stock = db.query(models.Stock).filter(models.Stock.id == stock_id).first()
    if not stock:
        raise Exception(f"stock_id: {stock_id} does not exist")
    vote = existing_vote(stock_id, user_id, db)
    if vote:
        vote.type = votetype
        db.commit()
        db.refresh(vote)
        return vote

    vote = models.Vote()
    vote.type = votetype
    vote.stock_id = stock_id
    vote.user_id = user_id
    db.add(vote)
    db.commit()
    db.refresh(vote)
    return vote


def existing_vote(stock_id, user_id, db: Session = Depends(get_db)):
    """Check if vote exists, return Vote or None."""
    vote = db.query(models.Vote).filter(
        and_(models.Vote.stock_id == stock_id, models.Vote.user_id == user_id)).first()
    return vote
