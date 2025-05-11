import React, { useContext } from "react";
import Grid from "@mui/material/Grid2";
import { FilterBar } from "../../components/FilterBar/FilterBar";
import { ForecastContext } from "../../contexts/ForecastContext/ForecastContext";
import { useLSTMForecast } from "../../hooks/useLSTMForecast";
import { Pages } from "../../types/page.type";
import { ContentBox, StyledItem } from "../../stlyes/content.style";
import { ForecastTile } from "../../components/DataGrids/ForecastTileGroup/ForecastTile/ForecastTile";
import { ForecastData } from "../../types/forecastData.type";

export function ForecastPage() {
  const { location } = useContext(ForecastContext);
  const { data: forecastData, isLoading, error } = useLSTMForecast(location);

  function renderError() {
    if (!error) return null;
    return (
      <StyledItem>
        <p>Error fetching forecast data.</p>
      </StyledItem>
    );
  }

  function renderForecastTiles() {
    if (error) return null;

    return (forecastData ?? [1, 2, 3, 4, 5, 6, 7])?.map((data: ForecastData, index: number) => (
      <Grid key={index} xs={4} sx={{ display: "flex", justifyContent: "center", }}>
        <>
          <ForecastTile data={data} isLoading={isLoading} />
        </>
      </Grid>
    ));
  }

  return (
    <>
      <FilterBar type={Pages.Forecast} location={location.name} />
      <ContentBox
        sx={{
          paddingBottom: "2px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Grid
          container
          spacing={2}
          sx={{
            maxWidth: "1200px",
            justifyContent: "center",
          }}
        >
          {renderError()}
          {renderForecastTiles()}
        </Grid>
      </ContentBox>
    </>
  );
};