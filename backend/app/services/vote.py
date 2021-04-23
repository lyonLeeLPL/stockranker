from app import models
from fastapi import Depends
from sqlalchemy import and_
from app.dependencies import get_db,current_user
from sqlalchemy.orm import Session


def create_vote(votetype:bool,symbol:str,user=Depends(current_user()),db:Session = Depends(get_db)):
    """Create vote in db."""
    symbol = symbol.upper()
    stock = db.query(models.Stock).filter(models.Stock.symbol==symbol).first()
    if not stock:
        raise Exception(f"symbol: {symbol} does not exist")
    vote = existing_vote(stock,user,db)
    if vote:
        vote.type = votetype
        db.commit()
        db.refresh(vote)
        return vote
        

    vote = models.Vote()
    vote.type = votetype
    vote.stock_id = stock.id
    vote.user_id = user.id
    db.add(vote)
    db.commit()
    db.refresh(vote)
    return vote

def existing_vote(stock,user,db:Session=Depends(get_db)):
    """Check if vote exists, return Vote or None."""
    vote = db.query(models.Vote).filter(and_(models.Vote.stock_id==stock.id,models.Vote.user_id==user.id)).first()
    return vote
    


    
    
