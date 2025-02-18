import { useQuery } from "@tanstack/react-query";
import React from "react";
import ForecastTileGroup from "../../components/DataGrids/ForecastTileGroup/ForecastTileGroup";
import { FilterBar } from "../../components/FilterBar/FilterBar";
import { ContentBox } from "../../stlyes/content.style";
import { Pages } from "../../types/page.type";


const fetchForecast = async () => {
  const result = await fetch("http://127.0.0.1:4000/forecast/data");
  return result.json()
}

export function ForecastPage() {
  const { data, status } = useQuery({ queryKey: ['Forecast'], queryFn: fetchForecast })
  console.log("data", data, "status", status)
  return (
    <>
      <FilterBar type={Pages.Forecast} />
      <ContentBox>
        <ForecastTileGroup />
      </ContentBox>
    </>
  )
}
