const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('shoppingCart', {
        id: { 
            type: DataTypes.INTEGER, 
            primaryKey: true, 
            autoIncrement: true
        },
        quantity: { 
            type: DataTypes.INTEGER, 
            allowNull: false 
        },user_id: {
            type: DataTypes.CHAR,
            allowNull: false
        },
        product_id: {
            type: DataTypes.CHAR,
            allowNull: false
        }
    }, {
        paranoid: true
    });
};
