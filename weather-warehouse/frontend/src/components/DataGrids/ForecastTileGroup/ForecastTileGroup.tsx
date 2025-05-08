import Grid from "@mui/material/Grid2";
import React from "react";
import { ForecastTile } from "./ForecastTile/ForecastTile";

export default function ForecastTileGroup({ forecastData }: { forecastData: number[] }) {
  return (
    <Grid container columns={7} spacing={2} justifyContent="center" alignItems="center" data-testid="forecastTileGroup">
      {forecastData.map((temperature, index) => (
        <ForecastTile key={index} dayName={`Day ${index + 1}`} temperature={temperature} />
      ))}
    </Grid>
  );
}