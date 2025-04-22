import { GridColDef } from "@mui/x-data-grid";

export const tempHistoricalDataTableColumns: GridColDef[] = [
  { field: "date", headerName: "Date", flex: 1 },
  { field: "cityName", headerName: "City Name", flex: 1 },
  { field: "countryCode", headerName: "Country", flex: 1 },
  { field: "maxTemp", headerName: "Max Temp (°C)", flex: 1 },
  { field: "minTemp", headerName: "Min Temp (°C)", flex: 1 },
];

export const allHistoricalDataTableColumns: GridColDef[] = [
  { field: "date", headerName: "Date", flex: 1 },
  { field: "cityName", headerName: "City Name", flex: 1 },
  { field: "countryCode", headerName: "Country", flex: 1 },
  { field: "maxTemp", headerName: "Max Temp (°C)", flex: 1 },
  { field: "minTemp", headerName: "Min Temp (°C)", flex: 1 },
  { field: "windSpeed", headerName: "Wind Speed (km/h)", flex: 1 },
  { field: "precipitation", headerName: "Precipitation (mm/s)", flex: 1 },
  { field: "pressure", headerName: "Pressure (hPa)", flex: 1 },
];