require("dotenv").config;
const { Sequelize, where } = require('sequelize');
const { Product, ShoppingCart, User } = require('../db');
const path = require("path");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const getAllOrders = async (req, res) => {
    try {
        const {id} = req.query
        console.log(req.query)
        const user_id = id
        if (!user_id){
            res.status(404).send("El usuario no tiene carrito")
        }

        const shoppingCartItems = await ShoppingCart.findAll({where: {user_id}});

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

const setQuantity = async (req, res) => {
    try {
        const { id } = req.params;
        const order = await ShoppingCart.findByPk(id);
        const { quantity } = req.body
        if (!order) {
            return res.status(404).json({ message: 'Producto no encontrado en el carrito' });
        }

        await ShoppingCart.update(
            {
                quantity: quantity
            },
            {
                where: { id },
            }
        );

        res.status(200).send("Quantity Updated")

    } catch (error) {
        res.status(500).json({ message: 'Error en la base de datos', error: error.message });
    }
}

const deleteOrder = async (req, res) => {
    const { id } = req.params;
    try {
        const product = await ShoppingCart.findByPk(id);

        if (!product) {
            return res.status(404).json({ message: 'Producto no encontrado en el carrito' });
        }

        await product.destroy();

        res.status(200).json({ message: 'Producto eliminado del carrito con éxito' });
    } catch (error) {
        res.status(500).json({ message: 'Error en la base de datos', error: error.message });
    }
}

const clearShoppingCart = async (req, res) => {

    const { userId } = req.query;
    
    try {
        await ShoppingCart.destroy({
            where: { user_id: userId },
            // truncate: true
        });
        res.status(200).json({ message: 'Ordenes eliminadas' });
    } catch (error) {
        res.status(500).json({ message: 'Error en la base de datos', error: error.message });
    }
}

const createCheckoutSession = async (req, res) => {
    try {
        const { cartProducts, totalPrice } = req.body;
        console.log("Datos recibidos:", cartProducts, totalPrice); // Log para verificar datos de entrada
    
        // Obtener detalles del producto de la base de datos
        const productDetailsPromises = cartProducts.map(async (cartProduct) => {
          const product = await Product.findOne({ where: { id: cartProduct.product_id } });
          return {
            name: product.name,
            image: product.image,
            price: product.price,
            quantity: cartProduct.quantity,
          };
        });
    
        const productDetails = await Promise.all(productDetailsPromises);
    
        const lineItems = productDetails.map((product) => ({
          price_data: {
            currency: 'usd',
            product_data: {
              name: product.name,
              images: [product.image],
            },
            unit_amount: product.price, // Asegúrate de que el precio está en centavos
          },
          quantity: product.quantity,
        }));
    
        console.log("Line Items:", lineItems); // Log para verificar lineItems
    
        const session = await stripe.checkout.sessions.create({
          payment_method_types: ['card'],
          line_items: lineItems,
          mode: 'payment',
          success_url: 'http://localhost:3000/success',
          cancel_url: 'http://localhost:3000/cancel',
        });
    
        console.log("Session creada:", session); // Log para verificar la sesión creada
    
        res.status(200).json({ sessionId: session.id });
      } catch (error) {
        console.error("Error en createCheckoutSession:", error); // Log de errores detallados
        res.status(500).json({ message: 'Error en la creación de la sesión de pago', error: error.message });
      }
  };

module.exports = {
    getAllOrders,
    addProduct,
    setQuantity,
    deleteOrder,
    clearShoppingCart,
    createCheckoutSession,
    };