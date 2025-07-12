// server/controllers/commentController.js

const Comment = require('../models/Comment');
const Post = require('../models/post'); // To ensure post exists
const { validationResult } = require('express-validator');

/**
 * @desc    Get comments for a specific post
 * @route   GET /api/posts/:postId/comments
 * @access  Public
 */
exports.getComments = async (req, res, next) => {
    try {
        const post = await Post.findById(req.params.postId);

        if (!post) {
            return res.status(404).json({ success: false, error: 'Post not found' });
        }

        // Populate the author field to get author details (e.g., username)
        const comments = await Comment.find({ post: req.params.postId }).populate('author', 'username');

        res.status(200).json({ success: true, count: comments.length, data: comments });
    } catch (error) {
        next(error);
    }
};

/**
 * @desc    Add a comment to a specific post
 * @route   POST /api/posts/:postId/comments
 * @access  Private (requires authentication)
 */
exports.addComment = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ success: false, errors: errors.array() });
    }

    try {
        const post = await Post.findById(req.params.postId);

        if (!post) {
            return res.status(404).json({ success: false, error: 'Post not found' });
        }

        // Attach the user ID from the protected route middleware
        req.body.post = req.params.postId;
        req.body.author = req.user.id; // User ID from JWT payload

        const comment = await Comment.create(req.body);

        // Populate author for immediate response
        const populatedComment = await Comment.findById(comment._id).populate('author', 'username');

        res.status(201).json({ success: true, data: populatedComment });
    } catch (error) {
        next(error);
    }
};
