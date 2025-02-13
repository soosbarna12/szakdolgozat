import React from "react";
import { FilterBar } from "../../components/FilterBar/FilterBar";
import { Pages } from "../../types/pages";

export function TodayPage() {
  return (
    <>
      <FilterBar type={Pages.Today} />
    </>
  );
}
