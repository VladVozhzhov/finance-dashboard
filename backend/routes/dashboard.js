const express = require('express');
const router = express.Router();
const path = require('path');

// Serve the dashboard route
router.get(['/dashboard/:id', '/index/dashboard/:id'], (req, res) => {
    res.sendFile(path.join(__dirname, '..', '..', 'index.html'));
});

module.exports = router;