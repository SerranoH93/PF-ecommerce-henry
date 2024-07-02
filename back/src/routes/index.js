const { Router } = require("express");
const router = Router();
const categoriesRoute = require("./categoryRouter");
const productsRouter = require('./productsRouter');
const userRouter = require('./userRouter');
const adminRouter = require('./adminRouter');
const orderRouter = require('./orderRouter');
const filterRoute = require("./filterRouter");
const paymentRoute = require("./stripeRouter");

router.use("/products", productsRouter);
router.use("/categories", categoriesRoute);
router.use('/products', productsRouter);
router.use('/admin', adminRouter)
router.use('/user', userRouter)
router.use('/order', orderRouter)
router.use('/filter', filterRoute)
router.use('/create-checkout-session', paymentRoute)

module.exports = router;
