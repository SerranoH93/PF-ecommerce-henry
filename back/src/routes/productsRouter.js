const { Router } = require('express');
const { getAllProducts, postNewProduct} = require('../controllers/productsController');
const upload = require('../utils/multerConfiguration');


const productsRoute = Router();

productsRoute.get('/', getAllProducts);
productsRoute.post(
    '/create',
    upload,      
    postNewProduct);

module.exports = productsRoute;