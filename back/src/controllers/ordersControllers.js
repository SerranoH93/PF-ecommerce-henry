const { Sequelize } = require('sequelize');
const { Product, ShoppingCart, User } = require('../db');


const getAllOrders = async (req, res) => {
    try {
        const shoppingCartItems = await ShoppingCart.findAll();

        if (!shoppingCartItems){
            res.status(404).send("No items in the car")
        }

        res.status(200).json(shoppingCartItems);
    } catch (error) {
        res.status(500).json({ message: 'Error en la base de datos', error: error.message });
    }
}

const addProduct = async (req, res) => {
    try {
        const { orden } = req.body;

        if (!orden) {
            return res.status(404).send("Order not found");
        }
        
        const { product, quantity, user } = orden;
        const { id: product_id, stock, active } = product;
        const { id: user_id } = user;
        
        if (!stock || !active) {
            return res.status(200).send("Product out of stock / Product unavailable");
        } else {
            const addedProduct = await ShoppingCart.create({
                user_id,
                product_id,
                quantity
            });
        

        return res.status(201).json(addedProduct);
        }    
    } catch (error) {
        console.error('Error in addProduct:', error);
        res.status(500).json({ message: 'Database error', error: error.message });
    }
};

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
    addProduct,
    orderDetail,
    deleteOrder
    };