import { AppBar, CssBaseline, Toolbar } from "@mui/material";
import React from "react";
import { ActionsButton } from "./Actions/ActionsButton/ActionsButton";
import { DateFilter } from "./DateFilter/DateFilter";
import { LocationSearch } from "./LocationSearch/LocationSearch";

export function FilterBar() {
  return (
    <>
      <CssBaseline />
      <AppBar
        position="static"
        color="transparent"
        elevation={0}
      >
        <Toolbar sx={{ justifyContent: 'center', padding: 0 }}>
          <LocationSearch />
          <DateFilter />
          <ActionsButton />
        </Toolbar >
      </AppBar>
    </>
  );
}
