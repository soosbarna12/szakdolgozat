import React from "react";
import { Skeleton } from "@mui/material";
import { Box } from "@mui/material";
import { StyledDataGrid } from "../../../stlyes/content.style";
import { HistoricalDataTable } from "../../../types/historicalDataTable.type";
import { GridColDef } from "@mui/x-data-grid";


export function DataTable({ data, columns }: { data: HistoricalDataTable[], columns: GridColDef[] }) {
  function renderContent() {
    if (!data || data.length === 0) {
      return (
        <Skeleton
          variant="rectangular"
          animation="wave"
          width="100%"
          height={367}
          sx={{ borderRadius: '10px' }}
        />
      );
    }
    return (
      <Box sx={{ width: "100%", height: 400 }}>
        <StyledDataGrid
          rows={data}


          getRowId={(row) => row.date + row.cityName + row.countryCode}
          columns={columns}
          hideFooterPagination
          hideFooterSelectedRowCount
        />
      </Box>
    )
  }

  return renderContent();
}
