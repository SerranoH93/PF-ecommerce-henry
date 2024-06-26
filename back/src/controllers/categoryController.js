const { Category } = require("../db");
const { Op, where } = require("sequelize");
const categoriesSchema = require('../validations/categoriesSchema');

const getAllCategories = async (req, res) => {
    try {
        const categoriesDB = await Category.findAll({ Category });
        res.status(200).json(categoriesDB);
    } catch (error) {
        res.status(400).json({
            error: error.message,
        });
    }
};

const newCategory = async (req, res) => {
    try {
        // console.log(req.body)
        let validationsCheck = await categoriesSchema.safeParseAsync(req.body);

        if (validationsCheck.success === false) {
            return res.status(400).json(validationsCheck.error.issues[0])
        }

        const categoryToLowerCase = req.body.name.toLowerCase()
        const category = await Category.findOne({
            where: {
                name: categoryToLowerCase
            }
        });
        console.log(category, "Categoría encontrada");

        if(category) {
            return res.status(400).json({message: 'La categoría ya existe'})
        }

        const newCategory = await Category.create({
            name: categoryToLowerCase,
            description: req.body.description
        })

        res.status(200).json({message: 'Se creo nueva categoría'});

    } catch (error) {
        res.status(500).json({ message: 'Error al crear la categoria', error: error.message })

    }
}
module.exports = {
    getAllCategories,
    newCategory
};
