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
import { darkTheme, lightTheme } from "./stlyes/theme.style";
import { TemperatureScale } from "./types/temperatureScale.type";
import { Theme } from "./types/theme.type";
dayjs.extend(utc);


const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1, // Retry failed requests once
      staleTime: 1000 * 60 * 5, // Data is fresh for 5 minutes
      queryFn: async ({ queryKey }) => {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 120000); // 2-minute timeout

        try {
          const response = await fetch(queryKey[0] as string, { signal: controller.signal });
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        } finally {
          clearTimeout(timeoutId);
        }
      },
    },
  },
});

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
