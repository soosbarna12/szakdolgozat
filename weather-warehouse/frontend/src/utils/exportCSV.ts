import { download, generateCsv, mkConfig } from "export-to-csv";
import { HistoricalDataTable } from "../types/historicalDataTable.type";

export function exportCSV(data: HistoricalDataTable[]) {
  if (!data || data.length === 0) {
    return;
  }

  const csvConfig = mkConfig({ useKeysAsHeaders: true, filename: "historical_data" });

  const csv = generateCsv(csvConfig)(data as any[]);
  download(csvConfig)(csv);
}