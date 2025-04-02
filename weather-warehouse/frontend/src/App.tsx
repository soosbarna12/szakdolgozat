import { ThemeProvider } from "@mui/material";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { NavBar } from "./components/NavBar/NavBar";
import { ROUTES } from "./consts/routes";
import { LOCAL_STORAGE_THEME_NAME } from "./consts/theme.const";
import { TodayPage } from "./pages/TodayPage/TodayPage";
import { darkTheme, lightTheme } from "./stlyes/theme.style";
import { Theme } from "./types/theme.type";


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

  function handleSetLightTheme(isLightTheme: boolean) {
    setIsLightTheme(isLightTheme);
  }

  function renderRouteElements() {
    return ROUTES.map(({ id, path, element }) => (
      <Route key={id} path={path} element={element} />
    ));
  }

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={isLightTheme ? lightTheme : darkTheme}>
        <NavBar isLightTheme={isLightTheme} handleSetLightTheme={handleSetLightTheme} />
        <Routes>
          <Route path="/">
            <Route index element={<TodayPage />} />
            {renderRouteElements()}
            <Route path="*" element={<TodayPage />} />
          </Route>
        </Routes>
      </ThemeProvider >
    </QueryClientProvider>
  );
}
