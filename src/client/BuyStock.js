import React, { Component } from 'react'
import PropTypes from 'prop-types';

class BuyStock extends Component {
	constructor() {
		super();

		this.state = {
			quantity: 0
		};
	}

	handleChange = event => this.setState({ quantity: event.target.value });

	render() {
		const { onBuyStock } = this.props;
		const { quantity } = this.state;
		return (
			<div>
				<input type="number" onChange={this.handleChange} />
				<button type="button" className="btn btn-sm btn-outline-primary mx-2" onClick={() => onBuyStock(quantity)}>Buy</button>
			</div>
		);
	}
}

BuyStock.propTypes = {
	onBuyStock: PropTypes.func.isRequired
};

export default BuyStock;
