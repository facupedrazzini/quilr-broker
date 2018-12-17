import React from 'react';
import PropTypes from 'prop-types';

const StockCard = ({ stock }) => (
	<div className="card border-secondary mb-3">
		<div className="card-header">{stock.symbol}</div>
		<div className="card-body text-secondary">
			<h5 className="card-title">{`Price: ${stock.price}`}</h5>
		</div>
	</div>
);

StockCard.propTypes = {
	stock: PropTypes.shape({}).isRequired
};

export default StockCard;
