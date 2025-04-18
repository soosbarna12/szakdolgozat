import React, { useContext } from "react";
import { FilterBar } from "../../components/FilterBar/FilterBar";
import { Pages } from "../../types/page.type";
import { ContentBox, StyledItem } from "../../stlyes/content.style";
import { WeatherCard } from "../../components/DataGrids/WeatherCard/WeatherCard";
import { Skeleton } from "@mui/material";
import { useTodayDataQuery } from "../../hooks/useTodayDataQuery";
import { TodayContext } from "../../contexts/TodayContext/TodayContext";


export function TodayPage() {
  const { location } = useContext(TodayContext);
  console.log("TodayPage location: ", location);
  //const { data: todayData, error, isLoading } = useTodayDataQuery(location.lat, location.lon); // currently using the todays data query, because the historical is not available yet
  const { data: todayData, error, isLoading } = useTodayDataQuery(location.name); // currently using the todays data query, because the historical is not available yet


  function renderShimmer() {
    if (isLoading) {
      return (
        <Skeleton
          variant="rectangular"
          animation="wave"
          width="350px"
          height="375px"
          sx={{ borderRadius: '20px' }}
        />
      )
    }
  }

  function renderError() {
    if (error) {
      return <p>Error fetching data.</p>;
    }
  }

  function renderWeatherCard() {
    if (todayData) {
      return (
        <StyledItem sx={{ height: "400px", width: "350px" }}>
          <WeatherCard data={todayData} />
        </StyledItem>
      );
    }
  }

  return (
    <>
      <FilterBar type={Pages.Today} location={location.name} />
      <ContentBox sx={{ display: "flex", justifyContent: "center" }}>
        {renderShimmer()}
        {renderError()}
        {renderWeatherCard()}
      </ContentBox>
    </>
  );
}
