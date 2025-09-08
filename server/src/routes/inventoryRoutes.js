const express = require("express");
const router = express.Router();
const pool = require("../config/db");

// GET all inventory items
router.get("/", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM inventory");
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: "Database error" });
  }
});

// GET item by ID
router.get("/:id", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM inventory WHERE i_id = ?", [req.params.id]);
    if (rows.length === 0) return res.status(404).json({ error: "Item not found" });
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: "Database error" });
  }
});

// ADD item
router.post("/", async (req, res) => {
  const { i_id, Owner_name, Quantity, Hub_location } = req.body;
  try {
    const [result] = await pool.query(
      "INSERT INTO inventory (i_id, Owner_name, Quantity, Hub_location) VALUES (?, ?, ?, ?)",
      [i_id, Owner_name, Quantity, Hub_location]
    );
    res.json({ id: result.insertId, i_id, Owner_name, Quantity, Hub_location });
  } catch (err) {
    res.status(500).json({ error: "Database error" });
  }
});

// UPDATE item
router.put("/:id", async (req, res) => {
  const { Owner_name, Quantity, Hub_location } = req.body;
  try {
    await pool.query(
      "UPDATE inventory SET Owner_name = ?, Quantity = ?, Hub_location = ? WHERE i_id = ?",
      [Owner_name, Quantity, Hub_location, req.params.id]
    );
    res.json({ message: "Item updated" });
  } catch (err) {
    res.status(500).json({ error: "Database error" });
  }
});

// DELETE item
router.delete("/:id", async (req, res) => {
  try {
    await pool.query("DELETE FROM inventory WHERE i_id = ?", [req.params.id]);
    res.json({ message: "Item deleted" });
  } catch (err) {
    res.status(500).json({ error: "Database error" });
  }
});

module.exports = router;
