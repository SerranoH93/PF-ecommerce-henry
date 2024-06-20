const { Router } = require('express');
const { getAllOrders, createOrder, orderDetail, deleteOrder } = require('../controllers/ordersControllers');
const orderRouter = Router();

orderRouter.get('/', getAllOrders);
orderRouter.post('/create', createOrder);
orderRouter.get('/detail', orderDetail);
orderRouter.delete('/delete', deleteOrder);

module.exports = orderRouter;