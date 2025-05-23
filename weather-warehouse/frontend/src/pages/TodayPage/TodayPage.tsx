import { Skeleton } from "@mui/material";
import React, { useContext } from "react";
import { TodayWeatherCard } from "../../components/DataGrids/WeatherCard/TodayWeatherCard";
import { FilterBar } from "../../components/FilterBar/FilterBar";
import { TodayContext } from "../../contexts/TodayContext/TodayContext";
import { useTodayDataQuery } from "../../hooks/useTodayDataQuery";
import { ContentBox, StyledItem } from "../../stlyes/content.style";
import { Pages } from "../../types/page.type";


export function TodayPage() {
  const { location } = useContext(TodayContext);
  const { data: todayData, error, isLoading } = useTodayDataQuery(location.name);


  function renderShimmer() {
    if (isLoading) {
      return (
        <Skeleton
          variant="rectangular"
          animation="wave"
          width="350px"
          height="375px"
          data-testid="todaySkeleton"
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
        <StyledItem sx={{ height: "400px", width: "350px" }} data-testid="todayWeatherCard">
          <TodayWeatherCard data={todayData} />
        </StyledItem>
      );
    }
  }

  return (
    <>
      <FilterBar type={Pages.Today} location={location.name} />
      <ContentBox sx={{ display: "flex", justifyContent: "center", paddingBottom: "2px" }}>
        {renderShimmer()}
        {renderError()}
        {renderWeatherCard()}
      </ContentBox>
    </>
  );
}
