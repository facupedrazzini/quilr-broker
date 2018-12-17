import React, { Component } from 'react';
import PropTypes from 'prop-types';

class CashBalance extends Component {
	constructor() {
		super();

		this.state = {
			cash: 0
		};
	}

	handleChange = event => this.setState({ cash: event.target.value });

	render() {
		const { onAddCash, onRemoveCash } = this.props;
		const { cash } = this.state;

		return (
			<div className="d-inline form-inline" >
				<input type="text" className="form-control form-control-sm" onChange={this.handleChange} value={cash} />
				<button type="button" className="btn btn-sm btn-outline-primary mx-2" onClick={() => onAddCash(cash)}>Add Cash</button>
				<button type="button" className="btn btn-sm btn-outline-secondary mx-2" onClick={() => onRemoveCash(cash)}>Extract Cash</button>
			</div>
		);
	}
}

CashBalance.propTypes = {
	onAddCash: PropTypes.func.isRequired,
	onRemoveCash: PropTypes.func.isRequired
};

export default CashBalance;
