const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('user', {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true,
            },
        },
        email_verified: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
        name: {
            type: DataTypes.STRING,
        },
        picture: {
            type: DataTypes.STRING,
        },
        phone: {
            type: DataTypes.BIGINT
        },
        address: {
            type: DataTypes.STRING
        },
        isBanned:{
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        isAdmin:{
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
    }, {
        paranoid: true,
    });
};