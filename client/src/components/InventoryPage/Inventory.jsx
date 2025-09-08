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
  const [selectedInvId, setSelectedInvId] = useState(null);
  const [selectedProdId, setSelectedProdId] = useState(null);
  const [updateOpen, setUpdateOpen ] = useState(null);
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

  const handleAddNew = () =>{
    setSelectedInvId(0)
    setSelectedProdId(0)
    setFormOpen(true)
    setUpdateOpen(false)
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

  const AddButton = () =>{
    return (
      <Button variant="contained" onClick={handleSave}>
        Add
      </Button>
    )
  }

  // Edit item
  const handleEdit = () => {
    console.log("Editing ID:", selectedInvId);
    setUpdateOpen(true)
    setFormOpen(true);
  };
  
  const onClickUpdateButton = () =>{
    inventoryAPI.updateInventory(selectedInvId, selectedProdId, formData).then((response)=>{
      console.log("Item Updated: ", response.data);
    }).catch((error)=>{
      console.log("Error: ", error)
    })
  }
  const UpdateButton = () =>{
    return (
      <Button variant="contained" onClick={onClickUpdateButton}>
        Update
      </Button>
    )
  }
  // Delete item
  const handleDelete = () => {
    inventoryAPI.deleteInventory(selectedInvId, selectedProdId).then((response)=>{
      console.log("Item Deleted: ", response.data);
    }).catch((error)=>{
      console.log("Error: ", error)
    })
  };

  const onClickDataId = (e) =>{
    const invId = parseInt(e.currentTarget.getAttribute('data-invid'))
    const prodId = parseInt(e.currentTarget.getAttribute('data-prodid'))
    setSelectedInvId(invId) 
    setSelectedProdId(prodId)  
  }

  const selectedObj = table.find((_,item)=>item.invId===selectedInvId && item.prodId===selectedProdId)
  // console.log(table)
  // console.log(selectedObj)
  console.log("Selected inv ID: ", selectedInvId);
  console.log("Selected prod ID: ", selectedProdId)

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
                value={selectedInvId}
                onChange={handleInvIdChange}
              />
              <TextField
                label="Product ID"
                name="prodId"
                type="number"
                value={selectedProdId}
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
                  {updateOpen ? (<UpdateButton/>) : (<AddButton/>) }
                <Button
                  variant="outlined"
                  color="secondary"
                  onClick={() => {
                    setFormOpen(false);
                    setEditingIndex(null);
                    setFormData({
                      i_id: 0,
                      p_id: 0,
                      Owner_name: "",
                      Hub_location: "",
                      Quantity: 0,
                      });
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
            onClick={handleAddNew}
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
                  <TableRow key={index} data-prodid={item.prodId} data-invid={item.invId} onClick={onClickDataId}>
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
                          onClick={handleEdit}
                        >
                          Edit
                        </Button>
                        <Button
                          variant="outlined"
                          color="error"
                          size="small"
                          onClick={handleDelete}
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
