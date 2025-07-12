// server/controllers/postController.js
// Contains the logic for handling post-related API requests.
const Post = require('../models/Post');
const Category = require('../models/Category'); // To check if category exists
const asyncHandler = require('express-async-handler'); // Simple wrapper for async functions to catch errors

// @desc    Get all posts
// @route   GET /api/posts
// @access  Public
const getPosts = asyncHandler(async (req, res) => {
    const posts = await Post.find({}).populate('category', 'name'); // Populate category name
    res.status(200).json(posts);
});

// @desc    Get single post
// @route   GET /api/posts/:id
// @access  Public
const getPostById = asyncHandler(async (req, res) => {
    const post = await Post.findById(req.params.id).populate('category', 'name');

    if (!post) {
        res.status(404);
        throw new Error('Post not found');
    }

    res.status(200).json(post);
});

// @desc    Create new post
// @route   POST /api/posts
// @access  Public (can be changed to private with authentication)
const createPost = asyncHandler(async (req, res) => {
    const { title, content, category, author, tags } = req.body;

    // Check if the category exists
    const existingCategory = await Category.findById(category);
    if (!existingCategory) {
        res.status(400);
        throw new Error('Invalid category ID. Category does not exist.');
    }

    const post = await Post.create({
        title,
        content,
        category,
        author,
        tags: tags || [], // Ensure tags is an array
    });

    res.status(201).json(post);
});

// @desc    Update post
// @route   PUT /api/posts/:id
// @access  Public (can be changed to private with authentication)
const updatePost = asyncHandler(async (req, res) => {
    const { title, content, category, author, tags } = req.body;

    const post = await Post.findById(req.params.id);

    if (!post) {
        res.status(404);
        throw new Error('Post not found');
    }

    // If category is being updated, check if the new category exists
    if (category && category.toString() !== post.category.toString()) {
        const existingCategory = await Category.findById(category);
        if (!existingCategory) {
            res.status(400);
            throw new Error('Invalid category ID. Category does not exist.');
        }
    }

    post.title = title || post.title;
    post.content = content || post.content;
    post.category = category || post.category;
    post.author = author || post.author;
    post.tags = tags !== undefined ? tags : post.tags; // Allow clearing tags

    const updatedPost = await post.save();
    res.status(200).json(updatedPost);
});

// @desc    Delete post
// @route   DELETE /api/posts/:id
// @access  Public (can be changed to private with authentication)
const deletePost = asyncHandler(async (req, res) => {
    const post = await Post.findById(req.params.id);

    if (!post) {
        res.status(404);
        throw new Error('Post not found');
    }

    await Post.deleteOne({ _id: req.params.id }); // Use deleteOne or findByIdAndDelete
    res.status(200).json({ message: 'Post removed' });
});

module.exports = {
    getPosts,
    getPostById,
    createPost,
    updatePost,
    deletePost,
};
