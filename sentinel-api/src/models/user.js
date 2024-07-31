// models/user.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const User = sequelize.define('User', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    role_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    school_id: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    refresh_token: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    refresh_token_expires_at: {
        type: DataTypes.DATE,
        allowNull: true
    },
    refresh_token_created_at: {
        type: DataTypes.DATE,
        allowNull: true
    },
    refresh_token_last_used: {
        type: DataTypes.DATE,
        allowNull: true
    },
    refresh_token_family: {
        type: DataTypes.UUID,
        allowNull: true
    }
}, {
    tableName: 'users',
    timestamps: false
});


module.exports = User;