from fastapi import APIRouter, Depends, Security
from app.dependencies import get_db
from sqlalchemy.orm import Session
from app import models, services, schemas
from fastapi_auth0 import Auth0, Auth0User


router = APIRouter(tags=["votes"])


@router.post("/vote")
def create_vote(req: schemas.VoteRequest, db: Session = Depends(get_db)):
    try:
        vote = services.vote.create_vote(
            votetype=req.votetype,
            user_id=req.user_id,
            stock_id=req.stock_id,
            db=db
        )
    except Exception as e:
        raise Exception(e)
