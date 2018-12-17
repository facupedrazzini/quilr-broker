const express = require('express');
const userController = require('../controllers/user.controller');

module.exports = (app) => {
	const userRouter = express.Router();

	userRouter.get('/:id', userController.get);
	userRouter.post('/add-cash', userController.addCash);
	userRouter.post('/remove-cash', userController.removeCash);

	app.use('/users', userRouter);
};
