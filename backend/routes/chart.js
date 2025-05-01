const express = require('express');
const router = express.Router();
const chartController = require('../controllers/chartController');

router.post('/', chartController.createChartItem);
router.post('/total', chartController.createChartTotal);
router.patch('/total', chartController.updateChartTotal);
router.delete('/:itemName', chartController.deleteChartItem); 
router.get('/', chartController.getChartData);

module.exports = router;
