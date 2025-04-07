const express = require('express');
const app = express();
const path = require('path');
const { logger } = require('./backend/middleware/logEvents');
const errorHandler = require('./backend/middleware/errorHandler');
const verifyJWT = require('./backend/middleware/verifyJWT');
const usersController = require('./backend/controllers/usersController');
const restrictAccessToAuth = require('./backend/middleware/restrictAccessToAuth');
const cors = require('cors');
const corsOptions = require('./backend/config/corsOptions');
const cookieParser = require('cookie-parser');
const authRoutes = require('./backend/routes/auth');
const registerRoutes = require('./backend/routes/register');
const PORT = process.env.PORT || 3500;

// Enable CORS
app.use(cors());

// custom middleware logger
app.use(logger);

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
app.use('/auth', authRoutes);
app.use('/register', registerRoutes);
app.get('/users', usersController.getAllUsers);

app.post('/refresh', require('./backend/controllers/refreshTokenController').handleRefreshToken);

// Apply JWT verification middleware to all routes below this line
app.use(verifyJWT);

// Error handling middleware
app.use(errorHandler);

// Serve React frontend for all other routes (move this to the end)
app.get('*splat', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// password for the "user": /* password */

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));