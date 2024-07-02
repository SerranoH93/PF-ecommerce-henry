require('dotenv').config
const Stripe = require('stripe')
const {API_SERVER} = process.env;

const stripe = new Stripe(API_SERVER)

const postPay = async (req, res) => {
  try {
    const body = await req.json()
    const session = await stripe.checkout.session.Create({
      seccess_url:"http://localhost:3000/success",
      line_items:[{
        price_data:{
          currency: "usd",
          product_data:{
            name: body.name,
            imagen: [body.image],
            size: body.size,
          },

        unit_amount: body.price,
        },
        quantity: body.quantity,
      },
    ],
    metadata: {
      productId: body.id,
    },
    mode: "payment",
    })
    res.status(200).json({session})
  } catch (error) {
    res.status(500).json({error: error.message})
  }
}

module.exports = {
  postPay
}