const express = require('express');

const router = express.Router();
const inventoryController = require('../controllers/inventoryControllers');

// Inventory routes
router.get('/list', inventoryController.getAllInventory);
router.get('/list/:id', inventoryController.getInventoryById);
router.post('/new', inventoryController.createInventory);
router.put('/update/:id', inventoryController.updateInventory);
router.delete('/delete/:id', inventoryController.deleteInventory);

module.exports = router;