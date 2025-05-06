import { Box, Skeleton } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import React from "react";
import { StyledDataGrid } from "../../../stlyes/content.style";
import { HistoricalDataTable } from "../../../types/historicalDataTable.type";
import { getRowId } from "../../../utils/getRowId";


export function DataTable({ data, columns }: { data: HistoricalDataTable[], columns: GridColDef[] }) {
  function renderContent() {
    if (!data || data.length === 0) {
      return (
        <Skeleton
          variant="rectangular"
          animation="wave"
          width="100%"
          height={367}
          data-testid="dataTableSkeleton"
          sx={{ borderRadius: '10px' }}
        />
      );
    }
    return (
      <Box sx={{ width: "100%", height: 400 }} data-testid="dataTableContainer">
        <StyledDataGrid
          rows={data}
          getRowId={getRowId}
          columns={columns}
          hideFooterPagination
          hideFooterSelectedRowCount
          data-testid="dataTable"
        />
      </Box>
    )
  }

  return renderContent();
}
