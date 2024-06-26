const { Router } = require("express");
const { 
    getAllCategories, 
    postNewCategory,
    getCategoryById,
    deleteCategory,
    editCategory
} = require("../controllers/categoryController");
const upload = require("../utils/multerConfiguration");

const categoriesRoute = Router();

categoriesRoute.get("/", getAllCategories);
categoriesRoute.get("/:id", getCategoryById);

categoriesRoute.post("/create", upload, postNewCategory); //*Añadir categoría nueva (Se cambiará a la ruta admin)
categoriesRoute.delete("/delete/:id", deleteCategory);//*Eliminar categoría (Se cambiará a la ruta admin)
categoriesRoute.put("/edit/:id", upload, editCategory); //*Editar categoría (se cambiará a la ruta admin)


module.exports = categoriesRoute;
