const rpn = require('request-promise-native');
const config = require('../config.json');

let keyNumber = 1;
const alphavantageService = {
	search: keywords => alphavantageService.query(`function=SYMBOL_SEARCH&keywords=${keywords}&datatype=json`),
	get: symbol => alphavantageService.query(`function=GLOBAL_QUOTE&symbol=${symbol}&datatype=json`),
	getStockPrices: (symbols) => {
		if (!symbols.length) return Promise.resolve({});
		return alphavantageService.query(`function=BATCH_STOCK_QUOTES&symbols=${symbols.join(',')}&datatype=json`)
			.then((data) => {
				const stockPrices = {};

				data['Stock Quotes'].forEach((stock) => {
					stockPrices[stock['1. symbol']] = parseInt(stock['2. price'] * 100, 10) / 100;
				});

				return stockPrices;
			});
	},
	query: (queryString) => {
		const url = `${config.alphavantage.base_uri}?${queryString}&apikey=${alphavantageService.getApiKey()}`;
		return rpn(url)
			.then(dataString => JSON.parse(dataString));
	},
	getApiKey: () => {
		if (keyNumber === 1) keyNumber = 2;
		else keyNumber = 1;

		return config[`api_key_${keyNumber}`];
	}
};

module.exports = alphavantageService;
