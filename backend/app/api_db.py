"""Functions to populate database with stocks"""

import finnhub
from datetime import datetime
import time
import requests
from pydantic import BaseModel
from app import models
from app.dependencies import get_db
from fastapi import Depends
from sqlalchemy.orm import Session

APIKEY = 'c0hgt6748v6phn6t0oj0'

class BaseStock(BaseModel):
    name: str
    symbol: str
    sector: str

finnhub_client = finnhub.Client(api_key=f'{APIKEY}')


def get_sp500_symbol_list():
    url = 'https://pkgstore.datahub.io/core/s-and-p-500-companies/constituents_json/data/53978ce4c8df22cd5fde7a80b2041f25/constituents_json.json'
    data = requests.get(url).json()
    stocks = [i['Symbol'] for i in data]
    return stocks


def create_stock_profile(symbol:str,db:Session=Depends(get_db)):
    
    s = db.query(models.Stock).filter(models.Stock.symbol == symbol).first()
    if s:
        raise Exception(f"Stock already in db: {symbol}")

    try:
        api_data = finnhub_client.company_profile2(symbol=symbol)
    except Exception as e:
        raise Exception(f"FinnHubException: {symbol}")

    stock = models.Stock()
    stock.symbol = symbol
    stock.name = api_data["name"]
    stock.sector = api_data["finnhubIndustry"]

    
    db.add(stock)
    db.commit()
    db.refresh(stock)
    return stock


def update_stock_price(stock:models.Stock,db:Session=Depends(get_db)):
    price = finnhub_client.quote(stock.symbol)['c']
    stock.price = price
    stock.last_updated = datetime.now()
    db.commit()
    db.refresh(stock)
    return stock
