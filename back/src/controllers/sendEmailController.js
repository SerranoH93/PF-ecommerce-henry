const emailer = require("../utils/nodemailerConfig");

const sendWelcomeEmail = async (req, res) => {
    const data = req.body;

    console.log(req.body)
    try {
        emailer.sendMail(data.email, data.name, data.message, data.title);
        res.status(200).send("Email enviado con exito")
    } catch (error) {
        ;
        res.status(400).send("Email no enviado")
    }
}

const resetPasswordEmail = async (req, res) => {
    try {
        res.status(200).json({message: 'admin/resetPassword'});
    } catch (error) {
        res.status(500).json({ message: 'Error en la base de datos', error: error.message });
    }
}

module.exports = {
    sendWelcomeEmail,
    resetPasswordEmail
    };