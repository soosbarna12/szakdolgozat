import React, { createContext, useState, ReactNode, Dispatch, SetStateAction, useEffect } from "react";
import { HistoricalContextType, HistoricalLocationData, HistoricalPageData, HistoricalProviderProps } from "./HistoricalContext.type";


export const HistoricalContext = createContext<HistoricalContextType>({
  location: { name: "", lat: 0, lon: 0 },
  setLocation: () => { },
  historicalPageData: [] as any, // initialize historicalData as an empty array
  setHistoricalPageData: () => { },
});

export const HistoricalLocationProvider = ({ children }: HistoricalProviderProps) => {

  const [location, setLocation] = useState<HistoricalLocationData>(() => {
    const storedLocation = localStorage.getItem("historicalLocation");
    const defaultLocation = { name: "", lat: 0, lon: 0 };
    try {
      return storedLocation ? JSON.parse(storedLocation) : defaultLocation;
    } catch (error) {
      return defaultLocation;
    }
  });

  const [historicalPageData, setHistoricalPageData] = useState<HistoricalPageData[]>(() => {
    const storedData = localStorage.getItem("historicalPageData");
    try {
      return storedData ? JSON.parse(storedData) : [];
    } catch (error) {
      console.error("Failed to parse historical data from localStorage:", error);
      return [];
    }
  });

  //  historicalPageData to localStorage whenever it changes
  useEffect(() => {
    if (historicalPageData) {
      localStorage.setItem("historicalPageData", JSON.stringify(historicalPageData));
    }
  }, [historicalPageData]);


  useEffect(() => {
    // Persist location to localStorage whenever it changes
    localStorage.setItem("historicalLocation", JSON.stringify(location));
  }, [location]);


  return (
    <HistoricalContext.Provider value={{ location, setLocation, historicalPageData, setHistoricalPageData }}>
      {children}
    </HistoricalContext.Provider>
  );
};
