import React, { Component } from 'react';
import PropTypes from 'prop-types';
import StockCard from './StockCard';
import BuyStock from './BuyStock';

class Stock extends Component {
	constructor() {
		super();

		this.state = {};
	}

	render() {
		const { stock, onBuyStock } = this.props;

		return (
			<div className="row">
				<StockCard className="col" stock={stock} />
				<BuyStock className="col" onBuyStock={onBuyStock} />
			</div>
		);
	}
}

Stock.propTypes = {
	stock: PropTypes.shape({}).isRequired,
	onBuyStock: PropTypes.func.isRequired
};

export default Stock;
