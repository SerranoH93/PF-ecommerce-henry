const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('notification', {
        id: { 
            type: DataTypes.INTEGER, 
            primaryKey: true, 
            autoIncrement: true 
        },
        type: { 
            type: DataTypes.STRING, 
            allowNull: false 
        },
        message: { 
            type: DataTypes.STRING, 
            allowNull: false 
        },
        sent_at: { 
            type: DataTypes.DATE, 
            allowNull: false 
        }
    }, {
        paranoid: true
    });
};