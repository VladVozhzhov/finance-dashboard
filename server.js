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
const mongoose = require('mongoose');
const connectDB = require('./backend/config/dbConn');

const PORT = process.env.PORT || 3500;

// Connect to MongoDB
connectDB();
mongoose.connection.on('error', err => console.error('MongoDB connection error:', err));

// Logger Middleware
app.use(logger);

// Handle credentials before CORS
app.use(credentials);

// CORS
app.use(cors(corsOptions));

// Parse incoming data
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());

// Serve static files
app.use('/', express.static(path.join(__dirname, '/public')));

// Public Routes (No JWT Required)
app.use('/', require('./backend/routes/root'));
app.use('/register', require('./backend/routes/register'));
app.use('/auth', require('./backend/routes/auth'));
app.use('/refresh', require('./backend/routes/refresh'));
app.use('/logout', require('./backend/routes/logout'));
app.use('/data', require('./backend/routes/data'));

// Protected Routes (JWT Required)
app.use(verifyJWT);
app.use('/users/chart', require('./backend/routes/chart'));
app.use('/users', require('./backend/routes/userWidgets'));
app.use('/users/progressBars', require('./backend/routes/progressBars'));
app.use('/widgets', require('./backend/routes/widgets'));
app.use('/progressBars', require('./backend/routes/progressBarsAll'));

app.use((req, res, next) => {
  console.log(`❓ Unmatched route: ${req.method} ${req.originalUrl}`);
  next();
});

// Error handler
app.use(errorHandler);

// Start server after DB connection established
mongoose.connection.once('open', () => {
  console.log('Connected to MongoDB');
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
