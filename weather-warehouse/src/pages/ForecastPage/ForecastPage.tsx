import React from "react";
import ForecastTile from "../../components/DataGrids/ForecastTileGroup/ForecastTile/ForecastTile";
import { FilterBar } from "../../components/FilterBar/FilterBar";
import { Pages } from "../../types/pages";

export function ForecastPage() {
  return (
    <>
      <FilterBar type={Pages.Forecast} />
      <ForecastTile />
    </>
  )
}
