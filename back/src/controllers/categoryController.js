const { Category } = require("../db");
const { Op, where } = require("sequelize");

const getAllCategories = async (req, res) => {
  const { name } = req.query;

  try {
      const categoriesDB = await Category.findAll({ Category });
      res.status(200).json(categoriesDB);
  } catch (error) {
    res.status(400).json({
      error: error.message,
    });
  }
};
module.exports = {
  getAllCategories,
};
