import React from "react";
import { Skeleton } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Box } from "@mui/material";
import { StyledDataGrid } from "../../../stlyes/content.style";


export function DataTable({ data }: { data: Array<{ date: string; maxTemp: number; minTemp: number; humidity: number; location: string }> }) {
  
  if (!data || data.length === 0) {
    return (
      <Skeleton
        variant="rectangular"
        animation="wave"
        width="100%"
        height={400}
        sx={{ borderRadius: '10px' }}
      />
    );
  }

  const columns: GridColDef[] = [
    { field: "date", headerName: "Date", flex: 1 },
    { field: "location", headerName: "Location", flex: 1 },
    { field: "maxTemp", headerName: "Max Temp (°C)", flex: 1 },
    { field: "minTemp", headerName: "Min Temp (°C)", flex: 1 },
    { field: "humidity", headerName: "Humidity (%)", flex: 1 },
  ];

  const rows = data.map((item, index) => ({
    id: index,
    date: item.date,
    location: item.location,
    maxTemp: item.maxTemp,
    minTemp: item.minTemp,
    humidity: item.humidity,
  }));


  return (
    <Box sx={{ width: "100%", height: 400 }}>
      <StyledDataGrid
        rows={rows}
        columns={columns}
        hideFooterPagination
        hideFooterSelectedRowCount
      />
    </Box>
  );
}
