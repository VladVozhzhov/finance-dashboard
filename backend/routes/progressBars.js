const express = require('express');
const router = express.Router();
const progressBarsController = require('../controllers/progressBarsController');

router
    .get('/progressBars', progressBarsController.getAllProgressBars)
    .post('/progressBars', progressBarsController.createProgressBar)
    .patch('/progressBars/:pbid', progressBarsController.updateProgressBar)
    .delete('/progressBars/:pbid', progressBarsController.deleteProgressBar);

module.exports = router;
