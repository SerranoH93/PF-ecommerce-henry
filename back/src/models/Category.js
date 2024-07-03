const { DataTypes } = require('sequelize');


module.exports = (sequelize) => {
    sequelize.define('category', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: { 
            type: DataTypes.STRING, 
            allowNull: false 
        }        
    }, { 
        
        paranoid: true
    });
};