import { useQuery } from "@tanstack/react-query";
import React, { useContext, useState } from "react";
import ForecastTileGroup from "../../components/DataGrids/ForecastTileGroup/ForecastTileGroup";
import { FilterBar } from "../../components/FilterBar/FilterBar";
import { ContentBox } from "../../stlyes/content.style";
import { Pages } from "../../types/page.type";
import { TodayContext } from "../../contexts/TodayContext/TodayContext";


export function ForecastPage() {
  const { location } = useContext(TodayContext);

  return (
    <>
      <FilterBar
        type={Pages.Forecast}
        location={location.name}
      />
      <ContentBox>
        <ForecastTileGroup />
      </ContentBox>
    </>
  );
}
