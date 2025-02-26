import React from "react";
import { StyledItem } from "../../../stlyes/content.style";
import { WiDaySunny, WiCloud, WiRain, WiSnow, WiThunderstorm, WiFog } from "react-icons/wi";
import { Box, Container, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";

interface WeatherCardProps {
  data: any;
}

const toTitleCase = (str: string) => {
  return str
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
};

export function WeatherCard({ data }: WeatherCardProps) {

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
    return date.toLocaleDateString("default", { weekday: "long", year: "numeric", month: "long", day: "numeric" });
  };

  const convertKelvinToCelsius = (kelvin: number) => {
    return Math.floor(kelvin - 273.15);
  };

  return (
    <StyledItem sx={{ width: "350px", height: "350px" }}>
      <Typography align="left">

        {data.dt && (
          <Typography variant="h6">{getFormattedTime(data.dt)}</Typography>
        )}
        <Typography variant="h5">{data.name}</Typography>

        <Box sx={{ display: "flex", alignItems: "center", m: 0, p: 0 }}>
          <Box sx={{ m: 0, p: 0 }}>
            {getWeatherIcon(data.weather[0].main)}
          </Box>
          {data.main && (
            <Typography variant="h2" sx={{ ml: 1, m: 0 }}>
              {convertKelvinToCelsius(data.main.temp)}
              <span style={{ fontSize: "0.5em", verticalAlign: "super" }}> °C</span>
            </Typography>
          )}
        </Box>

        {data.weather && data.weather.length > 0 && (
          <Typography>{toTitleCase(data.weather[0].description)}</Typography>
        )}

        {data.main && (
          <>
            <Typography>Feels Like: {convertKelvinToCelsius(data.main.feels_like)} °C</Typography>
            <Typography>Humidity: {data.main.humidity}%</Typography>
            <Typography>Pressure: {data.main.pressure} hPa</Typography>
          </>
        )}

      </Typography>
    </StyledItem>
  );
}
