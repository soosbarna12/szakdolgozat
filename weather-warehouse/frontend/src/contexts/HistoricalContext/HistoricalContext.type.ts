import { Dispatch, ReactNode, SetStateAction } from "react";
import { HistoricalDataTable } from "../../types/historicalDataTable.type";
import { TemperatureScale } from "../../types/temperatureScale.type";

export interface HistoricalLocationData {
  name: string;
  country?: string;
  lat: number;
  lon: number;
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface HistoricalPageData extends HistoricalDataTable {}

export interface HistoricalContextType {
  location: HistoricalLocationData;
  historicalPageData: any [];
  temperatureScale: TemperatureScale | string;
  setLocation: Dispatch<SetStateAction<HistoricalLocationData>>;
  setHistoricalPageData: Dispatch<SetStateAction<HistoricalPageData[]>>;
  setTemperatureScale: Dispatch<SetStateAction<TemperatureScale | string>>;
}

export interface HistoricalProviderProps {
  children: ReactNode;
}
