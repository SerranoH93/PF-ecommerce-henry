const { Router } = require('express');
const productsRoute = require('./productsRouter');
const usersRouter = require('./usersRouter');
const orderRouter = require('./orderRouter');
const sendEmailRouter = require('./senEmailRouter');

const adminRouter = Router();

adminRouter.use('/products', productsRoute);
adminRouter.use('/users', usersRouter)
adminRouter.use('/orders', orderRouter)
adminRouter.use('/sendEmail', sendEmailRouter)

module.exports = adminRouter;