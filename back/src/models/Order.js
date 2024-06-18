const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('order', {
        id: { 
            type: DataTypes.INTEGER, 
            primaryKey: true, 
            autoIncrement: true 
        },
        status: { 
            type: DataTypes.STRING, 
            allowNull: false 
        },
        total: { 
            type: DataTypes.FLOAT, 
            allowNull: false 
        },
        payment_method: { 
            type: DataTypes.STRING, 
            allowNull: false 
        }
    }, {
        paranoid: true
    })
};