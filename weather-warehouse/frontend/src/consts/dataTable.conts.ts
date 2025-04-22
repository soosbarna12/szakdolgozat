import { GridColDef } from "@mui/x-data-grid";
import { TemperatureScale } from "../types/temperatureScale.type";
import { temperatureScaleChanger } from "../utils/temperatureScaleChanger";


export function getAllHistoricalDataTableColumns(tempScale: TemperatureScale): GridColDef[] {
  const temperatureScaleLabel = (tempScale === TemperatureScale.Celsius ? "°C" : "°F");

  return [
  { field: "date", headerName: "Date", flex: 1 },
  { field: "cityName", headerName: "City Name", flex: 1 },
  { field: "countryCode", headerName: "Country", flex: 1 },
  { field: "maxTemp", headerName: `Max Temp ${temperatureScaleLabel}`, flex: 1, valueFormatter: (value) => temperatureScaleChanger(TemperatureScale.Celsius, tempScale, value) },
  { field: "minTemp", headerName: `Min Temp ${temperatureScaleLabel}`, flex: 1, valueFormatter: (value) => temperatureScaleChanger(TemperatureScale.Celsius, tempScale, value) },
  { field: "windSpeed", headerName: "Wind Speed (km/h)", flex: 1 },
  { field: "precipitation", headerName: "Precipitation (mm/s)", flex: 1 },
  { field: "pressure", headerName: "Pressure (hPa)", flex: 1 },
]};