class User {
	constructor({ name, email }) {
		this.name = name;
		this.email = email;
		this.cashBalance = 0;
		this.stocks = {};
	}

	addCash(amount) {
		this.setBalance(this.cashBalance + amount);
	}

	removeCash(amount) {
		this.setBalance(this.cashBalance - amount);
	}

	buy(stock, quantity) {
		if (stock.price * quantity > this.cashBalance) throw new Error('insufficient funds');
		if (!this.stocks[stock.symbol]) this.stocks[stock.symbol] = 0;
		this.stocks[stock.symbol] += parseInt(quantity, 10);

		this.setBalance(
			this.cashBalance - parseInt(stock.price * 100, 10) / 100 * parseInt(quantity, 10)
		);

		return this;
	}

	sell(stock) {
		this.stocks[stock.symbol] -= 1;
		this.setBalance(this.cashBalance + parseInt(stock.price * 100, 10) / 100);

		if (this.stocks[stock.symbol] === 0) delete this.stocks[stock.symbol];

		return this;
	}

	setBalance(newBalance) {
		this.cashBalance = parseInt(newBalance * 100, 10) / 100;
	}
}

module.exports = User;
