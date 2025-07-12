// server/models/Post.js
// Mongoose model for blog posts.
const mongoose = require('mongoose');

const postSchema = mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, 'Please add a title'],
            trim: true,
            minlength: 3,
            maxlength: 100,
        },
        content: {
            type: String,
            required: [true, 'Please add content'],
            minlength: 10,
        },
        category: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Category', // Reference to the Category model
            required: [true, 'Please select a category'],
        },
        author: {
            type: String,
            default: 'Anonymous',
            trim: true,
            maxlength: 50,
        },
        tags: [
            {
                type: String,
                trim: true,
                maxlength: 30,
            },
        ],
    },
    {
        timestamps: true, // Adds createdAt and updatedAt fields
    }
);

module.exports = mongoose.model('Post', postSchema);
