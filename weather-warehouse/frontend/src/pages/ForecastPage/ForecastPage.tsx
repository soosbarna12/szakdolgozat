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
    if (!isLoading) return null;
    return [0, 1, 2, 3, 4, 5, 6].map((index) => (
      <Grid key={index}>
        <Skeleton
          data-testid="forecastTileSkeleton"
          variant="rectangular"
          animation="wave"
          width="180px"
          height="150px"
          sx={{ borderRadius: '10px' }}
        />
      </Grid>
    ));
  }

  function renderError() {
    if (!error) return null;
    return <p>Error fetching forecast data.</p>;
  }

  function renderForecastTiles() {
    if (isLoading || error) return null;
    return forecastData?.map((day: { date: string; temperature: number | null }, index: number) => (
      <Grid key={index} sx={{ paddingBottom: "2px" }}>
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
      <ContentBox sx={{ display: "flex", justifyContent: "center", paddingBottom: "2px" }}>
        <Grid container spacing={2} justifyContent="center" alignItems="center">
          {renderSkeletons()}
          {renderError()}
          {renderForecastTiles()}
        </Grid>
      </ContentBox>
    </>
  );
}