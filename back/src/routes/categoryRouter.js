const { Router } = require("express");
const { getAllCategories } = require("../controllers/categoryController");

const categoriesRoute = Router();

categoriesRoute.get("/", getAllCategories);

module.exports = categoriesRoute;
