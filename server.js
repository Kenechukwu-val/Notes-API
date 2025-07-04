const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const morgan = require('morgan')
const noteRoutes = require('./routes/note.routes');
const userRoutes = require('./routes/user.routes');
const { errorHandler, notFound } = require('./middleware/errorHandler.middleware')

dotenv.config();
const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use('/api', noteRoutes);
app.use('/api', userRoutes);

app.use(notFound);
app.use(errorHandler);


if (process.env.NODE_ENV !== 'production') {
    app.use(morgan('dev'));
}


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