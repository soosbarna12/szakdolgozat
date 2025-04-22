import { HistoricalDataTable } from "../types/historicalDataTable.type";
import { mkConfig, generateCsv, download } from "export-to-csv";

export function exportCSV(data: HistoricalDataTable[]) {
  if (!data || data.length === 0) {
    console.error("No data available to export.");
    return;
  }

  const csvConfig = mkConfig({ useKeysAsHeaders: true, filename: "historical_data" });

  const csv = generateCsv(csvConfig)(data as any[]);
  download(csvConfig)(csv);
}