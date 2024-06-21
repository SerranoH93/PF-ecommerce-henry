const { Product, Category } = require("../db");
const { Op, where } = require("sequelize");

const getCategories = async (req, res) => {
  const { name } = req.query;

  try {
    if (name) {
      const category = await Category.findAll({
        where: { name: { [Op.iLike]: `%${name}%` } },
      });
      res.status(200).json(category);
    } else {
      const categoriesDB = await Category.findAll({ include: Product });
      res.status(200).json(categoriesDB);
    }
  } catch (error) {
    res.status(400).json({
      error: error.message,
    });
  }
};
/*
const getCategoryByName = async (req, res) => {
    const {name} = req.query
    try {
        const categorie =  await Category.findAll({
            where: { name: { [Op.iLike]: `%${name}%`}},
        })
        res.status(200).json(categorie)
    } catch (error) {
        res.status(400).json({message:'Error al intentar obtener categoria', error: error.message})
    }
}
*/
module.exports = {
    getCategories
};
