import { Dispatch, ReactNode, SetStateAction } from "react";
import { HistoricalDataTable } from "../types/historicalDataTable.type";

// location name interfere
export interface LocationData {
  name: string;
  lat: number;
  lon: number;
}

// historical page data
export interface HistoricalPageData extends HistoricalDataTable {
  // historicalDataGraph ....
}

export interface LocationContextType {
  location: LocationData;
  historicalPageData: any []; // add historicalData to the context type
  setLocation: Dispatch<SetStateAction<LocationData>>;
  setHistoricalPageData: Dispatch<SetStateAction<HistoricalPageData[]>>; // add setter for historicalData
}

export interface LocationProviderProps {
	children: ReactNode;
}
