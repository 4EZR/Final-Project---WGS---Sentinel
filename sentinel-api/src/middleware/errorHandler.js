const logger = require('../config/logger');

class AppError extends Error {
    constructor(statusCode, message) {
        super(message);
        this.statusCode = statusCode;
        this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
        this.isOperational = true;

        Error.captureStackTrace(this, this.constructor);
    }
}

const errorHandler = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';

    const logInfo = {
        level: 'error',
        message: err.message,
        metadata: {
            stack: err.stack,
            statusCode: err.statusCode,
            path: req.path,
            method: req.method,
            body: req.body,
            params: req.params,
            query: req.query,
            user: req.user ? req.user.id : 'unauthenticated'
        }
    };

    logger.log(logInfo);

    if (process.env.NODE_ENV === 'development') {
        res.status(err.statusCode).json({
            status: err.status,
            error: err,
            message: err.message,
            stack: err.stack
        });
    } else {
        // Don't leak error details in production
        res.status(err.statusCode).json({
            status: err.status,
            message: err.isOperational ? err.message : 'Something went wrong!'
        });
    }
};

module.exports = { AppError, errorHandler };