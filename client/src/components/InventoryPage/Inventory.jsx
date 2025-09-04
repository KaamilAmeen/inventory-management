import React, { useState, useEffect } from "react";
import inventoryAPI from "../../api/api";
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
    invId:1,
    prodId: 121,
    name: "Ravi",
    location: "Delhi Hub",
    quantity: 1200,
  });
  const [table, setTableData] = useState([]);
  useEffect(()=>{
    fetchData()
  }, [])
  const fetchData = async () =>{
    await inventoryAPI.getInventory().then((response)=>{
      const formattedData = response.data.map(item => ({
        id: item.i_id,
        name: item.Owner_name,
        quantity: item.Quantity,
        location: item.Hub_location
      }));
      setTableData(formattedData);
    }).catch((error)=>{
      console.error("Error fetching inventory data:", error);
    },
  )
  }
  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  // Save data (add or update)
  const handleSave = async () => {
    console.log("Form Data to be saved:", formData);
    await inventoryAPI.addInventory(formData).then((response) => {
      console.log("Item added/updated:", response.data);
      fetchData(); // Refresh data after add/update
    }).catch((error) => {
      console.error("Error adding/updating item:", error);
    });

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
                label="Inventory ID"
                name="id"
                type="number"
                value={formData.invId}

              />
              <TextField
                label="Product ID"
                name="prodId"
                type="number"
                value={formData.prodId}
              />
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
                  <TableCell><b>Inventory ID</b></TableCell>
                  <TableCell><b>Name</b></TableCell>
                  <TableCell><b>Quantity</b></TableCell>
                  <TableCell><b>Location</b></TableCell>
                  <TableCell><b>Actions</b></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {table.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell>{item.id}</TableCell>
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
