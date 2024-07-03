const { Router } = require('express');
const { getAllOrders, addProduct, increaceQuantity, deleteOrder, clearShoppingCart } = require('../controllers/ordersControllers');
const orderRouter = Router();

orderRouter.get('/', getAllOrders);
orderRouter.post('/add', addProduct);
orderRouter.get('/detail', increaceQuantity);
orderRouter.delete('/delete/:id', deleteOrder);
orderRouter.delete('/deleteAll', clearShoppingCart)
module.exports = orderRouter;