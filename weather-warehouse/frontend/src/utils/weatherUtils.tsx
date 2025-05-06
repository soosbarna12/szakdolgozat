import React from "react";
import { WiCloud, WiDaySunny, WiFog, WiRain, WiSnow, WiThunderstorm } from "react-icons/wi";

export function getWeatherIcon(weatherMain: string) {
  switch (weatherMain) {
    case "Clear":
      return <WiDaySunny size={"120px"} data-testid="wiDaySunny" />;
    case "Clouds":
      return <WiCloud size={"120px"} data-testid="wiCloud" />;
    case "Rain":
    case "Drizzle":
      return <WiRain size={"120px"} data-testid="wiRain" />;
    case "Snow":
      return <WiSnow size={"120px"} data-testid="wiSnow" />;
    case "Thunderstorm":
      return <WiThunderstorm size={"120px"} data-testid="wiThunderstorm" />;
    case "Mist":
    case "Smoke":
    case "Haze":
    case "Dust":
    case "Fog":
    case "Sand":
    case "Ash":
    case "Squall":
    case "Tornado":
      return <WiFog size={"120px"} data-testid="wiFog" />;
    default:
      return null;
  }
}