import { GridColDef } from "@mui/x-data-grid";

export const dataTableColumns: GridColDef[] = [
  { field: "date", headerName: "Date", flex: 1 },
  { field: "cityName", headerName: "City Name", flex: 1 },
  { field: "countryCode", headerName: "Country", flex: 1 },
  { field: "maxTemp", headerName: "Max Temp", flex: 1 },
  { field: "minTemp", headerName: "Min Temp", flex: 1 },
  { field: "humidity", headerName: "Humidity (%)", flex: 1 },
];