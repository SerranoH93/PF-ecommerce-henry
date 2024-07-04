require("dotenv").config;
const path = require("path");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const processPayment = async (req, res) => {
  const { productId, amount } = req.body;

    try {
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [
                {
                    price_data: {
                        currency: 'usd',
                        product_data: {
                            name: 'Producto',  // Nombre del producto
                        },
                        unit_amount: amount,  // Monto en centavos (ej. $10.00 = 1000 centavos)
                    },
                    quantity: 1,  // Cantidad del producto
                },
            ],
            mode: 'payment',
            success_url: 'http://localhost:3000/success',  // URL de éxito después de la compra
            cancel_url: 'http://localhost:3000/cancel',  // URL de cancelación
        });

        res.json({ id: session.id });
    } catch (error) {
        console.error('Error al crear sesión de pago:', error.message);
        res.status(500).json({ error: 'Error al iniciar la sesión de pago.' });
    }
};

module.exports = {
  processPayment,
};

/*try {
    const body = await req.json()
    const session = await stripe.checkout.session.Create({
      seccess_url:"http://localhost:3002/success",
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
  }*/
