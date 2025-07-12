// server/middleware/auth.js

const jwt = require('jsonwebtoken');
const User = require('../models/User');

/**
 * @desc    Protect routes
 * @param   {Object} req - Express request object
 * @param   {Object} res - Express response object
 * @param   {Function} next - Express next middleware function
 */
exports.protect = async (req, res, next) => {
    let token;

    // Check for token in headers (Bearer token)
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    }
    // You can also check for token in cookies if you prefer
    // else if (req.cookies.token) {
    //     token = req.cookies.token;
    // }

    // Make sure token exists
    if (!token) {
        return res.status(401).json({ success: false, error: 'Not authorized to access this route' });
    }

    try {
        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Attach user to the request object
        req.user = await User.findById(decoded.id);
        if (!req.user) {
            return res.status(401).json({ success: false, error: 'User not found for this token' });
        }
        next();
    } catch (error) {
        return res.status(401).json({ success: false, error: 'Not authorized to access this route (token invalid)' });
    }
};
