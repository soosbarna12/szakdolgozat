import React from "react";
import { StyledItem } from "../../../stlyes/content.style";

interface WeatherCardProps {
  data: any;
}

export function WeatherCard({ data }: WeatherCardProps) {
  return (
    <StyledItem>
      <h1>{data.name}</h1>
      {data.weather && data.weather.length > 0 && (
        <p>
          <strong>Conditions:</strong> {data.weather[0].description}
        </p>
      )}
      {data.main && (
        <>
          <p>
            <strong>Temperature:</strong> {data.main.temp} K
          </p>
          <p>
            <strong>Humidity:</strong> {data.main.humidity}%
          </p>
          <p>
            <strong>Pressure:</strong> {data.main.pressure} hPa
          </p>
        </>
      )}
    </StyledItem>
  );
}
