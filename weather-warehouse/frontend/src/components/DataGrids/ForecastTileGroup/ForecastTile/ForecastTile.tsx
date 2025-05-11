import React, { useContext } from "react";
import { Box, Skeleton, Typography, useTheme } from "@mui/material";
import { StyledItem } from "../../../../stlyes/content.style";
import { HistoricalContext } from "../../../../contexts/HistoricalContext/HistoricalContext";
import { TemperatureScale } from "../../../../types/temperatureScale.type";
import { temperatureScaleChanger } from "../../../../utils/temperatureScaleChanger";
import { ForecastTileProps } from "./ForecastTile.type";
import dayjs from "dayjs";

export function ForecastTile({ data, isLoading }: Readonly<ForecastTileProps>) {
  const { date, temperature, precipitation, pressure } = data;
  const theme = useTheme();
  const { temperatureScale } = useContext(HistoricalContext);
  const temperatureScaleLabel = (temperatureScale === TemperatureScale.Celsius ? "°C" : "°F");

  function renderSkeletons() {
    if (!isLoading) return null;

    return (
      <StyledItem
        data-testid="forecastTileSkeleton"
        sx={{
          textAlign: "left",
          padding: theme.spacing(2),
          backgroundColor: theme.palette.background.paper,
          borderRadius: "10px",
          width: "250px",
          height: "210px",
          display: "flex",
          flexDirection: "column",
          gap: theme.spacing(1),
        }}
      >
        <Skeleton variant="rectangular" animation="wave" width="100%" height="100%" sx={{ borderRadius: "10px" }} />
      </StyledItem>
    );
  }

  function renderContent() {
    if (isLoading) return null;

    return (
      <StyledItem
        data-testid="forecastTile"
        sx={{
          textAlign: "left",
          padding: theme.spacing(2),
          backgroundColor: theme.palette.background.paper,
          borderRadius: "10px",
          width: "250px",
          height: "210px",
          display: "flex",
          flexDirection: "column",
          gap: theme.spacing(1),
        }}
      >
        <Typography data-testid="dayName" variant="h6" fontWeight="700">
          {getFormattedTime(date).dayName}
        </Typography>
        <Typography data-testid="date" variant="subtitle1">
          {getFormattedTime(date).formattedDate}
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center", mt: 1 }} color={theme.palette.primary.dark}>
          <Typography data-testid="temperature" variant="h2" sx={{ fontSize: "30px", ml: 1, m: 0 }}>
            {temperatureScaleChanger(
              TemperatureScale.Celsius,
              temperatureScale as TemperatureScale,
              Number(temperature != null ? temperature.toFixed(2) : "N/A")
            )}
            <span style={{ fontSize: "0.5em", verticalAlign: "super" }}>{temperatureScaleLabel}</span>
          </Typography>
        </Box>
        <Box>
          <Typography data-testid="precipitation">Precipitation: {precipitation?.toFixed(2) ?? 0} mm/h</Typography>
          <Typography data-testid="pressure">Pressure: {pressure?.toFixed(2) ?? 0} hPa</Typography>
        </Box>
      </StyledItem>
    );
  }

  function getFormattedTime(date: string) {
    const dayName = dayjs(date).format("dddd");
    const formattedDate = dayjs(date).format("MMMM D");
    return { dayName, formattedDate };
  };

  return (
    <>
      {renderSkeletons()}
      {renderContent()}
    </>
  );
}