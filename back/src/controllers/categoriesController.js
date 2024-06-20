const { Product, Category } = require('../db');
const { Op, where } = require('sequelize');

const getCategories = async (req, res) => {
    try {
        res.status(200).json({message: 'admin/products funciona'});
    } catch (error) {
        res.status(500).json({ message: 'Error en la base de datos', error: error.message });
    }
}

module.exports = {
    getCategories
    };