import React from "react";
import { Outlet } from "react-router-dom";
import { FilterBar } from "../../components/FilterBar/FilterBar";

export function HistoricalPage() {
  return (
    <>
      <Outlet />
      <FilterBar />
      Historical
    </>
  )
}
