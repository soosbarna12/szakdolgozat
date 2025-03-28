import React, { useState } from "react";
import { FilterBar } from "../../components/FilterBar/FilterBar";
import { Pages } from "../../types/page.type";
import { ContentBox, StyledItem } from "../../stlyes/content.style";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { WeatherCard } from "../../components/DataGrids/WeatherCard/WeatherCard";
import { Skeleton } from "@mui/material";
import { useTodayDataQuery } from "../../hooks/useTodayDataQuery";


export function TodayPage() {

  const [location, setLocation] = useState(() => localStorage.getItem("location") || "");
  const { data, error, isLoading } = useTodayDataQuery(location);


  const handleLocationChange = (newLocation: string) => {
    setLocation(newLocation);
    localStorage.setItem("location", newLocation);
  };


  return (
    <>
      <FilterBar type={Pages.Today} location={location} onLocationChange={handleLocationChange} />
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
        {data &&
          <StyledItem sx={{ height: "400px", width: "350px" }}>
            <WeatherCard data={data} />
          </StyledItem>
        }
      </ContentBox>
    </>
  );
}
