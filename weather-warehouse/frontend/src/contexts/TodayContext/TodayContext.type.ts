import { Dispatch, ReactNode, SetStateAction } from "react";

// location name interfere
export interface TodayLocationData {
  name: string;
  country?: string;
  state?: string;
  lat: number;
  lon: number;
}

export interface TodayContextType {
  location: TodayLocationData;
  setLocation: Dispatch<SetStateAction<TodayLocationData>>;
}

export interface TodayProviderProps {
	children: ReactNode;
}
