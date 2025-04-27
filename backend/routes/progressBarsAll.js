const express = require('express');
const router = express.Router();
const progressBarsController = require('../controllers/progressBarsController');

router
    .get('/', progressBarsController.getAllProgressBars)

module.exports = router;
