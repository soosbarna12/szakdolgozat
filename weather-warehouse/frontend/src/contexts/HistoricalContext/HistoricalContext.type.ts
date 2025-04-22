import { Dispatch, ReactNode, SetStateAction } from "react";
import { HistoricalDataTable } from "../../types/historicalDataTable.type";
import { TemperatureScale } from "../../types/temperatureScale.type";

// location name interfere
export interface HistoricalLocationData {
  name: string;
  country?: string;
  lat: number;
  lon: number;
}

// historical page data
export interface HistoricalPageData extends HistoricalDataTable {
  // historicalDataGraph ....
}

export interface HistoricalContextType {
  location: HistoricalLocationData;
  historicalPageData: any []; // add historicalData to the context type
  temperatureScale: TemperatureScale;
  setLocation: Dispatch<SetStateAction<HistoricalLocationData>>;
  setHistoricalPageData: Dispatch<SetStateAction<HistoricalPageData[]>>; // add setter for historicalData
  setTemperatureScale: Dispatch<SetStateAction<TemperatureScale>>;
}

export interface HistoricalProviderProps {
  children: ReactNode;
}
