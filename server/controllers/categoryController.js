// server/controllers/categoryController.js
// Contains the logic for handling category-related API requests.
const Category = require('../models/Category');
const asyncHandler = require('express-async-handler');

// @desc    Get all categories
// @route   GET /api/categories
// @access  Public
const getCategories = asyncHandler(async (req, res) => {
    const categories = await Category.find({});
    res.status(200).json(categories);
});

// @desc    Create new category
// @route   POST /api/categories
// @access  Public (can be changed to private with authentication)
const createCategory = asyncHandler(async (req, res) => {
    const { name, description } = req.body;

    const categoryExists = await Category.findOne({ name });

    if (categoryExists) {
        res.status(400);
        throw new Error('Category with this name already exists');
    }

    const category = await Category.create({
        name,
        description,
    });

    res.status(201).json(category);
});

module.exports = {
    getCategories,
    createCategory,
};
