import React, { useContext } from "react";
import Grid from "@mui/material/Grid2";
import { FilterBar } from "../../components/FilterBar/FilterBar";
import { ForecastContext } from "../../contexts/ForecastContext/ForecastContext";
import { useLSTMForecast } from "../../hooks/useLSTMForecast";
import { Pages } from "../../types/page.type";
import { ContentBox } from "../../stlyes/content.style";
import { ForecastTile } from "../../components/DataGrids/ForecastTileGroup/ForecastTile/ForecastTile";
import { Skeleton } from "@mui/material";

export function ForecastPage() {
  const { location } = useContext(ForecastContext);
  const { data: forecastData, isLoading, error } = useLSTMForecast(location.name);

  function renderSkeletons() {
    return Array.from({ length: 7 }).map((_, index) => (
      <Grid key={index}>
        <Skeleton
          data-testid="forecastTileSkeleton"
          variant="rectangular"
          animation="wave"
          width="100%"
          height="100%"
          sx={{ borderRadius: '10px' }}
        />
      </Grid>
    ));
  }

  function renderError() {
    return <p>Error fetching forecast data.</p>;
  }

  function renderForecastTiles() {
    return forecastData?.map((day: { date: string; temperature: number | null }, index: number) => (
      <Grid key={index}>
        <ForecastTile
          date={day.date}
          temperature={day.temperature != null ? day.temperature.toFixed(2) : "N/A"}
        />
      </Grid>
    ));
  }

  return (
    <>
      <FilterBar type={Pages.Forecast} location={location.name} />
      <ContentBox sx={{ display: "flex", justifyContent: "center" }}>
        <Grid container spacing={2} justifyContent="center" alignItems="center">
          {isLoading && renderSkeletons()}
          {error && renderError()}
          {!isLoading && !error && forecastData && renderForecastTiles()}
          {!isLoading && !error && !forecastData && <p>No forecast data available.</p>}
        </Grid>
      </ContentBox>
    </>
  );
}