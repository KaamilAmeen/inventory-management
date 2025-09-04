const inventoryService = require('../services/inventoryServices');

// 📌 Get all inventory items
const getAllInventory = async (req, res) => {
  try {
    const rows = await inventoryService.getAllInventoryItems();
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch inventory items.' });
  }
};

// 📌 Get single inventory item by ID
const getInventoryById = async (req, res) => {
  try { 
    const data = await inventoryService.getInventoryProducts(req.params.id);
    const { rows } = data;
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Inventory item not found.' });
    }
    res.json(rows[0]); // return single item
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch inventory item.' });
  }
};

// 📌 Create new inventory item
const createInventory = async (req, res) => {
  try {
    const { i_id, p_id, Owner_name, Hub_location, Quantity } = req.body;
    if (!i_id || !p_id || !Owner_name || !Hub_location || !Quantity) {
      return res.status(400).json({ error: 'Missing required fields.' });
    }
    await inventoryService.addInventoryItems(i_id, p_id, Owner_name, Hub_location, Quantity);
    res.status(201).json({ message: 'Inventory item created successfully.' }); 
  } catch (err) {
    res.status(400).json({ error: 'Failed to create inventory item.' });
  }
};


// 📌 Update inventory item
const updateInventory = async (req, res) => {
  try {
    const id = req.params.id;
    const { name, quantity, location } = req.body;
    if (!name || !quantity || !location) {
      return res.status(400).json({ error: 'Missing required fields.' });
    }
    const result= await inventoryService.updateInventoryItem(id, name, quantity, location);
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Inventory item not found.' });
    }
    res.json({ message: 'Inventory item updated successfully.' });
  } catch (err) {
    res.status(400).json({ error: 'Failed to update inventory item.' });
  }
};


// 📌 Delete inventory item
const deleteInventory = async (req, res) => {
  try {
    const id = req.params.id;
    const result= await inventoryService.deleteInventoryItem(id);
    if (result.affectedRows === 0) {
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
    