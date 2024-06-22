const { Router } = require("express");
const { getFilter } = require("../controllers/filterController");

const filterRoute = Router();

filterRoute.get("/", getFilter);

module.exports = filterRoute;
