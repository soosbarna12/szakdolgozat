import React from "react";
import { Skeleton } from "@mui/material";
import { Box } from "@mui/material";
import { StyledDataGrid } from "../../../stlyes/content.style";
import { dataTableColumns } from "../../../consts/dataTable.conts";
import { HistoricalDataTable } from "../../../types/historicalDataTable.type";


// historicaldata type vagy historicaldatatable type
export function DataTable({ data }: { data: HistoricalDataTable[] }) {
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
