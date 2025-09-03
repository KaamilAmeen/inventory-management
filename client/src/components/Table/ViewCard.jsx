import React from "react";
import { Card, CardContent, Typography, Button } from "@mui/material";
import "./Table.css";

const ViewCard = ({ item, onBack }) => {
  return (
    <Card className="view-card">
      <CardContent>
        <Typography variant="h5" gutterBottom>
          Item Details
        </Typography>
        <Typography><strong>Name:</strong> {item.name}</Typography>
        <Typography><strong>Quantity:</strong> {item.quantity}</Typography>
        <Typography><strong>Location:</strong> {item.location}</Typography>
        <div style={{ marginTop: "16px" }}>
          <Button variant="contained" color="secondary" onClick={onBack}>
            Back
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ViewCard;
