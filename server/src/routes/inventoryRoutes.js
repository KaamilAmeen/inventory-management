const express = require('express');

const router = express.Router();
const inventoryController = require('../controllers/inventoryControllers');
const authController = require('../controllers/authController');

// Inventory routes
router.get('/list', inventoryController.getAllInventory);
router.get('/list/:i_id', inventoryController.getInventoryById);
router.post('/new', inventoryController.createInventory);
router.put('/update/:i_id/:p_id', inventoryController.updateInventory);
router.delete('/delete/:i_id/:p_id', inventoryController.deleteInventory);

router.post('/auth', inventoryController.addAuthDetails);
router.post('/login',authController.login);

module.exports = router;