import { ForecastData } from "../../../../types/forecastData.type";

export interface ForecastTileProps {
  data: ForecastData;
  isLoading?: boolean;
}