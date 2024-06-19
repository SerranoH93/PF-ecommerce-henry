const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('orderDetail', {
        id: { 
            type: DataTypes.INTEGER, 
            primaryKey: true, 
            autoIncrement: true 
        },        
        quantity: { 
            type: DataTypes.INTEGER, 
            allowNull: false 
        },
        price: { 
            type: DataTypes.FLOAT,
            allowNull: false
        }
    }, {
        paranoid: true
    })
};