const { Product, Category } = require('../db');
const uploadImage = require('../utils/cloudinaryConfiguration');
const crypto = require('crypto');
const newProductSchema = require('../validations/newProductSchema');
const validateImages = require('../validations/filesValidations');


const getAllProducts = async (req, res) => {
    res.status(200).json("Hola get all products");
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
        console.log(req.files);
        const validationResult = validateImages(req.files);

        if (!validationResult.valid) {
            return res.status(400).json({
                message: "Uno o más archivos no son válidos.",
                errors: validationResult.errors,
            });
        }

        req.body.id =crypto.randomUUID();

        const files = req.files;        
        const uniqueField = req.body.id;
        const imagesUrl = [];

        for (const file of files) {
            const fileBuffer = file.buffer;
            const result = await uploadImage('product', uniqueField, fileBuffer);
            imagesUrl.push(result.secure_url);
        }      

        // console.log(req.body, 'req')

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
        
        console.log(newProduct);
        res.status(200).json('Se creo nuevo producto'); 
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }     
    }

module.exports = {
        getAllProducts,
        postNewProduct
    };