require('dotenv').config
const Stripe = require('stripe')
const {API_SERVER} = process.env;

const stripe = new Stripe(API_SERVER)

const postWebhook = async (req, res) => {
    return NextResponse.json("recibiendo webhook")
}

module.exports = {
    postWebhook,
}