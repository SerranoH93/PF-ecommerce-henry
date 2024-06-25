const { Router } = require('express');
const { getAllProducts, getProductById, postNewProduct, deleteProduct, editProduct, activeUnactiveProduct} = require('../controllers/productsController');
const upload = require('../utils/multerConfiguration');


const productsRoute = Router();

productsRoute.get('/', getAllProducts);
productsRoute.get('/:id', getProductById);
productsRoute.post('/create', upload, postNewProduct); //*Añadir producto nuevo
productsRoute.delete('/delete/:id', deleteProduct); //*Borrar producto
productsRoute.put('/editProduct', editProduct)
productsRoute.put('/productStatus', activeUnactiveProduct)

module.exports = productsRoute;