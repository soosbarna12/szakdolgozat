import { ThemeProvider } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { NavBar } from "./components/NavBar/NavBar";
import { TodayPage } from "./pages/TodayPage/TodayPage";
import { routes } from "./routes";
import { darkTheme, lightTheme } from "./theme.style";

export function App() {
  const [isLightTheme, setIsLightTheme] = useState(() => {
    const storedTheme = localStorage.getItem("theme");
    return storedTheme !== "dark"; // default to light if no value is stored
  });

  function handleSetLightTheme(isLightTheme: boolean) {
    setIsLightTheme(isLightTheme);
  }

  // save theme to local storage to not default the theme after redirecting to base url
  useEffect(() => {
    localStorage.setItem("theme", isLightTheme ? "light" : "dark");
  }, [isLightTheme]);

  return (
    <ThemeProvider theme={isLightTheme ? lightTheme : darkTheme}>
      <NavBar isLightTheme={isLightTheme} handleSetLightTheme={handleSetLightTheme} />
      <Routes>
        <Route path="/">
          <Route index element={<TodayPage />} />
          {routes.map(({ id, path, element }) => (
            <Route key={id} path={path} element={element} />
          ))}
          <Route path="*" element={<TodayPage />} />
        </Route>
      </Routes>
    </ThemeProvider >
  );
}
