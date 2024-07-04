const { Router } = require("express");
const { handlePayment } = require("../controllers/paymentController");

const payCartRoute = Router();

payCartRoute.post("/", handlePayment);

module.exports = payCartRoute;
