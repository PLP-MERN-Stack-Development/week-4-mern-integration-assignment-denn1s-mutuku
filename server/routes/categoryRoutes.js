// server/routes/categoryRoutes.js
// Defines the API routes for categories and applies validation.
const express = require('express');
const router = express.Router();
const { getCategories, createCategory } = require('../controllers/categoryController');
const { body } = require('express-validator');
const { validate } = require('../middleware/validationMiddleware');

// Validation rules for category creation
const createCategoryValidation = [
    body('name')
        .notEmpty()
        .withMessage('Category name is required')
        .isLength({ min: 2, max: 50 })
        .withMessage('Category name must be between 2 and 50 characters'),
    body('description')
        .optional()
        .isLength({ max: 200 })
        .withMessage('Description cannot exceed 200 characters'),
];

router.route('/').get(getCategories).post(createCategoryValidation, validate, createCategory);

module.exports = router;
