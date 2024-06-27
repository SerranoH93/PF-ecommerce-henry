const { Product, Category } = require("../db");
const { Op, where } = require("sequelize");

const getFilter = async (req, res) => {
  const { name, gender, category } = req.query;

  // try {
    
    
  //   const where = {};

  //   if (name) {
  //     where.name = {
  //       [Op.like]: `%${name}%`
  //     };
  //   }

  //   if (gender) {
  //     where.gender = gender;
  //   }

  //   if (category) {
  //     where.category = category;
  //   }

  //   const products = await Product.findAll({ where });
  //   res.json(products);
  // } catch (error) {
  //   res.status(500).json({ error: error.message });
  // }


  try {
    if (name) {
      const productName = await Product.findAll({
        where: { name: { [Op.iLike]: `%${name}%` } },
      });
      res.status(200).json(productName);
    } else if (gender) {
      const productGen = await Product.findAll({
        where: { gender: { [Op.iLike]: `%${gender}%` } },
      });
      res.status(200).json(productGen);
    } else if (category) {
      const productCat = await Product.findAll({
        where: { category_id: category }
      });
      res.status(200).json(productCat);
    } else {
      const productsDB = await Product.findAll({ include: Category });
      res.status(200).json(productsDB);
    }
  } catch (error) {
    res.status(400).json({
      error: error.message,
    });
  }
};

module.exports = {
  getFilter,
};
