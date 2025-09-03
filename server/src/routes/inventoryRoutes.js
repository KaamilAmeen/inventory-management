const express = require('express');

const router = express.Router();

// Example inventory controller (replace with your actual controller logic)
const inventoryController = {
    getAll: (req, res) => {
        // Fetch all inventory items (dummy data for example)
        res.json([{ id: 1, name: 'Item A', quantity: 10 }]);
    },
    getById: (req, res) => {
        // Fetch inventory item by ID (dummy data for example)
        res.json({ id: req.params.id, name: 'Item A', quantity: 10 });
    },
    create: (req, res) => {
        // Create new inventory item
        res.status(201).json(req.body);
    },
    update: (req, res) => {
        // Update inventory item
        res.json({ ...req.body, id: req.params.id });
    },
    delete: (req, res) => {
        // Delete inventory item
        res.status(204).send();
    }
};

// Inventory routes
router.get('/list', inventoryController.getAll);
router.get('/list/:id', inventoryController.getById);
router.post('/new/:id', inventoryController.create);
router.put('/update/:id', inventoryController.update);
router.delete('/delete/:id', inventoryController.delete);

module.exports = router;