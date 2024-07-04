const { Router } = require('express');
const { getAllOrders, addProduct, setQuantity, deleteOrder, clearShoppingCart, createCheckoutSession } = require('../controllers/ordersControllers');
const orderRouter = Router();

orderRouter.get('/', getAllOrders);
orderRouter.post('/add', addProduct);
orderRouter.put('/increase/:id', setQuantity);
orderRouter.delete('/delete/:id', deleteOrder);
orderRouter.delete('/deleteAll', clearShoppingCart);
orderRouter.post('/create-checkout-session', createCheckoutSession)

module.exports = orderRouter;