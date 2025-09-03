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
router.get('/', inventoryController.getAll);
router.get('/:id', inventoryController.getById);
router.post('/', inventoryController.create);
router.put('/:id', inventoryController.update);
router.delete('/:id', inventoryController.delete);

module.exports = router;