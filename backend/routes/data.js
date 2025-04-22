const express = require('express');
const router = express.Router();
const User = require('../model/User');

router.get('/', async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching data', error: err.message });
    }
});

module.exports = router;
