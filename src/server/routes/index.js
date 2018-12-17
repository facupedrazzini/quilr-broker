const express = require('express');
const userRoutes = require('./user.routers');
const stockRoutes = require('./stock.routes');
// const quandlService = require('../quandl/quandl.service');

module.exports = (app) => {
	app.use(express.static('dist'));

	const logger = (req, res, next) => {
		console.log(req.method, req.url);
		next(); // Passing the request to the next handler in the stack.
	};
	app.use(logger);

	const apiRouter = express.Router();

	userRoutes(apiRouter);
	stockRoutes(apiRouter);

	app.use('/api', apiRouter);

	// Handling errors
	app.use((err, req, res) => {
		console.error(err.stack);
		res.status(500).send({
			message: err.toString()
		});
	});
};