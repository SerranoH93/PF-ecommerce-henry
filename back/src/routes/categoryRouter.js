const { Router } = require("express");
const {
  getAllCategories,
  getCategoryByName,
} = require("../controllers/catrgoryController");

const categoriesRoute = Router();

categoriesRoute.get("/", getAllCategories);

module.exports = categoriesRoute;
