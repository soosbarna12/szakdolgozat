import React, { useContext } from "react";
import { Box, Skeleton, Typography, useTheme } from "@mui/material";
import { StyledItem } from "../../../../stlyes/content.style";
import { HistoricalContext } from "../../../../contexts/HistoricalContext/HistoricalContext";
import { TemperatureScale } from "../../../../types/temperatureScale.type";
import { temperatureScaleChanger } from "../../../../utils/temperatureScaleChanger";
import { ForecastTileProps } from "./ForecastTile.type";
import { useLSTMForecast } from "../../../../hooks/useLSTMForecast";

export function ForecastTile({ dayName, date, temperature }: Readonly<ForecastTileProps>) {
  const theme = useTheme();
  const { temperatureScale } = useContext(HistoricalContext);
  const { isLoading } = useLSTMForecast(dayName); // Use the hook to get isLoading
  const temperatureScaleLabel = temperatureScale === TemperatureScale.Celsius ? "°C" : "°F";

  return (
    <StyledItem
      data-testid="forecastTile"
      sx={{
        height: "150px",
        width: "230px",
        textAlign: "left",
        padding: theme.spacing(2),
        backgroundColor: theme.palette.background.paper,
        borderRadius: "10px",
      }}
    >
      <Typography data-testid="date" variant="h6">
        {date}
      </Typography>
      <Box sx={{ display: "flex", alignItems: "center", mt: 1 }} color={theme.palette.primary.dark}>
        <Typography data-testid="temperature" variant="h2" sx={{ ml: 1, m: 0 }}>
          {temperatureScaleChanger(TemperatureScale.Celsius, temperatureScale as TemperatureScale, temperature)}
          <span style={{ fontSize: "0.5em", verticalAlign: "super" }}>{temperatureScaleLabel}</span>
        </Typography>
      </Box>
    </StyledItem>
  );
}