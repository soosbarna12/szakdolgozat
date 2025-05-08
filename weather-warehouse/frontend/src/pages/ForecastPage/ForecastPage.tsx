import React, { useContext } from "react";
import { FilterBar } from "../../components/FilterBar/FilterBar";
import { ForecastContext } from "../../contexts/ForecastContext/ForecastContext";
import { useLSTMForecast } from "../../hooks/useLSTMForecast";
import { Pages } from "../../types/page.type";
import { ContentBox } from "../../stlyes/content.style";

export function ForecastPage() {
  const { location } = useContext(ForecastContext);
  const { data: forecastData, isLoading, error } = useLSTMForecast(location.name);

  return (
    <>
      <FilterBar type={Pages.Forecast} location={location.name} />
      <ContentBox sx={{ display: "flex", justifyContent: "center" }}>
        {isLoading ? (
          <p>Loading forecast...</p>
        ) : error ? (
          <p>Error fetching forecast data.</p>
        ) : forecastData ? (
          <div>
            <h3>7-Day Forecast:</h3>
            <ul>
              {forecastData.map((day: { date: string; temperature: number | null }, index: number) => (
                <li key={index}>
                  {day.date}: {day.temperature != null ? day.temperature.toFixed(2) : "N/A"}°C
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <p>No forecast data available.</p>
        )}
      </ContentBox>
    </>
  );
}