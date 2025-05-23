import { ThemeProvider } from "@mui/material";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import React, { useEffect, useState } from "react";
import { BaseComponent } from "./components/BaseComponent";
import { NavBar } from "./components/NavBar/NavBar";
import { LOCAL_STORAGE_TEMPERATURE_SCALE } from "./consts/temperatureScale.const";
import { LOCAL_STORAGE_THEME_NAME } from "./consts/theme.const";
import { HistoricalLocationProvider } from "./contexts/HistoricalContext/HistoricalContext";
import { TodayLocationProvider } from "./contexts/TodayContext/TodayContext";
import { ForecastLocationProvider } from "./contexts/ForecastContext/ForecastContext";
import { darkTheme, lightTheme } from "./stlyes/theme.style";
import { TemperatureScale } from "./types/temperatureScale.type";
import { Theme } from "./types/theme.type";
dayjs.extend(utc);


const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      staleTime: 1000 * 60 * 5,
    },
  },
});

export function App() {
  const [isLightTheme, setIsLightTheme] = useState(() => {
    const storedTheme = localStorage.getItem(LOCAL_STORAGE_THEME_NAME);
    return storedTheme !== Theme.Dark;
  });

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_THEME_NAME, isLightTheme ? Theme.Light : Theme.Dark);
  }, [isLightTheme]);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_TEMPERATURE_SCALE, TemperatureScale.Celsius);
  }, []);


  function handleSetLightTheme(isLightTheme: boolean) {
    setIsLightTheme(isLightTheme);
  }


  return (
    <QueryClientProvider client={queryClient}>
      <HistoricalLocationProvider>
        <TodayLocationProvider>
          <ForecastLocationProvider>
            <ThemeProvider theme={isLightTheme ? lightTheme : darkTheme}>
              <NavBar isLightTheme={isLightTheme} handleSetLightTheme={handleSetLightTheme} />
              <BaseComponent />
            </ThemeProvider >
          </ForecastLocationProvider>
        </TodayLocationProvider>
      </HistoricalLocationProvider>
    </QueryClientProvider>
  );
}
