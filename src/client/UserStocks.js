import React from 'react';
import PropTypes from 'prop-types';

const getTotal = (stocks, stockPrices) => {
	let total = 0;

	Object.keys(stocks).forEach((key) => {
		total += (parseInt(stocks[key] * stockPrices[key] * 100, 10) / 100);
	});

	return total;
};

const UserStocks = ({ stocks, stockPrices, onSellStock }) => (
	<div>
		{Object.keys(stocks).map(key => (
			<div key={key}>
				<span>{`${key} - ${stocks[key]} - $${stockPrices[key]}`}</span>
				<button type="button" className="btn btn-sm btn-outline-primary mx-2" onClick={() => onSellStock(key)}>Sell</button>
			</div>
		))}
		<div>{`Total: $${getTotal(stocks, stockPrices)}`}</div>
	</div>
);

UserStocks.propTypes = {
	stocks: PropTypes.shape({}).isRequired,
	stockPrices: PropTypes.shape({}).isRequired,
	onSellStock: PropTypes.func.isRequired
};

export default UserStocks;
