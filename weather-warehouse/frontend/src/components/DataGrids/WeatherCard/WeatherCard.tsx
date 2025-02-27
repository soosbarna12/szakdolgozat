import React from "react";
import { StyledItem } from "../../../stlyes/content.style";
import { WiDaySunny, WiCloud, WiRain, WiSnow, WiThunderstorm, WiFog } from "react-icons/wi";
import { Box, Container, Typography, useTheme } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { WeatherCardProps } from "./WeatherCard.type";


const toTitleCase = (str: string) => {
  return str
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
};

export function WeatherCard({ data }: Readonly<WeatherCardProps>) {
  const theme = useTheme();

  const getWeatherIcon = (weatherMain: string) => {
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
  };

  const getFormattedTime = (unixTimestamp: number) => {
    const date = new Date(unixTimestamp * 1000);
    return date.toLocaleDateString("default", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric"
    });
  };

  const convertKelvinToCelsius = (kelvin: number) => {
    return Math.floor(kelvin - 273.15);
  };

  function renderHeader() {
    return (
      <>
        <Typography variant="h6">{getFormattedTime(data.dt)}</Typography>
        <Typography variant="h5" fontWeight="700">
          {data.name}, {data.sys.country}
        </Typography>
      </>
    );
  };

  function renderWeatherIconAndTemp() {
    return (
      <Box sx={{ display: "flex", alignItems: "center", m: 0, p: 0 }} color={theme.palette.primary.dark}>
        <Box sx={{ m: 0, p: 0 }}>
          {getWeatherIcon(data.weather[0].main)}
        </Box>
        <Typography variant="h2" sx={{ ml: 1, m: 0 }}>
          {convertKelvinToCelsius(data.main.temp)}
          <span style={{ fontSize: "0.5em", verticalAlign: "super" }}> °C</span>
        </Typography>
      </Box>
    );
  };

  function renderWeatherDescription() {
    if (data.weather && data.weather.length > 0) {
      return (
        <Typography variant="h6" fontStyle="italic">
          {toTitleCase(data.weather[0].description)}
        </Typography>
      );
    }
    return null;
  };

  function renderWeatherDetails() {
    const precipitation = data.rain?.["1h"] || data.rain?.["3h"] || data.snow?.["1h"] || data.snow?.["3h"] || 0;
    return (
      <Box>
        <Typography>
          Feels Like: {convertKelvinToCelsius(data.main.feels_like)} °C
        </Typography>
        <Typography>Precipitation: {precipitation} mm/h</Typography>
        <Typography>Humidity: {data.main.humidity}%</Typography>
        <Typography>Pressure: {data.main.pressure} hPa</Typography>
        <Typography>Wind: {data.wind.speed} m/s</Typography>
      </Box>
    );
  };

  return (
    <StyledItem sx={{ width: "350px", height: "375px" }}>
      <Typography align="left">
        {renderHeader()}
        {renderWeatherIconAndTemp()}
        {renderWeatherDescription()}
        {renderWeatherDetails()}
      </Typography>
    </StyledItem>
  );
}
