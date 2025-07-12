// server/validation/commentValidation.js

const { body } = require('express-validator');

exports.commentValidation = [
    body('content')
        .notEmpty().withMessage('Comment content cannot be empty')
        .isLength({ max: 500 }).withMessage('Comment cannot be more than 500 characters')
];
