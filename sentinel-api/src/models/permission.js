const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Permission = sequelize.define('Permission', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    action: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    resource: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    }
}, {
    tableName: 'permissions',
    timestamps: false
});

module.exports = Permission;