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
import axios from "axios";

export default function Inventory({ items, setItems, onViewItem }) {
  const [formOpen, setFormOpen] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);
  const [selectedId, setSelectedId] = useState(null);
  const [formData, setFormData] = useState({
    i_id: 0,
    p_id: 0,
    Owner_name: "",
    Hub_location: "",
    Quantity: 0,
  });
  const [table, setTableData] = useState([]);
  useEffect(()=>{
    fetchData()
  }, [])
  const fetchData = async () =>{
    await inventoryAPI.getInventory().then((response)=>{
      const formattedData = response.data.map(item => ({
        invId: item.i_id,
        prodId: item.p_id,
        name: item.Owner_name,
        quantity: item.Quantity,
        location: item.Hub_location
      }));
      console.log(formattedData);
      setTableData(formattedData);
    }).catch((error)=>{
      console.error("Error fetching inventory data:", error);
    },
  )
  }
  console.log(formData)
  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    console.log(formData)
  };
  const handleInvIdChange = (e) =>{
    setFormData({...formData, i_id: parseInt(e.target.value)})
  }
  const handleProdIdChange = (e) =>{
    setFormData({...formData, p_id: parseInt(e.target.value)})
  }
  const handleNameChange = (e) =>{
    setFormData({...formData, Owner_name: e.target.value})
  }
  const handleQuantityChange = (e) =>{
    setFormData({...formData, Quantity: parseInt(e.target.value)})
  }
  const handleLocationChange = (e) =>{
    setFormData({...formData, Hub_location: e.target.value})
  }
  // Save data (add or update)
  const handleSave = (e) => {
    e.preventDefault();
    axios.post('http://localhost:5000/api/inventory/new', formData)
      .then((response) => {
        console.log("Item added/updated:", response.data);
      } ).catch(error =>{
        console.error("Error adding/updating item: ", error);
      })
    // inventoryAPI.addInventory(formData).then((response) => {
    //   console.log("Item added/updated:", response.data);
    //   fetchData(); // Refresh data after add/update
    // }).catch((error) => {
    //   console.error("Error adding/updating item:", error);
    // });

    setFormOpen(false);
  };

  // Edit item
  const handleEdit = (index) => {
    const id = table.prodId;
    setSelectedId(id)
    console.log("Editing ID:", selectedId);
    setFormOpen(true);
  };

  // Delete item
  const handleDelete = (index) => {
    setItems(items.filter((_, i) => i !== index));
  };

  const onClickDataId = (e) =>{
    const id = e.currentTarget.getAttribute('data-id')
    setSelectedId(id) 
  }
  console.log("Selected ID:", selectedId);

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
                value={formData.i_id}
                onChange={handleInvIdChange}
              />
              <TextField
                label="Product ID"
                name="prodId"
                type="number"
                value={formData.p_id}
                onChange={handleProdIdChange}
              />
              <TextField
                label="Name"
                name="name"
                value={formData.Owner_name}
                onChange={handleNameChange}
                required
              />
              <TextField
                label="Quantity"
                name="quantity"
                type="number"
                value={formData.Quantity}
                onChange={handleQuantityChange}
                required
              />
              <TextField
                label="Location"
                name="location"
                value={formData.Hub_location}
                onChange={handleLocationChange}
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
                  <TableRow key={index} data-id={item.id} onClick={onClickDataId}>
                    <TableCell>{item.invId}</TableCell>
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
