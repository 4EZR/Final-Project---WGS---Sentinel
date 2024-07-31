const UserModel = require('../models/userModel');
const { AppError } = require('../middleware/errorHandler');
const { generateAccessToken, generateRefreshToken, verifyRefreshToken } = require('../utils/jwtUtils');

const login = async (req, res, next) => {
    try {
        const { email } = req.body;

        if (!email.endsWith('@bpkpenaburjakarta.or.id')) {
            return next(new AppError(401, 'Unauthorized'));
        }

        let user = await UserModel.findByEmail(email);
        if (!user) {
            return next(new AppError(404, 'User not found ' + email));
        }

        const payload = {
            id: user.id,
            role: user.role_name
        };

        const accessToken = generateAccessToken(payload);
        const refreshToken = generateRefreshToken(payload);

        // Save refresh token to database (you need to implement this)
        const expiresInSeconds = 7 * 24 * 60 * 60; // 7 days in seconds

        // Save refresh token to database
        await UserModel.saveRefreshToken(user.id, refreshToken, expiresInSeconds);

        const userData = {
            id: user.id,
            email: user.email,
            name: user.name,
            role_name: user.role_name
        };

        res.status(200).json({
            status: 'success',
            accessToken,
            refreshToken,
            user: userData,
            permissions: user.permissions
        });
    } catch (error) {
        next(error);
    }
};

const refreshToken = async (req, res, next) => {
    try {
        const { refreshToken } = req.body;

        if (!refreshToken) {
            return next(new AppError(400, 'Refresh token is required'));
        }

        //const payload = verifyRefreshToken(refreshToken);

        // Check if refresh token is in database and valid
        const user = await UserModel.findByRefreshToken(refreshToken);
        if (!user) {
            return next(new AppError(401, 'Invalid refresh token'));
        }

        const newPayload = {
            id: user.id,
            role: user.role_name
        };

        const accessToken = generateAccessToken(newPayload);
        const newRefreshToken = generateRefreshToken(newPayload);

        // Update refresh token in database
        const expiresInSeconds = 7 * 24 * 60 * 60;
        await UserModel.updateRefreshToken(user.id, refreshToken, newRefreshToken, expiresInSeconds);

        res.status(200).json({
            status: 'success',
            accessToken,
            refreshToken: newRefreshToken
        });
    } catch (error) {
        next(error);
    }
};

module.exports = { login, refreshToken };