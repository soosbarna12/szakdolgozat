import { Box, Skeleton, Typography, useTheme } from "@mui/material";
import React, { useContext } from "react";
import { HistoricalContext } from "../../../contexts/HistoricalContext/HistoricalContext";
import { TemperatureScale } from "../../../types/temperatureScale.type";
import { convertTitleCase } from "../../../utils/dataConverters";
import { temperatureScaleChanger } from "../../../utils/temperatureScaleChanger";
import { getWeatherIcon } from "../../../utils/weatherUtils";
import { TodayWeatherCardProps } from "./TodayWeatherCard.type";


export function TodayWeatherCard({ data }: Readonly<TodayWeatherCardProps>) {

  const theme = useTheme();
  const { temperatureScale } = useContext(HistoricalContext);
  const temperatureScaleLabel = (temperatureScale === TemperatureScale.Celsius ? "°C" : "°F");

  if (!data) {
    return (
      <Skeleton
        data-testid="todayWeatherCardSkeleton"
        variant="rectangular"
        animation="wave"
        width="100%"
        height="100%"
        sx={{ borderRadius: '10px' }}
      />
    );
  }

  function getFormattedTime(unixTimestamp: number) {
    const date = new Date(unixTimestamp * 1000);
    return date.toLocaleDateString("default", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric"
    });
  };

  return (
    <Box sx={{ textAlign: "left" }}>
      <Typography data-testid="date" variant="h6">{getFormattedTime(data.dt)}</Typography>
      <Typography data-testid="location" variant="h5" fontWeight="700">
        {data.name}, {data.sys.country}
      </Typography>
      <Box sx={{ display: "flex", alignItems: "center", m: 0, p: 0 }} color={theme.palette.primary.dark}>
        <Box data-testid="weatherIcon" sx={{ m: 0, p: 0 }}>{getWeatherIcon(data.weather?.[0].main)}</Box>
        <Typography data-testid="temperature" variant="h2" sx={{ ml: 1, m: 0 }}>
          {temperatureScaleChanger(TemperatureScale.Kelvin, temperatureScale as TemperatureScale, data?.main?.temp)}
          <span style={{ fontSize: "0.5em", verticalAlign: "super" }}> {temperatureScaleLabel}</span>
        </Typography>
      </Box>
      {data.weather && data.weather.length > 0 && (
        <Typography data-testid="desciption" variant="h6" fontStyle="italic">
          {convertTitleCase(data.weather[0].description)}
        </Typography>
      )}
      <Box>
        <Typography data-testid="feelsLike">Feels Like: {temperatureScaleChanger(TemperatureScale.Kelvin, temperatureScale as TemperatureScale, data.main?.feels_like)} {temperatureScaleLabel}</Typography>
        <Typography data-testid="precipitation">
          Precipitation: {data.rain?.["1h"] || data.rain?.["3h"] || data.snow?.["1h"] || data.snow?.["3h"] || 0} mm/h
        </Typography>
        <Typography data-testid="humidity">Humidity: {data.main?.humidity}%</Typography>
        <Typography data-testid="pressure">Pressure: {data.main?.pressure} hPa</Typography>
        <Typography data-testid="windSpeed">Wind: {data.wind?.speed} m/s</Typography>
      </Box>
    </Box>
  );
}
