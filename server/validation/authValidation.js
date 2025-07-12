// server/validation/authValidation.js
const { body } = require('express-validator');

const registerValidation = [
  body('username')
    .notEmpty().withMessage('Username is required')
    .isLength({ min: 3 }).withMessage('Username must be at least 3 characters long'),
  body('email')
    .isEmail().withMessage('Please include a valid email'),
  body('password')
    .isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
];

const loginValidation = [
  body('email')
    .isEmail().withMessage('Please include a valid email'),
  body('password')
    .notEmpty().withMessage('Password is required')
];

// ✅ Export properly
module.exports = {
  registerValidation,
  loginValidation
};
