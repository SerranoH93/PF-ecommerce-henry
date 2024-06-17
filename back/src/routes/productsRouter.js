const { Router } = require('express');
const { getAllProducts, postNewProduct, deleteProduct} = require('../controllers/productsController');
const upload = require('../utils/multerConfiguration');


const productsRoute = Router();

productsRoute.get('/', getAllProducts);
productsRoute.post('/create', upload, postNewProduct); //*Añadir producto nuevo
productsRoute.delete('/delete/:id', deleteProduct); //*Borrar producto

module.exports = productsRoute;