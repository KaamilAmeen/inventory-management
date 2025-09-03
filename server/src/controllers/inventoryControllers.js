const getAllInventory = async (req, res) => {
    try {
        const items = await Inventory.find();
        res.json(items);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch inventory items.' });
    }
};

const getInventoryById = async (req, res) => {
    try {
        const item = await Inventory.findById(req.params.id);
        if (!item) {
            return res.status(404).json({ error: 'Inventory item not found.' });
        }
        res.json(item);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch inventory item.' });
    }
};

const createInventory = async (req, res) => {
    try {
        const newItem = new Inventory(req.body);
        await newItem.save();
        res.status(201).json(newItem);
    } catch (err) {
        res.status(400).json({ error: 'Failed to create inventory item.' });
    }
};

const updateInventory = async (req, res) => {
    try {
        const updatedItem = await Inventory.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        if (!updatedItem) {
            return res.status(404).json({ error: 'Inventory item not found.' });
        }
        res.json(updatedItem);
    } catch (err) {
        res.status(400).json({ error: 'Failed to update inventory item.' });
    }
};

const deleteInventory = async (req, res) => {
    try {
        const deletedItem = await Inventory.findByIdAndDelete(req.params.id);
        if (!deletedItem) {
            return res.status(404).json({ error: 'Inventory item not found.' });
        }
        res.json({ message: 'Inventory item deleted successfully.' });
    } catch (err) {
        res.status(500).json({ error: 'Failed to delete inventory item.' });
    }
};

module.exports = {
    getAllInventory,
    getInventoryById,
    createInventory,
    updateInventory,
    deleteInventory
};