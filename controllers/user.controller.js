const User = require('../models/User');

exports.register = async (req, res) => {
    const { name, email, password } = req.body;

    try{
        //Checks if the user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(400).json({ message: 'User already exists' });

        //Creates a new user
        const user = await User.create({ name, email, password });
        res.status(201).json({
            message: 'User registered successfully',
            user
        })
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ 
            message: 'Server error',
            error: err.message
        });
    }
}

exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        //Checks if the user exists
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: 'User not found' });

        //Checks if the password is correct
        const isMatch = await user.comparePassword(password);
        if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

        res.status(200).json({
            message: 'Login successful',
            user
        });
    }
    catch(err) {
        console.error(err);
        res.status(500).json({ 
            message: 'Server error',
            error: err.message
        });
    }
}