const { Router } = require('express');
const router = Router();
const productsRouter = require('./productsRouter');
const userRouter = require('./userRouter');
const adminRouter = require('./adminRouter');
const { getCategories } = require('../controllers/categoriesController');
const orderRouter = require('./orderRouter');

router.use('/products', productsRouter);
router.use('/categories', getCategories)
router.use('/admin', adminRouter)
router.use('/user', userRouter)
router.use('/order', orderRouter)

module.exports = router;
