import { Box, Skeleton, Typography, useTheme } from "@mui/material";
import dayjs from "dayjs";
import React, { useContext } from "react";
import { HistoricalContext } from "../../../contexts/HistoricalContext/HistoricalContext";
import { TemperatureScale } from "../../../types/temperatureScale.type";
import { temperatureScaleChanger } from "../../../utils/temperatureScaleChanger";
import { HistoricalWeatherCardProps } from "./HistoricalWeatherCard.type";


export function HistoricalWeatherCard({ data }: Readonly<HistoricalWeatherCardProps>) {

  const theme = useTheme();
  const { temperatureScale } = useContext(HistoricalContext);
  const temperatureScaleLabel = (temperatureScale === TemperatureScale.Celsius ? "°C" : "°F");

  if (!data) {
    return (
      <Skeleton
        data-testid="historicalWeatherCardSkeleton"
        variant="rectangular"
        animation="wave"
        width="100%"
        height="100%"
        sx={{ borderRadius: '10px' }}
      />
    );
  }

  function getFormattedTime(date: string) {
    return dayjs(date).format("dddd, MMMM D, YYYY");
  };

  return (
    <Box sx={{ textAlign: "left" }}>
      <Typography data-testid="date" variant="h6">{getFormattedTime(data.date)}</Typography>
      <Typography data-testid="location" variant="h5" fontWeight="700">
        {data.cityName}, {data.countryCode}
      </Typography>
      <Box sx={{ display: "flex", alignItems: "center", m: 0, p: 0 }} color={theme.palette.primary.dark}>

        <Typography data-testid="temperature" variant="h2" sx={{ ml: 1, m: 0 }}>
          {temperatureScaleChanger(TemperatureScale.Celsius, temperatureScale as TemperatureScale, data.temp)}
          <span style={{ fontSize: "0.5em", verticalAlign: "super" }}>{temperatureScaleLabel}</span>
        </Typography>
      </Box>
      <Box>
        <Typography data-testid="precipitation">
          Precipitation: {data.precipitation || 0} mm/h
        </Typography>
        <Typography data-testid="pressure">Pressure: {data.pressure} hPa</Typography>
        <Typography data-testid="windSpeed">Wind: {data.windSpeed} m/s</Typography>
      </Box>
    </Box>
  );
}
