const express = require('express');

const router = express.Router();
const inventoryController = require('../controllers/inventoryControllers');

// Inventory routes
router.get('/list', inventoryController.getAllInventory);
router.get('/list/:i_id', inventoryController.getInventoryById);
router.post('/new', inventoryController.createInventory);
router.put('/update/:i_id/:p_id', inventoryController.updateInventory);
router.delete('/delete/:i_id/:p_id', inventoryController.deleteInventory);

module.exports = router;