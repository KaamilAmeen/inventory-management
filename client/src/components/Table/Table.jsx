import React from "react";
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
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Name</TableCell>
          <TableCell>Quantity</TableCell>
          <TableCell>Location</TableCell>
          <TableCell>Actions</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {items.map((item, index) => (
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
