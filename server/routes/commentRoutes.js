// server/routes/commentRoutes.js

const express = require('express');
const { getComments, addComment } = require('../controllers/commentController');
const { commentValidation } = require('../validation/commentValidation');
const { protect } = require('../middleware/auth');

// Merge params from parent router (postRoutes)
const router = express.Router({ mergeParams: true });

router.route('/')
    .get(getComments) // Get comments for a specific post
    .post(protect, commentValidation, addComment); // Add a comment (protected)

module.exports = router;
