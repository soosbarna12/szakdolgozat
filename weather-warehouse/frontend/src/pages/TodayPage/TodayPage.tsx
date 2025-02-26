import React from "react";
import { FilterBar } from "../../components/FilterBar/FilterBar";
import { Pages } from "../../types/page.type";
import { ContentBox } from "../../stlyes/content.style";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import { WeatherCard } from "../../components/DataGrids/WeatherCard/WeatherCard";
import { Skeleton } from "@mui/material";

export function TodayPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [location, handleLocation] = React.useState(searchParams.get("location") || "Budapest");

  const handleLocationChange = (newLocation: string) => {
    handleLocation(newLocation);
    setSearchParams({ location: newLocation });
  };

  const { data, error, isLoading } = useQuery({
    queryKey: ["weather", location],
    queryFn: async () => {
      const response = await axios.get(`/today/data?location=${location}`);
      return response.data;
    },
    enabled: !!location,
  });

  return (
    <>
      <FilterBar type={Pages.Today} location={location} onLocationChange={handleLocationChange} />
      <ContentBox sx={{ display: "flex", justifyContent: "center" }}>
        {isLoading && (
          <Skeleton
            variant="rectangular"
            animation="wave"
            width="350px"
            height="350px"
            sx={{ borderRadius: '20px' }}
          />
        )}
        {error && <p>Error fetching data.</p>}
        {data && <WeatherCard data={data} />}
      </ContentBox>
    </>
  );
}
