import React, { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Stack,
} from "@mui/material";

export default function Inventory({ items, setItems, onViewItem }) {
  const [formOpen, setFormOpen] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    quantity: "",
    location: "",
  });

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Save data (add or update)
  const handleSave = () => {
    if (!formData.name || !formData.quantity || !formData.location) return;

    if (editingIndex !== null) {
      const updated = [...items];
      updated[editingIndex] = formData;
      setItems(updated);
      setEditingIndex(null);
    } else {
      setItems([...items, formData]);
    }

    setFormData({ name: "", quantity: "", location: "" });
    setFormOpen(false);
  };

  // Edit item
  const handleEdit = (index) => {
    setFormData(items[index]);
    setEditingIndex(index);
    setFormOpen(true);
  };

  // Delete item
  const handleDelete = (index) => {
    setItems(items.filter((_, i) => i !== index));
  };

  return (
    <div style={{ padding: "20px" }}>
      <Typography variant="h4" gutterBottom>
        Inventory Management
      </Typography>

      {formOpen ? (
        <Card sx={{ maxWidth: 500, margin: "20px auto", padding: 2 }}>
          <CardContent>
            <Stack spacing={2}>
              <TextField
                label="Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
              <TextField
                label="Quantity"
                name="quantity"
                type="number"
                value={formData.quantity}
                onChange={handleChange}
                required
              />
              <TextField
                label="Location"
                name="location"
                value={formData.location}
                onChange={handleChange}
                required
              />

              <Stack direction="row" spacing={2}>
                <Button variant="contained" onClick={handleSave}>
                  {editingIndex !== null ? "Update" : "Add"}
                </Button>
                <Button
                  variant="outlined"
                  color="secondary"
                  onClick={() => {
                    setFormOpen(false);
                    setEditingIndex(null);
                    setFormData({ name: "", quantity: "", location: "" });
                  }}
                >
                  Cancel
                </Button>
              </Stack>
            </Stack>
          </CardContent>
        </Card>
      ) : (
        <>
          <Button
            variant="contained"
            sx={{ marginBottom: 2 }}
            onClick={() => setFormOpen(true)}
          >
            Add New
          </Button>

          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell><b>Name</b></TableCell>
                  <TableCell><b>Quantity</b></TableCell>
                  <TableCell><b>Location</b></TableCell>
                  <TableCell><b>Actions</b></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {items.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell>{item.name}</TableCell>
                    <TableCell>{item.quantity}</TableCell>
                    <TableCell>{item.location}</TableCell>
                    <TableCell>
                      <Stack direction="row" spacing={1}>
                        <Button
                          variant="outlined"
                          size="small"
                          onClick={() => onViewItem(item)}
                        >
                          View
                        </Button>
                        <Button
                          variant="outlined"
                          color="primary"
                          size="small"
                          onClick={() => handleEdit(index)}
                        >
                          Edit
                        </Button>
                        <Button
                          variant="outlined"
                          color="error"
                          size="small"
                          onClick={() => handleDelete(index)}
                        >
                          Delete
                        </Button>
                      </Stack>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </>
      )}
    </div>
  );
}
