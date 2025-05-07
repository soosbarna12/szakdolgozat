import { Dispatch, ReactNode, SetStateAction } from "react";

export interface ForecastLocationData {
  name: string;
  country?: string;
  lat: number;
  lon: number;
}

export interface ForecastContextType {
  location: ForecastLocationData;
  setLocation: Dispatch<SetStateAction<ForecastLocationData>>;
}

export interface ForecastProviderProps {
  children: ReactNode;
}