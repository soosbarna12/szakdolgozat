import React, { useContext, useState } from "react";
import { FilterBar } from "../../components/FilterBar/FilterBar";
import { Pages } from "../../types/page.type";
import { ContentBox, StyledItem } from "../../stlyes/content.style";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { WeatherCard } from "../../components/DataGrids/WeatherCard/WeatherCard";
import { Skeleton } from "@mui/material";
import { useTodayDataQuery } from "../../hooks/useTodayDataQuery";
import { LocationContext } from "../../contexts/LocationContext";


export function TodayPage() {

  const { location } = useContext(LocationContext);
  const { data: todayData, error, isLoading } = useTodayDataQuery(location.lat, location.lon); // currently using the todays data query, because the historical is not available yet


  const handleLocationChange = (newLocation: string) => {
    localStorage.setItem("location", newLocation);
  };


  return (
    <>
      <FilterBar type={Pages.Today} location={location.name} />
      <ContentBox sx={{ display: "flex", justifyContent: "center" }}>
        {isLoading && (
          <Skeleton
            variant="rectangular"
            animation="wave"
            width="350px"
            height="375px"
            sx={{ borderRadius: '20px' }}
          />
        )}
        {error && <p>Error fetching data.</p>}
        {todayData &&
          <StyledItem sx={{ height: "400px", width: "350px" }}>
            <WeatherCard data={todayData} />
          </StyledItem>
        }
      </ContentBox>
    </>
  );
}
