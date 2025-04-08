const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const uri = process.env.DATABASE_URI;
        if (!uri) {
            throw new Error('DATABASE_URI is not defined in the environment variables.');
        }
        await mongoose.connect(uri);
    } catch (err) {
        console.error('MongoDB connection error:', err);
    }
};

module.exports = connectDB;