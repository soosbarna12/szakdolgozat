import React from "react";
import { Outlet } from "react-router-dom";
import { FilterBar } from "../../components/FilterBar/FilterBar";

export function TodayPage() {
  return (
    <>
      <Outlet />
      <FilterBar />
      Today
    </>
  );
}
