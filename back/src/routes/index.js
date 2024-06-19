const { Router } = require("express");
const router = Router();
const productsRouter = require("./productsRouter");
const categoriesRoute = require("./categoryRouter");

router.use("/products", productsRouter);
router.use("/categories", categoriesRoute);

module.exports = router;
