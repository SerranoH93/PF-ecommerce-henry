const { Router } = require("express");
const { getCategories } = require("../controllers/categoryController");

const categoriesRoute = Router();

categoriesRoute.get("/", getCategories);

module.exports = categoriesRoute;
