import React, { useEffect, useState } from 'react';
import { Container, Button, Grid, Card } from '@material-ui/core';
import { ThumbUpAlt, ThumbDownAlt } from '@material-ui/icons';
import { useAuth0 } from '@auth0/auth0-react';

const vote_url = 'http://localhost:8000/vote';
const StocksContext = React.createContext({
	stocks: [],
	fetchStocks: () => {}
});

export default function Stocks() {
	const { isAuthenticated } = useAuth0();
	const [stocks, setStocks] = useState([]);

	const fetchStocks = async () => {
		const response = await fetch('http://localhost:8000/stocks');
		const stocks = await response.json();
		console.log(stocks);
		setStocks(stocks.data);
	};

	useEffect(() => {
		fetchStocks();
	}, []);

	function createVote(votetype, stock, e) {
		e.preventDefault();
		// if (!localStorage.user) {
		// 	return 'Login!';
		// }
		const data = JSON.stringify({
			symbol: stock.symbol,
			votetype
		});

		fetch(vote_url, {
			method: 'POST',
			headers: {
				'Content-type': 'application/json',
				Authorization: 'Bearer ' + localStorage.token
			},
			body: data
		})
			.then(res => console.log(res))
			.catch(err => console.log(err));
	}

	return (
		<StocksContext.Provider value={{ stocks, fetchStocks }}>
			<Grid container component={Container} spacing={3}>
				{stocks.map(stock => (
					<Grid item component={Card} lg={3} sm={6} key={stock.symbol}>
						<p>
							{stock.name} {stock.symbol} ${stock.price}
						</p>
						<Button
							style={{ color: 'green' }}
							onClick={e => createVote(true, stock, e)}
							startIcon={<ThumbUpAlt />}
						>
							{stock.likes}
						</Button>
						/
						<Button
							style={{ color: 'red' }}
							onClick={e => createVote(false, stock, e)}
							endIcon={<ThumbDownAlt />}
						>
							{stock.dislikes}
						</Button>
					</Grid>
				))}
			</Grid>
		</StocksContext.Provider>
	);
}
