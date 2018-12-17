import React, { Component } from 'react';
import NavBar from './NavBar';
import SearchTicker from './SearchTicker';
import './app.css';
import Stock from './Stock';
import { globalQuote, price, symbol2 } from './stockParameters';
import UserStocks from './UserStocks';

export default class App extends Component {
	constructor() {
		super();
		this.state = {
			user: null,
			stock: null
		};
	}

	componentDidMount() {
		fetch('/api/users/1')
			.then(res => res.json())
			.then(user => this.setState({ user }));
	}

	handleAddCash = (cash) => {
		fetch('/api/users/add-cash', {
			method: 'post',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ cash })
		})
			.then(res => res.json())
			.then((updatedUser) => {
				const { user } = this.state;
				this.setState({
					user: {
						...user,
						cashBalance: updatedUser.cashBalance
					}
				});
			});
	}

	handleRemoveCash = (cash) => {
		fetch('/api/users/remove-cash', {
			method: 'post',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ cash })
		})
			.then(res => res.json())
			.then((updatedUser) => {
				const { user } = this.state;
				this.setState({
					user: {
						...user,
						cashBalance: updatedUser.cashBalance
					}
				});
			});
	};

	handleSelectTicker = (symbol) => {
		fetch(`/api/stock/get/${symbol}`)
			.then(data => data.json())
			.then((stockData) => {
				const stock = {
					symbol: stockData[globalQuote][symbol2],
					price: stockData[globalQuote][price]
				};

				this.setState({ stock });
			});
	};

	handleBuyStock = (quantity) => {
		const { stock } = this.state;

		fetch('/api/stock/buy', {
			method: 'post',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ stock, quantity })
		})
			.then(data => data.json())
			.then((updatedUser) => {
				const { user } = this.state;
				this.setState({
					user: {
						...user,
						stocks: updatedUser.stocks,
						stockPrices: updatedUser.stockPrices,
						cashBalance: updatedUser.cashBalance
					}
				});
			});
	};

	handleSellStock = (symbol) => {
		fetch('/api/stock/sell', {
			method: 'post',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ symbol })
		})
			.then(data => data.json())
			.then((updatedUser) => {
				const { user } = this.state;
				this.setState({
					user: {
						...user,
						stocks: updatedUser.stocks,
						cashBalance: updatedUser.cashBalance
					}
				});
			});
	};

	render() {
		const { user, stock } = this.state;
		return (
			<div className="container-fluid">
				<div className="row">
					<NavBar user={user} onAddCash={this.handleAddCash} onRemoveCash={this.handleRemoveCash} />
				</div>
				<SearchTicker onSelectTicker={this.handleSelectTicker} />
				{stock && <Stock stock={stock} onBuyStock={this.handleBuyStock} />}
				{user && user.stocks
					&& (
						<UserStocks stocks={user.stocks} stockPrices={user.stockPrices} onSellStock={this.handleSellStock} />
					)
				}
			</div>
		);
	}
}
