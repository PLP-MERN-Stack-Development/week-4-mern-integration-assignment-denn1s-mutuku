// server/routes/postRoutes.js
// Defines the API routes for posts and applies validation.
const express = require('express');
const router = express.Router();
const {
    getPosts,
    getPostById,
    createPost,
    updatePost,
    deletePost,
} = require('../controllers/postController');
const { body } = require('express-validator');
const { validate } = require('../middleware/validationMiddleware'); // Custom validation middleware

// Validation rules for post creation
const createPostValidation = [
    body('title')
        .notEmpty()
        .withMessage('Title is required')
        .isLength({ min: 3, max: 100 })
        .withMessage('Title must be between 3 and 100 characters'),
    body('content')
        .notEmpty()
        .withMessage('Content is required')
        .isLength({ min: 10 })
        .withMessage('Content must be at least 10 characters long'),
    body('category')
        .notEmpty()
        .withMessage('Category is required')
        .isMongoId()
        .withMessage('Invalid category ID'),
    body('author')
        .optional()
        .isLength({ max: 50 })
        .withMessage('Author name cannot exceed 50 characters'),
    body('tags')
        .optional()
        .isArray()
        .withMessage('Tags must be an array')
        .custom((value) => {
            if (value && value.some(tag => typeof tag !== 'string' || tag.length > 30)) {
                throw new Error('Each tag must be a string and not exceed 30 characters');
            }
            return true;
        }),
];

// Validation rules for post update (all fields optional, but if present, must be valid)
const updatePostValidation = [
    body('title')
        .optional()
        .isLength({ min: 3, max: 100 })
        .withMessage('Title must be between 3 and 100 characters'),
    body('content')
        .optional()
        .isLength({ min: 10 })
        .withMessage('Content must be at least 10 characters long'),
    body('category')
        .optional()
        .isMongoId()
        .withMessage('Invalid category ID'),
    body('author')
        .optional()
        .isLength({ max: 50 })
        .withMessage('Author name cannot exceed 50 characters'),
    body('tags')
        .optional()
        .isArray()
        .withMessage('Tags must be an array')
        .custom((value) => {
            if (value && value.some(tag => typeof tag !== 'string' || tag.length > 30)) {
                throw new Error('Each tag must be a string and not exceed 30 characters');
            }
            return true;
        }),
];

router.route('/').get(getPosts).post(createPostValidation, validate, createPost);
router.route('/:id').get(getPostById).put(updatePostValidation, validate, updatePost).delete(deletePost);

module.exports = router;
