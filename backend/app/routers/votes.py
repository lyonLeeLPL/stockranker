from fastapi import APIRouter, Depends
from app.dependencies import get_db, current_user
from sqlalchemy.orm import Session
from app import models,services,schemas


router = APIRouter(tags=["votes"])


@router.post("/vote")
def create_vote(vote_req: schemas.VoteRequest,user=Depends(current_user()),db: Session = Depends(get_db)):
    votetype = vote_req.votetype
    symbol = vote_req.symbol
    try:
        vote = services.vote.create_vote(
            votetype=votetype, symbol=symbol, user=user, db=db
        )
        return vote.__dict__
    except Exception as e:
        raise Exception(e)
