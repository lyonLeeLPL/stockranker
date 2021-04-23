
from app.api_db import create_stock_profile,get_sp500_symbol_list,update_stock_price
from fastapi import APIRouter,Depends
from app.dependencies import get_db
from sqlalchemy.orm import Session
from finnhub import FinnhubAPIException
import pprint
from app import models,selectors
import time
router = APIRouter()

@router.get("/internal/populate_sp_500")
def populate_sp500(db:Session=Depends(get_db)):
    stocklist = get_sp500_symbol_list()
    errorlist = []
    for i in stocklist:
        try:
            data = create_stock_profile(i,db=db)
            time.sleep(1)
        except Exception as e:
            print(e,i)


@router.get("/internal/update_stock_prices")
def update_prices(db:Session=Depends(get_db)):
    stocklist = db.query(models.Stock).all()
    for stock in stocklist:
        try:
            updated_stock = update_stock_price(stock=stock,db=db)
            print(f'{updated_stock.last_updated} - Price updated {updated_stock.name}: {updated_stock.price}')
            time.sleep(1)
        except Exception as e:
            print(e)


@router.get("/stocks")
def get_stocks(db:Session=Depends(get_db)):
    stocklist = selectors.stocks.get_stocks(db=db)
    return {"data":stocklist}
    
    