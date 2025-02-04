import { ThemeProvider } from "@mui/material";
import React from "react";
import { NavBar } from "./components/NavBar/NavBar";
import { darkTheme, lightTheme } from "./theme.style";


export function HomePage() {
  const [theme, setTheme] = React.useState(true);

  function handleSetTheme(newTheme: boolean
  ) {
    setTheme(newTheme);
  }

  return (
    <ThemeProvider theme={theme ? lightTheme : darkTheme}>
      <NavBar handleSetTheme={handleSetTheme} />
    </ThemeProvider>
  );
}
