const User = require('../models/User');
const jwt = require('jsonwebtoken');

//Middleware to protect routes 
const protect = async (req, res, next) => {
    let token;

    // Check if token is in the headers
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    }

    // If no token, return unauthorized
    if (!token) {
        return res.status(401).json({ message: 'Not authorized' });
    }

    try {
        // Verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        //retrieve the user while excluding the password
        req.user = await User.findById(decoded.id).select('-password');

        // If user is not found, return unauthorized
        if (!req.user) {
            return res.status(401).json({ message: 'User not found' });
        }

        // Proceed to the next middleware or route handler
        next();
    } catch (error) {
        console.error(error);

        // Handle specific JWT errors
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ message: 'Token expired' });
        } else if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({ message: 'Invalid token' });
        }
        
        res.status(401).json({ message: 'Token invalid' });
    }
}

// Middleware to handle errors
const errorHandler = (err, req, res, next ) => {
    console.error(err.stack);

    // Set the status code to 500 if it's not already set
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    res.status(statusCode).json({
        success: false,
        message: err.message || 'Server Error',
        stack: process.env.NODE_ENV === 'production' ? null : err.stack
    })
};

// Middleware to handle 404 Not Found errors
const notFound = (req, res, next) => {
    res.status(404);
    next(new Error(`Not Found - ${req.originalUrl}`));
}

module.exports = { protect, errorHandler, notFound };