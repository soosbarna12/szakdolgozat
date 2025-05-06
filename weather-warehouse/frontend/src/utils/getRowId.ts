import { HistoricalDataTable } from "../types/historicalDataTable.type";

export function getRowId(row: HistoricalDataTable): string {
  return row.date + row.cityName + row.countryCode;
}