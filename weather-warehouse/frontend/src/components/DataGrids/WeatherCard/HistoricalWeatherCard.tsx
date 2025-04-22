import React, { useContext, useEffect } from "react";
import { Skeleton } from "@mui/material";
import { Box, Typography, useTheme } from "@mui/material";
import { convertKelvinToCelsius, convertTitleCase } from "../../../utils/dataConverters";
import { HistoricalWeatherCardProps } from "./HistoricalWeatherCard.type";
import dayjs from "dayjs";
import { temperatureScaleChanger } from "../../../utils/temperatureScaleChanger";
import { TemperatureScale } from "../../../types/temperatureScale.type";
import { LOCAL_STORAGE_TEMPERATURE_SCALE } from "../../../consts/temperatureScale.const";
import { HistoricalContext } from "../../../contexts/HistoricalContext/HistoricalContext";


export function HistoricalWeatherCard({ data }: Readonly<HistoricalWeatherCardProps>) {

  const theme = useTheme();
  const { temperatureScale, setTemperatureScale } = useContext(HistoricalContext);
  const temperatureScaleLabel = (temperatureScale === TemperatureScale.Celsius ? "°C" : "°F");

  if (!data) {
    return (
      <Skeleton
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
      <Typography variant="h6">{getFormattedTime(data.date)}</Typography>
      <Typography variant="h5" fontWeight="700">
        {data.cityName}, {data.countryCode}
      </Typography>
      <Box sx={{ display: "flex", alignItems: "center", m: 0, p: 0 }} color={theme.palette.primary.dark}>

        <Typography variant="h2" sx={{ ml: 1, m: 0 }}>
          {temperatureScaleChanger(TemperatureScale.Celsius, temperatureScale, data.temp)}
          <span style={{ fontSize: "0.5em", verticalAlign: "super" }}>{temperatureScaleLabel}</span>
        </Typography>
      </Box>
      <Box>
        <Typography>
          Precipitation: {data.precipitation || 0} mm/h
        </Typography>
        <Typography>Pressure: {data.pressure} hPa</Typography>
        <Typography>Wind: {data.windSpeed} m/s</Typography>
      </Box>
    </Box>
  );
}
