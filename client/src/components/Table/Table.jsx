import {useState, useEffect} from "react";
import inventoryAPI from "../../api/api";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Button,
} from "@mui/material";
import "./Table.css";

export default function TableList({ items, onEdit, onDelete }) {
  const [form, setForm] = useState([]);
  useEffect(()=>{
    inventoryAPI.getInventory().then((response)=>{
      const formattedData = response.data.map(item => ({
        id: item.i_id,
        name: item.Owner_name,
        quantity: item.Quantity,
        location: item.Hub_location
      }));
      setForm(formattedData);
    }).catch((error)=>{
      console.error("Error fetching inventory data:", error);
    },
  )
  })
  console.log(form);
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Inventory ID</TableCell>
          <TableCell>Name</TableCell>
          <TableCell>Quantity</TableCell>
          <TableCell>Hub Location</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {form.map((item, index) => (
          <TableRow key={index}>
            <TableCell>{item.name}</TableCell>
            <TableCell>{item.quantity}</TableCell>
            <TableCell>{item.location}</TableCell>
            <TableCell>
              <Button
                variant="outlined"
                color="secondary"
                onClick={() => onEdit(index)}
              >
                Edit
              </Button>
              <Button
                variant="outlined"
                color="error"
                onClick={() => onDelete(index)}
                style={{ marginLeft: "10px" }}
              >
                Delete
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
