const UserModel = require('../models/userModel');
const { AppError } = require('../middleware/errorHandler');

exports.getCurrentUser = async (req, res, next) => {
    try {
        const user = await UserModel.findById(req.user.id);
        if (!user) {
            throw new AppError(404, 'User not found');
        }
        res.json(user);
    } catch (error) {
        next(error);
    }
};

// Add more user-related controller functions here