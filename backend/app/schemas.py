from pydantic import BaseModel


class VoteRequest(BaseModel):
    votetype: bool
    stock_id: int
    user_id: str
