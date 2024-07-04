require("dotenv").config;
const path = require("path");
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const handlePayment = async (req, res) => {
  
};

module.exports = { handlePayment };

