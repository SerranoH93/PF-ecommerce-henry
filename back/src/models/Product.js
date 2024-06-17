const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('product', {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false
        },
        price: {
            type: DataTypes.FLOAT,
            allowNull: false
        },
        gender: {
            type: DataTypes.STRING,
            allowNull: false
        },
        stock: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        active: {
            type: DataTypes.BOOLEAN,
            defaultValue: true            
        },
        size: {
            type: DataTypes.INTEGER,//  DataTypes.JSON,
            allowNull: true,
            // defaultValue: {}            
        },
        images: {
            type: DataTypes.ARRAY(DataTypes.STRING),
            allowNull: false
        }
    }, { 
        
        paranoid: true
    });
};
