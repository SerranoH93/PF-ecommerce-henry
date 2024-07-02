const nodemailer = require("nodemailer");
const emailTemplete = require("../templates/emailTemplete");

const {
    EMAIL_USER, 
    EMAIL_PASS
} = process.env;

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: EMAIL_USER,
        pass: EMAIL_PASS
    }
});

const sendMail = (email, name, message, title) => {
    const htmlTemplete = emailTemplete(name, message, title);
    
    const mailOptions = {
        from: '"Moda Urbana" <modaurbana45@gmail.com>',
        to: email,
        subject: `Bienvenido a moda urbana ${name}`,
        html: htmlTemplete
    }
    
    transporter.sendMail(mailOptions, (error, info) => {
        if(error) {
            console.log(error);
        } else {
            console.log("Correo enviado");
        }
    })
};

exports.sendMail = (email, name, message, title) => sendMail(email, name, message, title);