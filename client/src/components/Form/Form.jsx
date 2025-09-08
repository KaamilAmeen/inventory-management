import React, { useState, useEffect, use } from "react";
import { TextField, Button, Box } from "@mui/material";
import inventoryAPI from "../../api/api";
import "./Form.css";

export default function Form({ onAdd, editingItem }) {
  const [invId, setInvId] = useState(0);
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [location, setLocation] = useState("");
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!id ||!name || !quantity || !location) return;

    inventoryAPI.addInventory(form).then((response) => {
      console.log("Item added:", response.data);
    }).catch((error) => {
      console.error("Error adding item:", error);
    });
      setId(0);
      setName("");
      setQuantity("");
      setLocation("");
    }

  return (
    <Box component="form" onSubmit={handleSubmit} className="form">
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
      <Button type="submit" variant="contained" color="primary">
        {editingItem ? "Update" : "Add"}
      </Button>
    </Box>
  );
}
