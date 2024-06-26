const { Router } = require("express");
const { 
    getAllCategories, 
    newCategory,
    getCategoryById
} = require("../controllers/categoryController");
const upload = require("../utils/multerConfiguration");

const categoriesRoute = Router();

categoriesRoute.get("/", getAllCategories);
categoriesRoute.get("/:id", getCategoryById);
categoriesRoute.post("/create", upload, newCategory); //*Añadir categoría nueva (Se cambiará a la ruta admin)

module.exports = categoriesRoute;
