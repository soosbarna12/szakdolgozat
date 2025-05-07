import React, { useContext, useEffect } from "react";
import { FilterBar } from "../../components/FilterBar/FilterBar";
import { ForecastContext } from "../../contexts/ForecastContext/ForecastContext";
import { useLSTMForecast } from "../../hooks/useLSTMForecast";
import { useHistoricalDataQuery } from "../../hooks/useHistoricalDataQuery";
import { Pages } from "../../types/page.type";
import { ContentBox } from "../../stlyes/content.style";
import dayjs from "dayjs";

export function ForecastPage() {
  const { location, setLocation } = useContext(ForecastContext);

  // Fetch historical data for the selected location and today's date
  const todayDate = dayjs().format("YYYY-MM-DD");
  const { data: historicalData, error: historicalError, isLoading: isHistoricalLoading } = useHistoricalDataQuery({
    location,
    date: todayDate,
  });

  const { data: forecastData, error: forecastError, isLoading: isForecastLoading } = useLSTMForecast(
    location.name,
    todayDate
  );

  useEffect(() => {
      setLocation(location);
  }, [location]);

  return (
    <>
      <FilterBar type={Pages.Forecast} location={location.name} />
      <ContentBox sx={{ display: "flex", justifyContent: "center" }}>
        {isForecastLoading ? (
            <p>Loading forecast...</p>
          ) : forecastError ? (
            <p>Error fetching forecast data.</p>
          ) : forecastData ? (
            <div>
              <h3>Forecast Data:</h3>
              <ul>
                {forecastData.map((value: number, index: number) => (
                  <li key={index}>Day {index + 1}: {value}°C</li>
                ))}
              </ul>
            </div>
          ) : (
            <p>No forecast data available.</p>
          )}
      </ContentBox>
    </>
  );
};