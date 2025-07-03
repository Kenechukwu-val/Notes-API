const User = require('../models/user.model');
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

module.exports = protect;