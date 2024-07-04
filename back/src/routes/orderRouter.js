const { Router } = require('express');
const { getUserOrders, addProduct, setQuantity, deleteOrder, clearShoppingCart, getAllOrders } = require('../controllers/ordersControllers');
const orderRouter = Router();

orderRouter.get('/', getUserOrders);
orderRouter.get('/all', getAllOrders)
orderRouter.post('/add', addProduct);
orderRouter.put('/increase/:id', setQuantity);
orderRouter.delete('/delete/:id', deleteOrder);
orderRouter.delete('/deleteAll', clearShoppingCart)
module.exports = orderRouter;