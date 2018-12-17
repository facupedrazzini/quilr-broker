const alphavantageService = require('../stock-api/alphavantage.service');
const user = require('../data/user.data');

module.exports = {
	search: (req, res) => alphavantageService.search(req.params.keywords)
		.then(data => res.json(data)),
	get: (req, res) => alphavantageService.get(req.params.symbol)
		.then(data => res.json(data)),
	buy: (req, res) => {
		user.buy(req.body.stock, req.body.quantity);
		alphavantageService.getStockPrices(Object.keys(user.stocks))
			.then((stockPrices) => {
				res.json({
					...user,
					stockPrices
				});
			});
	},
	sell: (req, res) => {
		alphavantageService.get(req.body.symbol)
			.then((data) => {
				res.json(user.sell({
					symbol: req.body.symbol,
					price: data['Global Quote']['05. price']
				}));
			});
	}
};
