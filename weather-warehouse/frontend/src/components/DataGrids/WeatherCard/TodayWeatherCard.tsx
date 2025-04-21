import React from "react";
import { Skeleton } from "@mui/material";
import { WiDaySunny, WiCloud, WiRain, WiSnow, WiThunderstorm, WiFog } from "react-icons/wi";
import { Box, Typography, useTheme } from "@mui/material";
import { TodayWeatherCardProps } from "./TodayWeatherCard.type";
import { convertKelvinToCelsius, convertTitleCase } from "../../../utils/dataConverters";


export function TodayWeatherCard({ data }: Readonly<TodayWeatherCardProps>) {

  const theme = useTheme();

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

  function getWeatherIcon(weatherMain: string) {
    switch (weatherMain) {
      case "Clear":
        return <WiDaySunny size={"120px"} />;
      case "Clouds":
        return <WiCloud size={"120px"} />;
      case "Rain":
      case "Drizzle":
        return <WiRain size={"120px"} />;
      case "Snow":
        return <WiSnow size={"120px"} />;
      case "Thunderstorm":
        return <WiThunderstorm size={"120px"} />;
      case "Mist":
      case "Smoke":
      case "Haze":
      case "Dust":
      case "Fog":
      case "Sand":
      case "Ash":
      case "Squall":
      case "Tornado":
        return <WiFog size={"120px"} />;
      default:
        return null;
    }
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
      <Typography variant="h6">{getFormattedTime(data.dt)}</Typography>
      <Typography variant="h5" fontWeight="700">
        {data.name}, {data.sys.country}
      </Typography>
      <Box sx={{ display: "flex", alignItems: "center", m: 0, p: 0 }} color={theme.palette.primary.dark}>
        <Box sx={{ m: 0, p: 0 }}>{getWeatherIcon(data.weather[0].main)}</Box>
        <Typography variant="h2" sx={{ ml: 1, m: 0 }}>
          {convertKelvinToCelsius(data.main.temp)}
          <span style={{ fontSize: "0.5em", verticalAlign: "super" }}> °C</span>
        </Typography>
      </Box>
      {data.weather && data.weather.length > 0 && (
        <Typography variant="h6" fontStyle="italic">
          {convertTitleCase(data.weather[0].description)}
        </Typography>
      )}
      <Box>
        <Typography>Feels Like: {convertKelvinToCelsius(data.main.feels_like)} °C</Typography>
        <Typography>
          Precipitation: {data.rain?.["1h"] || data.rain?.["3h"] || data.snow?.["1h"] || data.snow?.["3h"] || 0} mm/h
        </Typography>
        <Typography>Humidity: {data.main.humidity}%</Typography>
        <Typography>Pressure: {data.main.pressure} hPa</Typography>
        <Typography>Wind: {data.wind.speed} m/s</Typography>
      </Box>
    </Box>
  );
}
