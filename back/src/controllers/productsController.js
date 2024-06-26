const { Product, Category } = require('../db');
const uploadImage = require('../utils/cloudinaryConfiguration');
const crypto = require('crypto');
const productSchema = require('../validations/productSchema');
const validateImages = require('../validations/filesValidations');
const { Op, where } = require('sequelize');
const fs = require('fs');
const initializeDatabase = require('../utils/initializeDatabase');


const getAllProducts = async (req, res) => {
    try {
        const productsDB = await Product.findAll({ include: Category });   
        
        if (productsDB.length === 0) {
            await initializeDatabase();
            const updatedProductsDB = await Product.findAll({ include: Category });
            return res.status(200).json(updatedProductsDB);         
        }    
        
        return res.status(200).json(productsDB);

    } catch (error) {
        res.status(500).json({ message: 'Error en la base de datos', error: error.message });
    }    
}

const getProductById = async(req, res) => {
    const productId = req.params.id;

    try {
        const product = await Product.findByPk(productId, { include: Category });

        if (!product) {
            return res.status(404).json({ message: 'Producto no encontrado' });
        }

        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ message: 'Error en la base de datos', error: error.message });
    }
};

const postNewProduct = async (req, res) => {
    try {

        //* Se realizan validaciones del formulario
        let validationsCheck = await productSchema.safeParseAsync(req.body);
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

        //console.log(files, 'imagenes')

        for (let i = 0; i < files.length; i++) {
            const fileBuffer = files[i].buffer;
            const result = await uploadImage('product', uniqueField, fileBuffer, i);
            imagesUrl.push(result.secure_url);
        }
        //console.log(imagesUrl, 'images');

        const categoryToLowerCase = req.body.category.toLowerCase()
        // console.log(categoryToLowerCase)
        const category = await Category.findOne({
            where: {
                name: categoryToLowerCase
            }
        });
        console.log(category, "Categoría encontrada");

        if(!category) {
            return res.status(400).json({message: 'La categoría no existe'})
        }

        const newProduct = await Product.create({
            id: req.body.id,
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            gender: req.body.gender,
            stock: req.body.stock,
            active: req.body.active,
            size: req.body.size,
            images: imagesUrl,
            category_id: category.id
        })    
        
        // console.log(newProduct);
        res.status(200).json({message: 'Se creo nuevo producto'}); 
    } catch (error) {
        res.status(500).json({ message: 'Error al crear el producto', error: error.message });
    }     
}

const editProduct = async (req, res) => {
    try {     
        let validationsCheck = await newProductSchema.safeParseAsync(req.body);
        
        if(validationsCheck.success === false) {
            return res.status(400).json(validationsCheck.error.issues[0]);
        }

        const product = await Product.findByPk(req.params.id);
        
        if(!product) {
            return res.status(404).json({ message: 'Producto no encontrado' });
        }

        const validationResult = validateImages(req.files);
        
        if(!validationResult.valid) {
            return res.status(400).json({
                message: 'Uno o más archivos no son válidos',
                errors: validationResult.errors
            })
        }

        const files = req.files;
        const uniqueField = product.id;
        const imagesUrl = [];

        for (let i = 0; i < files.length; i++) {
            const fileBuffer = files[i].buffer;
            const result = await uploadImage('product', uniqueField, fileBuffer, i);
            imagesUrl.push(result.secure_url);
        }


        const categoryToLowerCase = req.body.category.toLowerCase()
        // console.log(categoryToLowerCase)
        const category = await Category.findOne({
            where: {
                name: categoryToLowerCase
            }
        });
        // console.log(category, "Categoría encontrada");

        if(!category) {
            return res.status(400).json({message: 'La categoría no existe'})
        }

        const editedPrduct = await Product.update({
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            gender: req.body.gender,
            stock: req.body.stock,
            active: req.body.active,
            size: req.body.size,
            images: imagesUrl,
            category_id: category.id
        },
        {
            where: { 
                id: req.params.id 
            }
        });

        res.status(200).json({message: 'Producto editado correctamente'});
    } catch (error) {
        res.status(500).json({ message: 'Error al editar el producto', error: error.message });
    }
}

const deleteProduct = async (req, res) => {
    const productId = req.params.id;

    try {        
        const product = await Product.findByPk(productId);
        //console.log(product)

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

const activeUnactiveProduct = async (req, res) => {
    try {
        res.status(200).json({message: 'products/activeUnactive funciona'});
    } catch (error) {
        res.status(500).json({ message: 'Error en la base de datos', error: error.message });
    }
}

module.exports = {
        getAllProducts,
        getProductById,
        postNewProduct,
        deleteProduct,
        editProduct,
        activeUnactiveProduct
    };