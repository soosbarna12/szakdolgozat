import { AppBar, CssBaseline, Toolbar } from "@mui/material";
import React from "react";
import { HistoricalContext } from "../../contexts/HistoricalContext/HistoricalContext";
import { TodayContext } from "../../contexts/TodayContext/TodayContext";
import { Pages } from "../../types/page.type";
import { ActionsButton } from "./Actions/ActionsButton/ActionsButton";
import { DateFilter } from "./DateFilter/DateFilter";
import { FilterBarProps } from "./FitlerBar.type";
import { LocationSearch } from "./LocationSearch/LocationSearch";


export function FilterBar(props: Readonly<FilterBarProps>) {
  const { type, onDateChange, onExportLocation, onSaveLocation, onResetLocation } = props;
  const { location: historicalLocation, setLocation: historicalSetLocation } = React.useContext(HistoricalContext);
  const { location: todayLocation, setLocation: todaySetLocation } = React.useContext(TodayContext);

  function renderFilterBar() {
    if (type === Pages.Historical) {
      return (
        <>
          <LocationSearch type={Pages.Historical} location={historicalLocation} setLocation={historicalSetLocation} />
          <DateFilter onDateChange={onDateChange} />
          <ActionsButton onSaveLocation={onSaveLocation} onExportLocation={onExportLocation} onResetLocation={onResetLocation} />
        </>
      );
    }

    return (
      <LocationSearch type={type} location={todayLocation} setLocation={todaySetLocation} />
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
