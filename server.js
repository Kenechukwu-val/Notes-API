// Load environment variables early
const dotenv = require('dotenv');
dotenv.config();

// Core modules
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');

// Route handlers
const noteRoutes = require('./routes/note.routes');
const userRoutes = require('./routes/user.routes');

// Middleware
const { errorHandler, notFound } = require('./middleware/errorHandler.middleware');

const app = express();

// Middleware setup
app.use(express.json());
app.use(cors());

// Logging (only in development)
if (process.env.NODE_ENV !== 'production') {
    app.use(morgan('dev'));
}

// API routes
app.get('/', (req, res) => {
    res.send('Welcome to the Notes API');
});
app.use('/api', noteRoutes);
app.use('/api', userRoutes);

// Error handling middleware
app.use(notFound);
app.use(errorHandler);

// Database connection and server start
const PORT = process.env.PORT || 3500;

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log('Connected to MongoDB');
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch(err => {
        console.error('MongoDB connection error:', err);
    });