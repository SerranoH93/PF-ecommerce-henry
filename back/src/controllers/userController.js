const { Product, Category } = require('../db');
const { Op, where } = require('sequelize');

const registerUser = async (req, res) => {
    try {
        res.status(200).json({message: 'user/register funciona'});
    } catch (error) {
        res.status(500).json({ message: 'Error en la base de datos', error: error.message });
    }
}

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