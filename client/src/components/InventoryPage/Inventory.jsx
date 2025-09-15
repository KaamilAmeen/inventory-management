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
  const [showStaticGrid, setShowStaticGrid] = useState(false);
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
  const [staticTable, setStaticTable] = useState([]);

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
      setTableData(formattedData);
    }).catch((error)=>{
      console.error("Error fetching inventory data:", error);
    },
  )
  }
  console.log(formData)
  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.
      name]: e.target.value });
    console.log(formData)
  };
  const handleInvIdChange = (e) =>{
    setFormData({...formData, i_id: parseInt(e.target.value)})
    console.log(formData)
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
    // axios.post('http://localhost:5000/api/inventory/new', formData)
    //   .then((response) => {
    //     console.log("Item added/updated:", response.data);
    //   } ).catch(3 =>{
    //     console.error("Error adding/updating item: ", error);
    //   })

    inventoryAPI.addInventory(formData).then((response) => {
      console.log("Item added/updated:", response.data);
      fetchData(); // Refresh data after add/update
    }).catch((error) => {
      console.error("Error adding/updating item:", error);
    });
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
  const handleEdit = (iId, pId) => {
    console.log(iId)
    const selectedObj = table.find((item)=>item.invId===iId && item.prodId===pId)
    console.log(selectedObj);
    const formatToFormData = {
      i_id: selectedObj.invId,
      p_id: selectedObj.prodId,
      Owner_name: selectedObj.name,
      Hub_location: selectedObj.location,
      Quantity: selectedObj.quantity,
    }
    setSelectedInvId(iId);
    setSelectedProdId(pId);
    setFormData(formatToFormData)
    setUpdateOpen(true)
    setFormOpen(true);
  };
  
  const onClickUpdateButton = () =>{
    inventoryAPI.updateInventory(selectedInvId, selectedProdId, formData).then((response)=>{
      console.log("Item Updated: ", response.data);
    }).catch((error)=>{
      console.log("Error: ", error)
    })
    setFormOpen(false);
    setFormData({
      i_id: 0,
      p_id: 0,
      Owner_name: "",
      Hub_location: "",
      Quantity: 0,
    })
    fetchData();
  }
  const UpdateButton = () =>{
    return (
      <Button variant="contained" onClick={onClickUpdateButton}>
        Update
      </Button>
    )
  }
  // Delete item
  const handleDelete = (iId, pId) => {
    axios.delete(`http://localhost:5000/api/inventory/delete/${iId}/${pId}`).then((response)=>{
      console.log("Item Deleted: ", response.data);
    }).catch((error)=>{
      console.log("Error: ", error)
    })
    // Refresh data after deletion
    fetchData();
    // console.log("Deleting ID:", selectedInvId);
    // console.log("Deleting Prod ID:", selectedProdId);
    // inventoryAPI.deleteInventory(selectedInvId, selectedProdId).then((response)=>{
    //   console.log("Item Deleted: ", response.data);
    // }).catch((error)=>{
    //   console.log("Error: ", error)
    // })
  };

  const onGetInvById = (iId) =>{
    inventoryAPI.getInventoryById(iId).then((response)=>{
      console.log("Inventory item: ", response.data);
      const formattedData = response.data.map(item => ({
      invId: item.i_id,
      prodId: item.p_id,
      name: item.Owner_name,
      quantity: item.Quantity,
      location: item.Hub_location,
      productName: item.p_name,
      price: item.price,
      sales: item.sales
    }));
    setStaticTable(formattedData);
    setShowStaticGrid(true);

    console.log("Static table: ", staticTable)

    }).catch((error)=>{
      console.log("Error: ", error)
    })
  }

  const onClickBack = () =>{
    setShowStaticGrid(false)
  }
  const StaticGrid = () =>{
    return (
       <TableContainer component={Paper} sx={{ margin: "20px auto", padding: 2 }}>
                    <Table >
                      <TableHead>
                        <TableRow>
                          <TableCell><b>Owner Name</b></TableCell>
                          <TableCell><b>Hub Location</b></TableCell>
                          <TableCell><b>Quantity</b></TableCell>
                          <TableCell><b>Product Name</b></TableCell>
                          <TableCell><b>Price</b></TableCell>
                          <TableCell><b>Sales</b></TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {staticTable.map((item, index) => (
                          <TableRow key={index} >
                            <TableCell>{item.name}</TableCell>
                            <TableCell>{item.quantity}</TableCell>
                            <TableCell>{item.location}</TableCell>
                            <TableCell>{item.productName}</TableCell>
                            <TableCell>{item.price}</TableCell>
                            <TableCell>{item.sales}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                    <Button variant="contained" color="secondary" onClick={onClickBack} sx={{ mt:"30px"}}>
                      Back
                    </Button>
        </TableContainer>
    )
  }

  const DynamicGrid = () =>{
    return (
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
                  <TableRow key={index} >
                    <TableCell>{item.invId}</TableCell>
                    <TableCell>{item.name}</TableCell>
                    <TableCell>{item.quantity}</TableCell>
                    <TableCell>{item.location}</TableCell>
                    <TableCell>
                      <Stack direction="row" spacing={1}>
                        <Button
                          variant="outlined"
                          size="small"
                          onClick={() => onGetInvById(item.invId)}
                        >
                          View
                        </Button>
                        <Button
                          variant="outlined"
                          color="primary"
                          size="small"
                          onClick={() => handleEdit(item.invId, item.prodId)}
                        >
                          Edit
                        </Button>
                        <Button
                          variant="outlined"
                          color="error"
                          size="small"
                          onClick={() => handleDelete(item.invId, item.prodId)}
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
    )
  }
  // selecting the row from the given table

  // const onClickDataId = (e) =>{
  //   const invId = parseInt(e.currentTarget.getAttribute('data-invid'))
  //   const prodId = parseInt(e.currentTarget.getAttribute('data-prodid'))
  //   setSelectedInvId(invId) 
  //   setSelectedProdId(prodId)  
  // }

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
                  {updateOpen ? (<UpdateButton/>) : (<AddButton/>) }
                <Button
                  variant="outlined"
                  color="secondary"
                  onClick={() => {
                    setFormOpen(false);
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

        {showStaticGrid ? <StaticGrid /> : <DynamicGrid />}
          
        </>
      )}
    </div>
  );
}
