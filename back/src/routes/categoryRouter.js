const { Router } = require("express");
const { getAllCategories, getCategoryByName,} = require("../controllers/categoryController");

const categoriesRoute = Router();

categoriesRoute.get("/", getAllCategories);
categoriesRoute.get('/:id', getCategoryByName)
module.exports = categoriesRoute;
