import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Card, CardContent, Typography, Button } from "@mui/material";

export default function StaticGrid({ item, onBack }) {
  if (!item) return null; // avoid blank render if nothing selected

  const rows = [
    {
      id: 1,
      name: item.name,
      quantity: item.quantity,
      location: item.location,
    },
  ];

  const columns = [
    { field: "name", headerName: "Name", width: 200 },
    { field: "quantity", headerName: "Quantity", width: 150 },
    { field: "location", headerName: "Location", width: 200 },
  ];

  return (
    <Card sx={{ maxWidth: 600, margin: "20px auto", padding: 2 }}>
      <CardContent>
        <Typography variant="h5" gutterBottom>
          Item Details
        </Typography>
        <div style={{ height: 200, width: "100%", marginBottom: "16px" }}>
          <DataGrid
            rows={rows}
            columns={columns}
            hideFooter
            disableSelectionOnClick
          />
        </div>
        <Button variant="contained" color="secondary" onClick={onBack}>
          Back
        </Button>
      </CardContent>
    </Card>
  );
}
