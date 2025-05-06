import React, { useContext } from "react";
import ForecastTileGroup from "../../components/DataGrids/ForecastTileGroup/ForecastTileGroup";
import { FilterBar } from "../../components/FilterBar/FilterBar";
import { TodayContext } from "../../contexts/TodayContext/TodayContext";
import { ContentBox } from "../../stlyes/content.style";
import { Pages } from "../../types/page.type";


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
