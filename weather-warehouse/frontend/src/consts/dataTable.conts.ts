import { GridColDef } from "@mui/x-data-grid";

export const dataTableColumns: GridColDef[] = [
  { field: "date", headerName: "Date", flex: 1 },
  { field: "location", headerName: "Location", flex: 1 },
  { field: "maxTemp", headerName: "Max Temp (°C)", flex: 1 },
  { field: "minTemp", headerName: "Min Temp (°C)", flex: 1 },
  { field: "humidity", headerName: "Humidity (%)", flex: 1 },
];