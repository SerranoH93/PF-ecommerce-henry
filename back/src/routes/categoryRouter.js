const { Router } = require("express");
const { 
    getAllCategories, 
    newCategory
} = require("../controllers/categoryController");
const upload = require("../utils/multerConfiguration");

const categoriesRoute = Router();

categoriesRoute.get("/", getAllCategories);
categoriesRoute.post("/create", upload, newCategory); //*Añadir categoría nueva (Se cambiará a la ruta admin)

module.exports = categoriesRoute;
