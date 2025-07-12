// server/validation/postValidation.js

const { body } = require('express-validator');

/**
 * Validation rules for creating and updating a blog post.
 * Uses express-validator to define rules for title, content, and category.
 */
exports.validatePost = [
    body('title')
        .notEmpty().withMessage('Title is required')
        .isLength({ max: 100 }).withMessage('Title cannot be more than 100 characters'),
    body('content')
        .notEmpty().withMessage('Content is required'),
    body('category')
        .notEmpty().withMessage('Category is required')
        .isMongoId().withMessage('Invalid category ID format') // Ensure it's a valid MongoDB ObjectId
];
