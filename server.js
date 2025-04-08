require('dotenv').config();
const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const corsOptions = require('./backend/config/corsOptions');
const { logger } = require('./backend/middleware/logEvents');
const errorHandler = require('./backend/middleware/errorHandler');
const verifyJWT = require('./backend/middleware/verifyJWT');
const cookieParser = require('cookie-parser');
const credentials = require('./backend/middleware/credentials');
const mongoose = require('mongoose')
const connectDB = require('./backend/config/dbConn');
const PORT = process.env.PORT || 3500;

// Connect to MongoDB
connectDB();

// Log MongoDB connection errors
mongoose.connection.on('error', (err) => {
    console.error('MongoDB connection error:', err);
});

// custom middleware logger
app.use(logger);

// Handle options credentials
app.use(credentials);

// Cross Origin Resource Sharing
app.use(cors(corsOptions));


// built-in middleware to handle urlencoded data
app.use(express.urlencoded({ extended: false }));

// built-in middleware for json 
app.use(express.json());

// middleware for cookies
app.use(cookieParser());

// Serve static files
app.use('/', express.static(path.join(__dirname, '/public')));

// Public routes (no authentication required)
app.use('/', require('./backend/routes/root'));
app.use('/register', require('./backend/routes/register'));
app.use('/auth', require('./backend/routes/auth'));
app.use('/refresh', require('./backend/routes/refresh'));
app.use('/logout', require('./backend/routes/logout'));

app.post('/refresh', require('./backend/controllers/refreshTokenController').handleRefreshToken);

// Apply JWT verification middleware to all routes below this line
app.use(verifyJWT);

// Error handling middleware
app.use(errorHandler);

// Serve React frontend for all other routes (move this to the end)
app.get('*splat', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.use(errorHandler);

mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
})