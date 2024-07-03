require("dotenv").config
const path = require("path")
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY)

const webhook = async (req, res) => {
    let event
    try {
        event = req.body
    } catch (error) {
        console.error('Error al parsear la notificacion de evento', error);
        return res.status(400).send(`webhook Error:${error.message}`)
    }

    //Manejar el evento según el tipo
    switch (event.type) {
        case 'checkout.session.completed':
            const session = event.data.objet
            //Aquí puedes actualizar el estado de la orden en tu dase de datos, enviar correos electrónicos, etc.
            console.log('Pago completado', session);
            break;
            default:
                console.log(`Evento np manejado: ${event.type}`);
    }
    //Devolver una respuesta al webhook
    res.json({received: true})
}

module.exports = {
    webhook,
}