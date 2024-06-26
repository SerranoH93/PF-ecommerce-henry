const { Category } = require("../db");
const { Op, where } = require("sequelize");
const categoriesSchema = require('../validations/categoriesSchema');

const getAllCategories = async (req, res) => {
    try {
        const categoriesDB = await Category.findAll({ Category });
        res.status(200).json(categoriesDB);
    } catch (error) {
        res.status(500).json({ message: 'Error de la base de datos', error: error.message });
    }
};

const getCategoryById = async (req, res) => {
    const categoryId = req.params.id;

    try {
        const category = await Category.findByPk(categoryId);
        
        if(!category) {
            return res.status(404).json({ message: 'Categoría no encontrada'});
        }

        res.status(200).json(category);
    } catch (error) {
        res.status(500).json({ message: 'Error en la base de datos', error: error.message });
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
        // console.log(category, "Categoría encontrada");

        if(category) {
            return res.status(400).json({message: 'La categoría ya existe'})
        }

        const newCategory = await Category.create({
            name: categoryToLowerCase,
            description: req.body.description
        })

        res.status(200).json({message: 'Se creo nueva categoría'});

    } catch (error) {
        res.status(500).json({ message: 'Error al crear la categoría', error: error.message });
    }
};

const deleteCategory = async (req, res) => {
    const categoryId = req.params.id;

    try {
        const category = await Category.findByPk(categoryId);

        if(!category) {
            return res.status(404).json({ message: 'Categoria no encontrada'})
        } else {
            await Category.destroy({ 
                where: {
                    id: category.id
                }
            });
            res.status(200).json({ message: 'Categoría eliminada exitosamente' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error al borrar la categoría', error: error.message });    
    }
};

module.exports = {
    getAllCategories,
    getCategoryById,
    newCategory,
    deleteCategory
};
