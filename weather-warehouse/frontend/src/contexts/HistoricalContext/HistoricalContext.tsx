import React, { createContext, useEffect, useState } from "react";
import { LOCAL_STORAGE_TEMPERATURE_SCALE } from "../../consts/temperatureScale.const";
import { TemperatureScale } from "../../types/temperatureScale.type";
import { HistoricalContextType, HistoricalLocationData, HistoricalPageData, HistoricalProviderProps } from "./HistoricalContext.type";


export const HistoricalContext = createContext<HistoricalContextType>({
  location: { name: "", lat: 0, lon: 0 },
  setLocation: () => { },
  historicalPageData: [] as any,
  setHistoricalPageData: () => { },
  temperatureScale: TemperatureScale.Celsius,
  setTemperatureScale: () => { },
});

export const HistoricalLocationProvider = ({ children }: HistoricalProviderProps) => {

  const [location, setLocation] = useState<HistoricalLocationData>(() => {
    const storedLocation = localStorage.getItem("historicalLocation");
    const defaultLocation = { name: "", lat: 0, lon: 0 };
    try {
      return storedLocation ? JSON.parse(storedLocation) : defaultLocation;
    } catch (error) {
      console.error("Failed to parse location from localStorage:", error);
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

  const [temperatureScale, setTemperatureScale] = useState<TemperatureScale | string>(() => {
    const storedTemperatureScale = localStorage.getItem(LOCAL_STORAGE_TEMPERATURE_SCALE);
    try {
      return storedTemperatureScale ? JSON.parse(storedTemperatureScale) : TemperatureScale.Celsius;
    } catch (error) {
      console.error("Failed to parse temperature scale from localStorage:", error);
      return TemperatureScale.Celsius;
    }
  });


  useEffect(() => {
    if (historicalPageData) {
      localStorage.setItem("historicalPageData", JSON.stringify(historicalPageData));
    }
  }, [historicalPageData]);

  useEffect(() => {
    localStorage.setItem("historicalLocation", JSON.stringify(location));
  }, [location]);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_TEMPERATURE_SCALE, JSON.stringify(temperatureScale));
  }, [temperatureScale]);


  return (
    <HistoricalContext.Provider value={{ location, setLocation, historicalPageData, setHistoricalPageData, temperatureScale, setTemperatureScale }}>
      {children}
    </HistoricalContext.Provider>
  );
};
