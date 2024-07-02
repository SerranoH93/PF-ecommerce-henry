const { Router } = require("express");
const { processPayment } = require("../controllers/stripetController");

const paymentRoute = Router();

paymentRoute.post("/",processPayment)

module.exports = paymentRoute;
