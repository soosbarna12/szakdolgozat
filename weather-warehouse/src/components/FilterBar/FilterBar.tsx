import { AppBar, CssBaseline, Toolbar } from "@mui/material";
import React from "react";
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
        <Toolbar sx={{ justifyContent: 'center', padding: 0 }}>
          {type === "historical" && (
            <>
              <LocationSearch type="historical" />
              <DateFilter />
              <ActionsButton />
            </>
          )}
          {(type === "today" || type === "forecast") && (
            <LocationSearch type={type} />
          )}
        </Toolbar>
      </AppBar>
    </>
  );
}
