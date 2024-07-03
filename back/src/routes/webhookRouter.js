const { Router } = require("express");
const { webhook } = require("../controllers/webhookController");

const webhookRoute = Router();

webhookRoute.post("/", webhook);

module.exports = webhookRoute;
