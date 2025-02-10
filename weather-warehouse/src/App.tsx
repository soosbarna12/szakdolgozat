import { ThemeProvider } from "@mui/material";
import React from "react";
import { Route, Routes } from "react-router-dom";
import { NavBar } from "./components/NavBar/NavBar";
import { TodayPage } from "./pages/TodayPage/TodayPage";
import { routes } from "./routes";
import { darkTheme, lightTheme } from "./theme.style";

export function App() {
  const [theme, setTheme] = React.useState(true);

  function handleSetTheme(newTheme: boolean
  ) {
    setTheme(newTheme);
  }

  return (
    <ThemeProvider theme={theme ? lightTheme : darkTheme}>
      <NavBar handleSetTheme={handleSetTheme} />
      <Routes>
        <Route path="/" element={<TodayPage />}>
          {routes.map(({ id, path, element }) =>
            <Route key={id} path={path} element={element} />
          )}
          <Route path="*" element={<TodayPage />} />
        </Route>
      </Routes>
    </ThemeProvider>
  );
}
