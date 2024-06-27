const { Product, Category } = require("../db");
const { Op, where } = require("sequelize");

const getFilter = async (req, res) => {
  const { name, gender, category } = req.query;

  try {
    const where = {};

    if (name) {
      where.name = { [Op.iLike]: `%${name}%` };
    }
    if (gender) {
      where.gender = { [Op.iLike]: `%${gender}%` };
    }
    if (category) {
      where.category_id = category;
    }

    const productsDB = await Product.findAll({ include: Category, where });
    res.status(200).json(productsDB);

  } catch (error) {
    res.status(400).json({
      error: error.message,
    });
  }
};

module.exports = {
  getFilter,
};