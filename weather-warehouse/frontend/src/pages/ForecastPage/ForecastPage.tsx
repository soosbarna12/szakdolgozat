import { useQuery } from "@tanstack/react-query";
import React from "react";
import ForecastTileGroup from "../../components/DataGrids/ForecastTileGroup/ForecastTileGroup";
import { FilterBar } from "../../components/FilterBar/FilterBar";
import { ContentBox } from "../../stlyes/content.style";
import { Pages } from "../../types/page.type";


export function ForecastPage() {
  return (
    <>
      <ContentBox>
        <ForecastTileGroup />
      </ContentBox>
    </>
  )
}
