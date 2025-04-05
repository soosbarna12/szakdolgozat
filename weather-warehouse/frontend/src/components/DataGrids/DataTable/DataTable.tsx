import React from "react";
import { Skeleton } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Box } from "@mui/material";
import { StyledDataGrid } from "../../../stlyes/content.style";
import { dataTableColumns } from "../../../consts/dataTable.conts";


export function DataTable({ data }: { data: Array<{ date: string; maxTemp: number; minTemp: number; humidity: number; location: string }> }) {
  const rows = data.map((item, index) => ({
    id: index,
    date: item.date,
    location: item.location,
    maxTemp: item.maxTemp,
    minTemp: item.minTemp,
    humidity: item.humidity,
  }));

  function renderContent() {
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
    return (
      <Box sx={{ width: "100%", height: 400 }}>
        <StyledDataGrid
          rows={rows}
          columns={dataTableColumns}
          hideFooterPagination
          hideFooterSelectedRowCount
        />
      </Box>
    )
  }

  return renderContent();
}
