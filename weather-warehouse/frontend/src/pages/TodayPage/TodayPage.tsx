import React from "react";
import { FilterBar } from "../../components/FilterBar/FilterBar";
import { Pages } from "../../types/page.type";
import { ContentBox } from "../../stlyes/content.style";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import { WeatherCard } from "../../components/DataGrids/WeatherCard/WeatherCard";

export function TodayPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [location, setLocation] = React.useState(searchParams.get("location") || "");

  const handleLocationChange = (newLocation: string) => {
    setLocation(newLocation);
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
      <ContentBox>
        {isLoading && <p>Loading...</p>}
        {error && <p>Error fetching data.</p>}
        {data && <WeatherCard data={data} />}
      </ContentBox>
    </>
  );
}
