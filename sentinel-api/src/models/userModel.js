// models/userModel.js
const {Op, DataTypes } = require('sequelize');

const User = require('./user');
const Role = require('./role');
const Permission = require('./permission');

const sequelize = require('../config/database');
const crypto = require('crypto');
const RolePermission = require('./rolepermission');
const logger = require('../config/logger');

User.belongsTo(Role, { foreignKey: 'role_id' });
Role.hasMany(User, { foreignKey: 'role_id' });
Role.belongsToMany(Permission, { through: RolePermission, foreignKey: 'role_id' });
Permission.belongsToMany(Role, { through: RolePermission, foreignKey: 'permission_id' })

const UserModel = {
    async findByEmail(email) {
        try {
            const user = await User.findOne({
                where: { email },
                include: [{
                    model: Role,
                    include: [Permission]
                }]
            });
            if (user) {
                const plainUser = user.get({ plain: true });
                const role = await user.getRole();
                const permissions = await role.getPermissions();
                plainUser.permissions = permissions.map(p => ({ action: p.action, resource: p.resource }));
                plainUser.role_name = role.name;
                delete plainUser.Role;
                return plainUser;
            }


            return null;
        } catch (error) {
            logger.error('Error in findByEmail:', error);
            throw error;
        }
    },

    async create(userData) {
        try {
            const user = await User.create(userData);
            const createdUser = await this.findByEmail(user.email);
            logger.info('User created: %o', createdUser);
            return createdUser;
        } catch (error) {
            logger.error('Error in create:', error);
            throw error;
        }
    },

    async findById(id) {
        try {
            const user = await User.findByPk(id, {
                include: [{
                    model: Role,
                    include: [Permission]
                }]
            });
            if (user) {
                const plainUser = user.get({ plain: true });
                plainUser.permissions = plainUser.Role.Permissions.map(p => p.name);
                plainUser.role_name = plainUser.Role.name;
                delete plainUser.Role;
                logger.info('User found by id: %o', plainUser);
                return plainUser;
            }
            logger.warn('No user found by id: %s', id);
            return null;
        } catch (error) {
            logger.error('Error in findById:', error);
            throw error;
        }
    }, async saveRefreshToken(userId, refreshToken, expiresIn) {
        try {
            const tokenFamily = crypto.randomUUID();
            const now = new Date();

            // Ensure expiresIn is a valid number
            const expiresInSeconds = parseInt(expiresIn, 10);
            if (isNaN(expiresInSeconds) || expiresInSeconds <= 0) {
                throw new Error('Invalid expiresIn value');
            }

            const expiresAt = new Date(now.getTime() + expiresInSeconds * 1000);

            // Validate that expiresAt is a valid date
            if (isNaN(expiresAt.getTime())) {
                throw new Error('Invalid expiration date calculated');
            }

            await User.update({
                refresh_token: refreshToken,
                refresh_token_expires_at: expiresAt,
                refresh_token_created_at: now,
                refresh_token_last_used: now,
                refresh_token_family: tokenFamily
            }, {
                where: { id: userId }
            });

            logger.info(`Refresh token saved for user: ${userId}`);
        } catch (error) {
            logger.error('Error in saveRefreshToken:', error);
            throw error;
        }
    },

    async findByRefreshToken(refreshToken) {
        try {
            const user = await User.findOne({
                where: {
                    refresh_token: refreshToken,
                    refresh_token_expires_at: { [Op.gt]: new Date() }
                },
                include: [{
                    model: Role,
                    include: [Permission]
                }]
            });

            if (user) {
                const plainUser = user.get({ plain: true });
                plainUser.permissions = plainUser.Role.Permissions.map(p => ({ action: p.action, resource: p.resource }));
                plainUser.role_name = plainUser.Role.name;
                delete plainUser.Role;
                logger.info(`User found by refresh token: ${user.id}`);
                return plainUser;
            }

            logger.warn('No user found with the provided refresh token');
            return null;
        } catch (error) {
            logger.error('Error in findByRefreshToken:', error);
            throw error;
        }
    },

    async updateRefreshToken(userId, oldToken, newToken, expiresIn) {
        try {
            const expiresAt = new Date(Date.now() + expiresIn * 1000);

            const [updatedRows] = await User.update({
                refresh_token: newToken,
                refresh_token_expires_at: expiresAt,
                refresh_token_last_used: new Date()
            }, {
                where: {
                    id: userId,
                    refresh_token: oldToken
                }
            });

            if (updatedRows > 0) {
                logger.info(`Refresh token updated for user: ${userId}`);
                return true;
            }

            logger.warn(`Failed to update refresh token for user: ${userId}`);
            return false;
        } catch (error) {
            logger.error('Error in updateRefreshToken:', error);
            throw error;
        }
    },

    async revokeRefreshToken(userId) {
        try {
            await User.update({
                refresh_token: null,
                refresh_token_expires_at: null,
                refresh_token_created_at: null,
                refresh_token_last_used: null,
                refresh_token_family: null
            }, {
                where: { id: userId }
            });

            logger.info(`Refresh token revoked for user: ${userId}`);
        } catch (error) {
            logger.error('Error in revokeRefreshToken:', error);
            throw error;
        }
    }
};

module.exports = UserModel;
