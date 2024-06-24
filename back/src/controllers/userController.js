const { User } = require('../db');
const { Op, where } = require('sequelize');

const registerUser = async (req, res) => {
    try {
        const { user } = req.body;

        if (!user) {
            return res.status(400).send("User data is required");
        }

        const { email, email_verified, name, nickname, picture } = user;

        let existingUser = await User.findOne({ where: { email } });

        if (existingUser.email_verified == false && email_verified == true){
            existingUser = await existingUser.update({
                email_verified: true
            })
        }

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

            return res.status(201).json(newUser);
        }

    } catch (error) {
        console.error('Error in registerUser:', error);
        res.status(500).json({ message: 'Database error', error: error.message });
    }
};

const loginUser = async (req, res) => {
    try {
        res.status(200).json({message: 'user/login'});
    } catch (error) {    
        res.status(500).json({ message: 'Error en la base de datos', error: error.message });
    }
}

const editUser = async (req, res) => {
    try {
        res.status(200).json({message: 'user/edit'});
    } catch (error) {
        res.status(500).json({ message: 'Error en la base de datos', error: error.message });
    }
}

module.exports = {
    registerUser,
    loginUser,
    editUser
    };