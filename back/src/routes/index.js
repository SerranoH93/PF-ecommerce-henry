const { Router } = require('express');
const router = Router();
const productsRouter = require('./productsRouter')

router.use('/products', productsRouter);


module.exports = router;
