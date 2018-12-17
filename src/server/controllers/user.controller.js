const user = require('../data/user.data');
const alphavantageService = require('../stock-api/alphavantage.service');

module.exports = {
	get: (req, res) => {
		alphavantageService.getStockPrices(Object.keys(user.stocks))
			.then((stockPrices) => {
				res.json({
					...user,
					stockPrices
				});
			});
	},
	addCash: (req, res) => {
		const { cash } = req.body;
		user.addCash(cash);
		res.json(user);
	},
	removeCash: (req, res) => {
		const { cash } = req.body;
		user.removeCash(cash);
		res.json(user);
	}
};
