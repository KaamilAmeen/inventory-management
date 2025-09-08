import React, { useState, useEffect } from "react";
import { TextField, Button, Box, Stack } from "@mui/material";
import inventoryAPI from "../../api/api";
import "./Form.css";

export default function Form({ onAdd, editingItem }) {
  const [id, setId] = useState(0);
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [location, setLocation] = useState("");

  // ✅ If editing, load existing values
  useEffect(() => {
    if (editingItem) {
      setId(editingItem.id || 0);
      setName(editingItem.name || "");
      setQuantity(editingItem.quantity || "");
      setLocation(editingItem.location || "");
    }
  }, [editingItem]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !quantity || !location) return;

    const formData = {
      i_id: id,
      Owner_name: name,
      Quantity: quantity,
      Hub_location: location,
    };

    try {
      if (editingItem) {
        // ✅ Update API
        await inventoryAPI.updateItem(id, formData);
        console.log("Item updated:", formData);
      } else {
        // ✅ Add API
        await inventoryAPI.addItem(formData);
        console.log("Item added:", formData);
      }

      // Refresh table
      onAdd();

      // Clear form
      setId(0);
      setName("");
      setQuantity("");
      setLocation("");
    } catch (error) {
      console.error("Error saving item:", error);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} className="form">
      <Stack spacing={2}>
        <TextField
          label="ID"
          type="number"
          value={id}
          onChange={(e) => setId(e.target.value)}
          required
        />
        <TextField
          label="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <TextField
          label="Quantity"
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          required
        />
        <TextField
          label="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          required
        />
        <Stack direction="row" spacing={2}>
          <Button type="submit" variant="contained" color="primary">
            {editingItem ? "Update" : "Add"}
          </Button>
          <Button
            type="button"
            variant="outlined"
            color="secondary"
            onClick={() => onAdd()} // closes form without saving
          >
            Cancel
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
}