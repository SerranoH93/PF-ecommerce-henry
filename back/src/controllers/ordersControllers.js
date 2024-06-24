const { Product, Category } = require('../db');
const { Op, where } = require('sequelize');

const getAllOrders = async (req, res) => {
    try {
        res.status(200).json({message: 'order/getAllOrders '});
    } catch (error) {
        res.status(500).json({ message: 'Error en la base de datos', error: error.message });
    }
}

const createOrder = async (req, res) => {
    try {
        res.status(200).json({message: 'order/createOrder'});
    } catch (error) {
        res.status(500).json({ message: 'Error en la base de datos', error: error.message });
    }
}

const orderDetail = async (req, res) => {
    try {
        res.status(200).json({message: 'order/orderDetail'});
    } catch (error) {
        res.status(500).json({ message: 'Error en la base de datos', error: error.message });
    }
}

const deleteOrder = async (req, res) => {
    try {
        res.status(200).json({message: 'order/deleteOrder'});
    } catch (error) {
        res.status(500).json({ message: 'Error en la base de datos', error: error.message });
    }
}

module.exports = {
    getAllOrders,
    createOrder,
    orderDetail,
    deleteOrder
    };