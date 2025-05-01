const express = require('express');
const router = express.Router();
const progressBarsController = require('../controllers/progressBarsController');

router
    .post('/', progressBarsController.createProgressBar)
    .patch('/:pbid', progressBarsController.updateProgressBar)
    .delete('/:pbid', progressBarsController.deleteProgressBar);

module.exports = router;
