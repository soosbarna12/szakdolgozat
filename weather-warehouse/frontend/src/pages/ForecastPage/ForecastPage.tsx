import React, { useState } from "react";
import Grid from "@mui/material/Grid2";
import Skeleton from "@mui/material/Skeleton";
import { LocationSearch } from "../../components/FilterBar/LocationSearch/LocationSearch";
import { HistoricalLocationData } from "../../contexts/HistoricalContext/HistoricalContext.type";
import { Pages } from "../../types/page.type";
import ForecastTileGroup from "../../components/DataGrids/ForecastTileGroup/ForecastTileGroup";
import { useLSTMForecast } from "../../hooks/useLSTMForecast";

export function ForecastPage() {
  const [location, setLocation] = useState<HistoricalLocationData>({
    name: "",
    lat: 0,
    lon: 0,
  });

  const { data: forecastData, isLoading, error } = useLSTMForecast(location.name);

  function renderShimmerTiles() {
    return (
      <Grid container columns={7} spacing={2} justifyContent="center" alignItems="center">
        {Array.from({ length: 7 }).map((_, index) => (
          <Skeleton
            key={index}
            variant="rectangular"
            animation="wave"
            width="100px"
            height="150px"
            sx={{ borderRadius: "10px", margin: "8px" }}
          />
        ))}
      </Grid>
    );
  }

  function renderForecastTiles() {
    if (!forecastData || forecastData.length === 0) {
      return <p style={{ textAlign: "center" }}>No forecast data available.</p>;
    }

    return (
      <Grid container columns={7} spacing={2} justifyContent="center" alignItems="center">
        {forecastData.map((temperature: number, index: number) => (
          <div
            key={index}
            style={{
              width: "100px",
              height: "150px",
              borderRadius: "10px",
              boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "8px",
              backgroundColor: "#f5f5f5",
            }}
          >
            <p style={{ fontSize: "1.2rem", fontWeight: "bold" }}>{temperature}°C</p>
          </div>
        ))}
      </Grid>
    );
  }

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "center", marginBottom: "20px" }}>
        <LocationSearch
          type={Pages.Forecast}
          location={location}
          setLocation={setLocation}
        />
      </div>
      {isLoading && renderShimmerTiles()}
      {error && <p style={{ textAlign: "center" }}>Error loading forecast data.</p>}
      {!isLoading && !error && renderForecastTiles()}
    </div>
  );
}