const { User } = require('../db');
const emailer = require("../utils/nodemailerConfig");

const registerUser = async (req, res) => {
    try {
        const { user } = req.body;

        if (!user) {
            return res.status(400).send("User data is required");
        }

        const { email, email_verified, name, nickname, picture } = user;

        let existingUser = await User.findOne({ where: { email } });

        if (existingUser) {
            return res.status(200).send("Existing User");
        } else {
            const newUser = await User.create({
                email,
                email_verified,
                name,
                nickname,
                picture
            });

            const message = "Gracias por registrarte en Moda Urbana"
            const title = "Registro exitoso"
            emailer.sendMail(newUser.email, newUser.name, message, title);

            return res.status(201).json(newUser);
        }

    } catch (error) {
        res.status(500).json({ message: 'Database error', error: error.message });
    }
};

const getUser = async (req, res) => {    
    try {
        const { email } = req.query;   
        // const { email } = req.query;     

        if (!email) {
            return res.status(400).json({ message: 'Email is required' });
        }

        const user = await User.findOne({ where: { email } });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: 'Error en la base de datos', error: error.message });
    }
}

const editUser = async (req, res) => {
    try {
        // const { user } = req.body;

        // if (!user) {
        //     return res.status(400).send("User data is required");
        // }

        // const { email, name, nickname, picture } = user;

        // let existingUser = await User.findOne({ where: { email } });

        // if (existingUser) {
        //     return res.status(200).send("Existing User");
        // } else {
        //     const newUser = await User.update({
        //         email, 
        //         name,
        //         nickname, 
        //         picture,
        //         phone,
        //         address
        //     });

        //     return res.status(201).json(newUser);
        // }
        res.status(200).send("Nice");
    } catch (error) {
        res.status(500).json({ message: 'Error en la base de datos', error: error.message });
    }
}

module.exports = {
    registerUser,
    editUser,
    getUser
};