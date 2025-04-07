const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { checkUsername } = require('../controllers/checkUsernameController');
const rateLimit = require('express-rate-limit');

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, 
  message: "Too many login attempts from this IP, please try again after 15 minutes",
});

router.post('/', loginLimiter, authController.handleLogin);

router.post('/check-username', checkUsername);

module.exports = router;