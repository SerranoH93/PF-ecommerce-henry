const { Router } = require('express');
const { getAllOrders, addProduct, increaceQuantity, deleteOrder } = require('../controllers/ordersControllers');
const orderRouter = Router();

orderRouter.get('/', getAllOrders);
orderRouter.post('/add', addProduct);
orderRouter.get('/detail', increaceQuantity);
orderRouter.delete('/delete/:id', deleteOrder);

module.exports = orderRouter;