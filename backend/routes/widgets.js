const express = require('express');
const router = express.Router();
const widgetsController = require('../controllers/widgetsController');

router.route('/')
    .get(widgetsController.getAllWidgets);

router.route('/:id')
    .put(widgetsController.updateWidget)

module.exports = router;
