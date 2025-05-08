import React, { useContext } from "react";
import { Box, Typography, useTheme } from "@mui/material";
import { StyledItem } from "../../../../stlyes/content.style";
import { HistoricalContext } from "../../../../contexts/HistoricalContext/HistoricalContext";
import { TemperatureScale } from "../../../../types/temperatureScale.type";
import { temperatureScaleChanger } from "../../../../utils/temperatureScaleChanger";
import { ForecastTileProps } from "./ForecastTile.type";
import dayjs from "dayjs";

export function ForecastTile({ dayName, date, temperature }: Readonly<ForecastTileProps>) {
  const theme = useTheme();
  const { temperatureScale } = useContext(HistoricalContext);
  const temperatureScaleLabel = temperatureScale === TemperatureScale.Celsius ? "°C" : "°F";

  function getFormattedTime(date: string) {
    const dayName = dayjs(date).format("dddd");
    const formattedDate = dayjs(date).format("MMMM D");
    return { dayName, formattedDate };
  };

  return (
    <StyledItem
      data-testid="forecastTile"
      sx={{
        height: "150px",
        width: "180px",
        textAlign: "left",
        padding: theme.spacing(2),
        backgroundColor: theme.palette.background.paper,
        borderRadius: "10px"
      }}
    >
      <Typography data-testid="dayName" variant="h6">
        {getFormattedTime(date).dayName}
      </Typography>
      <Typography data-testid="date" variant="subtitle1">
        {getFormattedTime(date).formattedDate}
      </Typography>
      <Box sx={{ display: "flex", alignItems: "center", mt: 1 }} color={theme.palette.primary.dark}>
        <Typography data-testid="temperature" variant="h2" sx={{ fontSize: "30px", ml: 1, m: 0 }}>
          {temperatureScaleChanger(TemperatureScale.Celsius, temperatureScale as TemperatureScale, temperature)}
          <span style={{ fontSize: "0.5em", verticalAlign: "super" }}>{temperatureScaleLabel}</span>
        </Typography>
      </Box>
    </StyledItem>
  );
}