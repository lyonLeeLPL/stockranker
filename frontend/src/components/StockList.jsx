import React, { useState, useEffect } from "react";
import VoteBox from "./VoteBox";
import Stock from "./Stock";

function StockList() {
  const stock_url = "http://localhost:8000/stocks";
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [stocks, setStocks] = useState([]);

  // Note: the empty deps array [] means
  // this useEffect will run once
  // similar to componentDidMount()
  useEffect(() => {
    fetch(stock_url)
      .then((res) => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setStocks(result.data);
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      );
  }, []);

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return (
      <ul>
        {stocks.map((stock) => (
          <li key={stock.id}>
            <Stock stock={stock} />
            <VoteBox stock={stock} />
          </li>
        ))}
      </ul>
    );
  }
}
export default StockList;
