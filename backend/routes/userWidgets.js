const express = require('express');
const router = express.Router();
const widgetsController = require('../controllers/widgetsController');

router
  .route('/:id/widgets/:type')
  .post(widgetsController.createWidgetOfType)
  .delete(widgetsController.deleteWidgetOfType)
  .get(widgetsController.getWidgetOfType);

router
  .route('/:id/widgets')
  .get(widgetsController.getAllWidgets);

module.exports = router;
