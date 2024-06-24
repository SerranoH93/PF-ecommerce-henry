const { Router } = require('express');
const ordersRouter = Router();

ordersRouter.use('/', productsRoute);

module.exports = ordersRouter;