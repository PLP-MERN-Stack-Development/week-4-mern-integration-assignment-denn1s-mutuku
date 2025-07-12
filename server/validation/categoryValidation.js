// server/validation/categoryValidation.js

const { body } = require('express-validator');

/**
 * Validation rules for creating a category.
 * Uses express-validator to define rules for the category name.
 */
exports.validateCategory = [
    body('name')
        .notEmpty().withMessage('Category name is required')
        .isLength({ max: 50 }).withMessage('Category name cannot be more than 50 characters')
];
