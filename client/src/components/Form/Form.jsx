import React, { useState, useEffect } from "react";
import { TextField, Button, Box } from "@mui/material";
import "./Form.css";

export default function Form({ onAdd, editingItem }) {
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [location, setLocation] = useState("");

  useEffect(() => {
    if (editingItem) {
      setName(editingItem.name);
      setQuantity(editingItem.quantity);
      setLocation(editingItem.location);
    }
  }, [editingItem]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !quantity || !location) return;

    const newItem = { name, quantity, location };

    onAdd(newItem);

    setName("");
    setQuantity("");
    setLocation("");
  };

  return (
    <Box component="form" onSubmit={handleSubmit} className="form">
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
      <Button type="submit" variant="contained" color="primary">
        {editingItem ? "Update" : "Add"}
      </Button>
    </Box>
  );
}
