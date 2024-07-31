const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Role = require('./role');
const Permission = require('./permission');
const RolePermission = sequelize.define('RolePermission', {
    role_id: {
        type: DataTypes.INTEGER,
        references: {
            model: Role,
            key: 'id'
        }
    },
    permission_id: {
        type: DataTypes.INTEGER,
        references: {
            model: Permission,
            key: 'id'
        }
    }
}, {
    tableName: 'rolepermissions', // Use lowercase here
    timestamps: false
});

module.exports = RolePermission;