const { Router } = require('express');
const { getAllOrders, addProduct, orderDetail, deleteOrder } = require('../controllers/ordersControllers');
const orderRouter = Router();

orderRouter.get('/', getAllOrders);
orderRouter.post('/add', addProduct);
orderRouter.get('/detail', orderDetail);
orderRouter.delete('/delete', deleteOrder);

module.exports = orderRouter;