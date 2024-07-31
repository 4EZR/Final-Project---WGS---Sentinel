// middleware/authMiddleware.js
const { verifyAccessToken } = require('../utils/jwtUtils');
const { AppError } = require('./errorHandler');

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return next(new AppError(401, 'Access token is required'));
    }

    try {
        const payload = verifyAccessToken(token);
        req.user = payload;
        next();
    } catch (error) {
        next(new AppError(403, 'Invalid access token'));
    }
};

module.exports = { authenticateToken };