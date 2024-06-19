const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('review', {
        id: { 
            type: DataTypes.INTEGER, 
            primaryKey: true, 
            autoIncrement: true 
        },        
        rating: { 
            type: DataTypes.INTEGER, 
            allowNull: false 
        },
        comment: { 
            type: DataTypes.TEXT, 
            allowNull: false 
        }        
    }, {
        paranoid: true
    });
};