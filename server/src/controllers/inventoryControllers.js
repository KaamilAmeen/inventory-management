const bcrypt = require('bcrypt');
const { response } = require('express');
const inventoryService = require('../services/inventoryServices');
const authMiddleware = require('../middleware/authMiddleware')

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
    const {i_id} = req.params;
    const data = await inventoryService.getInventoryProducts(i_id);
    const rows = data[0];
    if (!rows || rows.length === 0) {
      return res.status(404).json({ error: 'Inventory item not found.' });
    }
    res.json(rows); // return single item
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch inventory item.' });
  }
};

// 📌 Create new inventory item
const createInventory = async (req, res) => {
  try {
    console.log(req.body);
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
    const {i_id,p_id} = req.params;
    const {Owner_name, Quantity, Hub_location } = req.body;
    if ( !Owner_name || !Quantity || !Hub_location) {
      return res.status(400).json({ error: 'Missing required fields.' });
    }
    const result= await inventoryService.updateInventoryItem(i_id,p_id,Owner_name,Quantity, Hub_location);
    if (!result || (result.affectedRows !== undefined && result.affectedRows === 0)) {
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
    const {i_id,p_id} = req.params;
    const result= await inventoryService.deleteInventoryItem(i_id,p_id);
    if (!result || (result.affectedRows !== undefined && result.affectedRows === 0)) {
      return res.status(404).json({ error: 'Inventory item not found.' });
    }
    res.json({ message: 'Inventory item deleted successfully.' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete inventory item.' });
  }
};

const getProductDetails = async (req, res) =>{
  try {
    const rows = await inventoryService.getProductDetails();
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch product details.' });
  }
}

const addAuthDetails = async (req, res) => {
  try {
    const {username ,email ,password,roleId } = req.body;
    if (!username || !email || !password || !roleId) {
      return res.status(400).json({error: 'Missing Fields'})
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const userId = await inventoryService.addAuthDetails(username, email,hashedPassword, roleId);

    res.status(201).json({message: 'Details added successfully'}); 
  } catch (error) {
    console.error("Error in addAuthDetails:", error.message, error.stack);
    res.status(500).json({error: 'Server Error', details: error.message}); 
  }
}

module.exports = {
  getAllInventory,
  getInventoryById,
  createInventory,
  updateInventory,
  deleteInventory,
  getProductDetails,
  addAuthDetails
};
    