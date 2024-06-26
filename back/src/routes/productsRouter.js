const { Router } = require('express');
const { getAllProducts, getProductById, postNewProduct, deleteProduct, editProduct, activeUnactiveProduct} = require('../controllers/productsController');
const upload = require('../utils/multerConfiguration');


const productsRoute = Router();

productsRoute.get('/', getAllProducts);
productsRoute.get('/:id', getProductById);

productsRoute.post('/create', upload, postNewProduct); //*Añadir producto nuevo (Se cambiará a la ruta admin)
productsRoute.delete('/delete/:id', deleteProduct); //*Borrar producto (Se cambiará a la ruta admin)
productsRoute.put('/edit/:id', upload, editProduct)  //* Editar producto (Se cambiará a la ruta admin)
productsRoute.put('/productStatus', activeUnactiveProduct) //* Cambiar estatus (Se cambiará a la ruta admin) REVISAR SI ES NECESARIO

module.exports = productsRoute;