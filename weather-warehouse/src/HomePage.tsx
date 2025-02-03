import { createTheme, ThemeProvider } from "@mui/material";
import React from "react";
import { NavBar } from "./components/NavBar/NavBar";

const colorTheme = createTheme({
  palette: {
    primary: {
      main: "#4caf50"
    }
  }

});

export function HomePage() {
  return (
    <ThemeProvider theme={colorTheme}>
      <NavBar />
    </ThemeProvider>
  );
}
