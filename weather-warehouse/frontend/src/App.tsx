import { ThemeProvider } from "@mui/material";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { NavBar } from "./components/NavBar/NavBar";
import { LOCAL_STORAGE_THEME_NAME } from "./consts/theme.const";
import { darkTheme, lightTheme } from "./stlyes/theme.style";
import { Theme } from "./types/theme.type";
import utc from "dayjs/plugin/utc";
import dayjs from "dayjs";
import { BaseComponent } from "./components/BaseComponent";
import { HistoricalLocationProvider } from "./contexts/HistoricalContext/HistoricalContext";
import { TodayLocationProvider } from "./contexts/TodayContext/TodayContext";
import { LOCAL_STORAGE_TEMPERATURE_SCALE } from "./consts/temperatureScale.const";
import { TemperatureScale } from "./types/temperatureScale.type";
dayjs.extend(utc);


const queryClient = new QueryClient();


export function App() {
  const [isLightTheme, setIsLightTheme] = useState(() => {
    const storedTheme = localStorage.getItem(LOCAL_STORAGE_THEME_NAME);
    return storedTheme !== Theme.Dark; // default to light if no value is stored
  });

  // save theme to local storage to not default the theme after redirecting to base url
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
          <ThemeProvider theme={isLightTheme ? lightTheme : darkTheme}>
            <NavBar isLightTheme={isLightTheme} handleSetLightTheme={handleSetLightTheme} />
            <BaseComponent />
          </ThemeProvider >
        </TodayLocationProvider>
      </HistoricalLocationProvider>
    </QueryClientProvider>
  );
}
