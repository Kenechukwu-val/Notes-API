const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const noteRoutes = require('./routes/note.routes');

dotenv.config();
const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use('/api', noteRoutes);


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