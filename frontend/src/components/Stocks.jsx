import React, { useEffect, useState } from "react";
import Box from "@material-ui/core/Box";
import { Container, Button, Grid } from "@material-ui/core";
//import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
// import ThumbDownAltIcon from "@material-ui/icons/ThumbDownAlt";

const vote_url = "http://localhost:8000/vote";
const StocksContext = React.createContext({
  stocks: [],
  fetchStocks: () => {},
});

export default function Stocks() {
  const [stocks, setStocks] = useState([]);
  const fetchStocks = async () => {
    const response = await fetch("http://localhost:8000/stocks");
    const stocks = await response.json();
    setStocks(stocks.data);
  };
  useEffect(() => {
    fetchStocks();
  }, []);
  function createVote(votetype, stock, e) {
    e.preventDefault();
    if (!localStorage.user) {
      return "Login!";
    }
    const data = JSON.stringify({
      symbol: stock.symbol,
      votetype: votetype,
    });

    fetch(vote_url, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Authorization: "Bearer " + localStorage.token,
      },
      body: data,
    })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  }

  return (
    <StocksContext.Provider value={{ stocks, fetchStocks }}>
      <Container>
        <Grid container>
          <div>
            {stocks.map((stock) => (
              <Box key={stock.symbol}>
                <p>
                  {stock.name} {stock.symbol} ${stock.price}
                </p>
                <Button
                  style={{ color: "green" }}
                  onClick={(e) => createVote(true, stock, e)}
                >
                  {stock.likes}
                </Button>
                /
                <Button
                  style={{ color: "red" }}
                  onClick={(e) => createVote(false, stock, e)}
                >
                  {stock.dislikes}
                </Button>
              </Box>
            ))}
          </div>
        </Grid>
      </Container>
    </StocksContext.Provider>
  );
}
