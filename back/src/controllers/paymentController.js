const  { NextResponse }  = require("next/server")
const Stripe = require ("stripe")

 const stripe = new Stripe 
( "sk_test_51PVx00CRx9u6cZBx0vpe5fnlekvqHhrf6aQcE8GOGpAO6QRDKB4CNLONiVqDvYmPf3otrtSgQ89hr7ZDeF93JHaK00dInH74PV")

const postPay  = async  (request) => {

    const body = await request.json() 
    try {
        const session = await stripe.checkout.sessions.create({
            success_url: "http://localhost:3000/sucess",
            line_items: [
                {
                    price_data: {
                        currency: "usd",
                        product_data: {
                            name: body.name,
                            images: [body.image],
                        },
                        unit_amount: body.price,
                    },
                    quantity: 1,
                },
            ],
            mode: "payment",
        });
    
        return NextResponse.json(session)
    }
        
     catch (error) {
        res.status(500).json({error: error.message})
    }


}
module.exports = {
  postPay 
}