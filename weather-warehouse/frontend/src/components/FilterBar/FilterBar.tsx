import { AppBar, CssBaseline, Toolbar } from "@mui/material";
import React from "react";
import { Pages } from "../../types/page.type";
import { ActionsButton } from "./Actions/ActionsButton/ActionsButton";
import { DateFilter } from "./DateFilter/DateFilter";
import { FilterBarProps } from "./FitlerBar.type";
import { LocationSearch } from "./LocationSearch/LocationSearch";

export function FilterBar(props: Readonly<FilterBarProps>) {
  const { type, location, onDateChange, onSaveLocation } = props;

  function renderFilterBar() {
    if (type === Pages.Historical) {
      return (
        <>
          <LocationSearch type={Pages.Historical} location={location} />
          <DateFilter onDateChange={onDateChange} />
          <ActionsButton onSaveLocation={onSaveLocation} />
        </>
      );
    }

    return (
      <LocationSearch type={type} location={location} />
    );
  }

  return (
    <>
      <CssBaseline />
      <AppBar position="static" color="transparent" elevation={0}>
        <Toolbar sx={{ justifyContent: 'center', padding: 0, marginBottom: 1 }}>
          {renderFilterBar()}
        </Toolbar>
      </AppBar>
    </>
  );
}
