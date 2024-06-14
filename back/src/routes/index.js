const { Router } = require('express');
const router = Router();


const getAllProducts = require('../controllers/getAllProducts')

router.get('/products', getAllProducts);


module.exports = router;
