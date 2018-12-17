import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { debounce } from 'lodash';
import { symbol } from './stockParameters';

class SearchTicker extends Component {
	constructor() {
		super();

		this.state = {
			keywords: '',
			tickers: []
		};

		this.search = debounce(this.search, 500);
	}

	handleChange = (event) => {
		this.setState({ keywords: event.target.value }, () => {
			const { keywords } = this.state;

			if (keywords.length > 1) this.search(keywords);
			else this.setState({ tickers: [] });
		});
	}

	handleSelectTicker = (tickerSymbol) => {
		const { onSelectTicker } = this.props;
		this.setState({ tickers: [] });
		onSelectTicker(tickerSymbol);
	};

	search = (query) => {
		fetch(`/api/stock/search/${query}`)
			.then(data => data.json())
			.then((tickers) => {
				this.setState({
					tickers: tickers.bestMatches
				});
			});
	};

	render() {
		const { tickers } = this.state;

		return (
			<div className="row row justify-content-md-center mt-5">
				<div className="col col-lg-4">
					<div className="input-group mb-3">
						<input type="text" className="form-control" placeholder="Ticker" onChange={this.handleChange} />
						<div className={`dropdown-menu ${tickers.length && 'show'}`}>
							{tickers.map(ticker => (
								<button type="button" key={ticker[symbol]} className="dropdown-item" onClick={() => this.handleSelectTicker(ticker[symbol])}>
									{`${ticker[symbol]}`}
								</button>
							))}
						</div>
					</div>
				</div>
			</div>
		);
	}
}

SearchTicker.propTypes = {
	onSelectTicker: PropTypes.func.isRequired
};

export default SearchTicker;
