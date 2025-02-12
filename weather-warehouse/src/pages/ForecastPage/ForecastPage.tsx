import React from "react";
import ForecastTile from "../../components/DataGrids/ForecastTileGroup/ForecastTile/ForecastTile";
import { FilterBar } from "../../components/FilterBar/FilterBar";

export function ForecastPage() {
  return (
    <>
      <FilterBar type="forecast" />
      <ForecastTile />
    </>
  )
}
