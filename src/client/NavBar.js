import React from 'react';
import PropTypes from 'prop-types';
import CashBalance from './CashBalance';

const balanceClasses = cashBalance => (cashBalance < 0 ? 'danger' : 'success');

const NavBar = ({ user, onAddCash, onRemoveCash }) => (
	<nav className="navbar navbar-light bg-light col">
		<h3>Qwilr Broker</h3>
		<div>
			{user ? (
				<span className="mx-2">
					<span>
						{`${user.name} - `}
					</span>
					<span className={`badge badge-${balanceClasses(user.cashBalance)}`}>{user.cashBalance}</span>
				</span>
			) : 'Loading...'}
			<CashBalance onAddCash={onAddCash} onRemoveCash={onRemoveCash} />
		</div>
	</nav>
);

NavBar.propTypes = {
	user: PropTypes.shape({}),
	onAddCash: PropTypes.func.isRequired,
	onRemoveCash: PropTypes.func.isRequired
};

NavBar.defaultProps = {
	user: {}
};

export default NavBar;
