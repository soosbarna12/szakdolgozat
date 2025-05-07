import React, { createContext, useEffect, useState } from "react";
import { ForecastContextType, ForecastLocationData, ForecastProviderProps } from "./ForecastContext.type";

export const ForecastContext = createContext<ForecastContextType>({
  location: { name: "", lat: 0, lon: 0 },
  setLocation: () => {},
});

export const ForecastLocationProvider = ({ children }: ForecastProviderProps) => {
  const [location, setLocation] = useState<ForecastLocationData>(() => {
    const storedLocation = localStorage.getItem("forecastLocation");
    const defaultLocation = { name: "", lat: 0, lon: 0 };
    try {
      return storedLocation ? JSON.parse(storedLocation) : defaultLocation;
    } catch (error) {
      return defaultLocation;
    }
  });

  useEffect(() => {
    // Persist location to localStorage whenever it changes
    localStorage.setItem("forecastLocation", JSON.stringify(location));
  }, [location]);

  return (
    <ForecastContext.Provider value={{ location, setLocation }}>
      {children}
    </ForecastContext.Provider>
  );
};