import React from "react";
import { Skeleton } from "@mui/material";
import { Box } from "@mui/material";
import { StyledDataGrid } from "../../../stlyes/content.style";
import { dataTableColumns } from "../../../consts/dataTable.conts";
import { HistoricalDataTable } from "../../../types/historicalDataTable.type";


export function DataTable({ data }: { data: HistoricalDataTable[] }) {
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
          columns={dataTableColumns}
          hideFooterPagination
          hideFooterSelectedRowCount
        />
      </Box>
    )
  }

  return renderContent();
}
