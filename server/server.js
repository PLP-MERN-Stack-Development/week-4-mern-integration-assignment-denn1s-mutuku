        // server/server.js
        // This is the main entry point for your Express.js server.
       require('dotenv').config(); 
        const express = require('express');
        const dotenv = require('dotenv');
        const morgan = require('morgan');
        const cors = require('cors');
        const connectDB = require('./config/db');
        const postRoutes = require('./routes/postRoutes');
        const categoryRoutes = require('./routes/categoryRoutes');
        const authRoutes = require('./routes/authRoutes');
        // Import the entire errorMiddleware module
        const errorMiddleware = require('./middleware/errorMiddleware'); // Changed import

        // Load environment variables from .env file
        

        // Connect to MongoDB
        connectDB();

        const app = express();

        // Middleware
        app.use(express.json()); // Body parser for JSON data
        app.use(express.urlencoded({ extended: false })); // Body parser for URL-encoded data
        app.use(morgan('dev')); // HTTP request logger
        app.use(cors()); // Enable CORS for all origins

        // API Routes
        app.use('/api/posts', postRoutes);
        app.use('/api/categories', categoryRoutes);
        app.use('/api/auth', authRoutes);
        // Root route for testing
        app.get('/', (req, res) => {
            res.send('API is running...');
        });

        // Error handling middleware
        // Use the functions from the imported errorMiddleware object
        app.use(errorMiddleware.notFound);
        app.use(errorMiddleware.errorHandler);

        const PORT = process.env.PORT || 5000;

        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
        