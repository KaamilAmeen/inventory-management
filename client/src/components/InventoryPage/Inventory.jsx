import React, { useState, useEffect } from "react";
import inventoryAPI from "../../api/api";
import {
  Typography,
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
import Form from "./Form"; // ✅ using Form component

export default function Inventory({ onViewItem }) {
  const [formOpen, setFormOpen] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);
  const [table, setTableData] = useState([]);

  // ✅ fetch data from backend
  const fetchData = async () => {
    try {
      const response = await inventoryAPI.getItems();
      const formattedData = response.data.map((item) => ({
        id: item.i_id,
        name: item.Owner_name,
        quantity: item.Quantity,
        location: item.Hub_location,
      }));
      setTableData(formattedData);
    } catch (error) {
      console.error("Error fetching inventory data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // ✅ edit item
  const handleEdit = (index) => {
    setEditingIndex(index);
    setFormOpen(true);
  };

  // ✅ delete item
  const handleDelete = async (index) => {
    const id = table[index].id;
    try {
      await inventoryAPI.deleteItem(id);
      fetchData();
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <Typography variant="h4" gutterBottom>
        Inventory Management
      </Typography>

      {formOpen ? (
        <Form
          editingItem={editingIndex !== null ? table[editingIndex] : null}
          onAdd={() => {
            fetchData();
            setFormOpen(false);
            setEditingIndex(null);
          }}
        />
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
