const pool = require('../config/db'); // database connection (MySQL pool)

// 📌 Get all inventory items
const getAllInventory = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM inventory ORDER BY id DESC');
    res.json(rows); // return all rows
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch inventory items.' });
  }
};

// 📌 Get single inventory item by ID
const getInventoryById = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM inventory WHERE id = ?', [req.params.id]);
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
    const { name, quantity, location } = req.body;
    const [result] = await pool.query(
      'INSERT INTO inventory (name, quantity, location) VALUES (?, ?, ?)',
      [name, quantity, location]
    );
    res.status(201).json({ id: result.insertId, name, quantity, location });
  } catch (err) {
    res.status(400).json({ error: 'Failed to create inventory item.' });
  }
};

// 📌 Update inventory item
const updateInventory = async (req, res) => {
  try {
    const { name, quantity, location } = req.body;
    const [result] = await pool.query(
      'UPDATE inventory SET name=?, quantity=?, location=? WHERE id=?',
      [name, quantity, location, req.params.id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Inventory item not found.' });
    }
    res.json({ id: req.params.id, name, quantity, location });
  } catch (err) {
    res.status(400).json({ error: 'Failed to update inventory item.' });
  }
};


// 📌 Delete inventory item
const deleteInventory = async (req, res) => {
  try {
    const [result] = await pool.query('DELETE FROM inventory WHERE id=?', [req.params.id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Inventory item not found.' });
    }
    res.json({ message: 'Inventory item deleted successfully.' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete inventory item.' });
  }
};
// used for gateway to your MySQL database.
const pool = require('../config/db'); // database connection (MySQL pool)

module.exports = {
  getAllInventory,
  getInventoryById,
  createInventory,
  updateInventory,
  deleteInventory
};
    