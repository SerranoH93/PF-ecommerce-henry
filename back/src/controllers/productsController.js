const { Product, Category } = require('../db');
const uploadImage = require('../utils/cloudinaryConfiguration');
const crypto = require('crypto');
const newProductSchema = require('../validations/newProductSchema');
const validateImages = require('../validations/filesValidations');
const { Op, where } = require('sequelize');

const getAllProducts = async (req, res) => {
    try {
        const productsDB = await Product.findAll({ include: Category })
        res.status(200).json(productsDB);
    } catch (error) {
        res.status(500).json({ message: 'Error en la base de datos', error: error.message });
    }
}

const postNewProduct = async (req, res) => {
    try {

        //* Se realizan validaciones del formulario
        let validationsCheck = await newProductSchema.safeParseAsync(req.body);
        // console.log(validationsCheck, 'validaciones')

        if(validationsCheck.success === false) {
            return res.status(400).json(validationsCheck.error.issues[0])
        } 

        //* Validar si la imagen cumple con los formatos y tamaños requeridos
        // console.log(req.files);
        const validationResult = validateImages(req.files);

        if (!validationResult.valid) {
            return res.status(400).json({
                message: "Uno o más archivos no son válidos.",
                errors: validationResult.errors,
            });
        }

        //* Si las validaciones son correctas se agregan los datos a la DB
        req.body.id =crypto.randomUUID();
        const files = req.files;        
        const uniqueField = req.body.id;
        const imagesUrl = [];

        console.log(files, 'imagenes')

        for (let i = 0; i < files.length; i++) {
            const fileBuffer = files[i].buffer;
            const result = await uploadImage('product', uniqueField, fileBuffer, i);
            imagesUrl.push(result.secure_url);
        }
        console.log(imagesUrl, 'images')

        const newProduct = await Product.create({
            id: req.body.id,
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            gender: req.body.gender,
            stock: req.body.stock,
            active: req.body.active,
            size: req.body.size,
            images: imagesUrl
        })    
        
        // console.log(newProduct);
        res.status(200).json('Se creo nuevo producto'); 
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }     
}

const deleteProduct = async (req, res) => {
    const productId = req.params.id;

    try {        
        const product = await Product.findByPk(productId);
        console.log(product)

        if (!product) {
            return res.status(404).json({ message: 'Producto no encontrado' });
        } else {
            await Product.destroy({where: {
                id: product.id
            }});
            res.status(200).json({ message: 'Producto eliminado exitosamente' });
        }    
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar el producto', error: error.message });
    }
}


const editProduct = async (req, res) => {
    try {
        res.status(200).json({message: 'products/edit funciona'});
    } catch (error) {
        res.status(500).json({ message: 'Error en la base de datos', error: error.message });
    }
}

const activeUnactiveProduct = async (req, res) => {
    try {
        res.status(200).json({message: 'products/activeUnactive funciona'});
    } catch (error) {
        res.status(500).json({ message: 'Error en la base de datos', error: error.message });
    }
}

module.exports = {
        getAllProducts,
        postNewProduct,
        deleteProduct,
        editProduct,
        activeUnactiveProduct
    };