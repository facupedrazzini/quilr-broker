const express = require('express');
const stockController = require('../controllers/stock.controller');

module.exports = (app) => {
	const stockRouter = express.Router();

	stockRouter.get('/search/:keywords', stockController.search);
	stockRouter.get('/get/:symbol', stockController.get);
	stockRouter.post('/buy', stockController.buy);
	stockRouter.post('/sell', stockController.sell);

	app.use('/stock', stockRouter);
};
