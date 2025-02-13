import { AppBar, CssBaseline, Toolbar } from "@mui/material";
import React from "react";
import { Pages } from "../../types/pages";
import { ActionsButton } from "./Actions/ActionsButton/ActionsButton";
import { DateFilter } from "./DateFilter/DateFilter";
import { FilterBarProps } from "./FitlerBar.type";
import { LocationSearch } from "./LocationSearch/LocationSearch";

export function FilterBar(props: Readonly<FilterBarProps>) {
  const { type } = props;

  return (
    <>
      <CssBaseline />
      <AppBar position="static" color="transparent" elevation={0}>
        <Toolbar sx={{ justifyContent: 'center', padding: 0, marginBottom: 1 }}>
          {type === Pages.Historical && (
            <>
              <LocationSearch type={Pages.Historical} />
              <DateFilter />
              <ActionsButton />
            </>
          )}
          {(type === Pages.Today || type === Pages.Forecast) && (
            <LocationSearch type={type} />
          )}
        </Toolbar>
      </AppBar>
    </>
  );
}
