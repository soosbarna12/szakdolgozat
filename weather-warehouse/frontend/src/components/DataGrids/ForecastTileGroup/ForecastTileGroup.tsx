import Grid from "@mui/material/Grid2";
import React from "react";
import { DAYS } from "../../../consts/days";
import ForecastTile from "./ForecastTile/ForecastTile";

export default function ForecastTileGroup() {

  function renderForecastTiles() {
    return DAYS.map((day) => (
      <ForecastTile key={day.id} dayName={day.text} data-testid="forecastTile" />
    ))
  };


  return (
    <Grid container columns={7} spacing={2} justifyContent="center" alignItems="center" data-testid="forecastTileGroup" >
      {renderForecastTiles()}
    </Grid >
  );
}