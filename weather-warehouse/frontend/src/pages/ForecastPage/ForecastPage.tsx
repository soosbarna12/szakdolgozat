import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import ForecastTileGroup from "../../components/DataGrids/ForecastTileGroup/ForecastTileGroup";
import { FilterBar } from "../../components/FilterBar/FilterBar";
import { ContentBox } from "../../stlyes/content.style";
import { Pages } from "../../types/page.type";


export function ForecastPage() {
  const [location, setLocation] = useState(
    () => localStorage.getItem("location") || ""
  );

  const handleLocationChange = (newLocation: string) => {
    setLocation(newLocation);
    localStorage.setItem("location", newLocation);
  };

  return (
    <>
      <FilterBar
        type={Pages.Forecast}
        location={location}
        onLocationChange={handleLocationChange}
      />
      <ContentBox>
        <ForecastTileGroup />
      </ContentBox>
    </>
  );
}
