import { useState, useEffect } from "react";
import { UseHistoricalDataProps } from "../pages/HistoricalPage/HistoricalPage.type";
import { HistoricalDataTable } from "../types/historicalDataTable.type";
import { kelvinToCelsius } from "../utils/dataConverters";


export function useHistoricalData(props: Readonly<UseHistoricalDataProps>) {
  const [tableData, setTableData] = useState<HistoricalDataTable[]>([]);
  const { data, date: selectedDate } = props;

  useEffect(() => {
    if (data?.main?.temp_max && data?.main?.temp_min) {
      const currentDate = new Date().toISOString().split("T")[0];
      
      const newRecord = {
        date: selectedDate ? selectedDate.format("YYYY-MM-DD") : currentDate,
        maxTemp: kelvinToCelsius(data.main.temp_max),
        minTemp: kelvinToCelsius(data.main.temp_min),
        humidity: data.main.humidity,
        location: [data.name, data.state, data.sys?.country].filter(Boolean).join(", "),
      };

      setTableData((prev) => {
        const isDuplicate = prev.some((record) => record.date === newRecord.date && record.location === newRecord.location);
        return isDuplicate ? prev : [...prev, newRecord];
      });
    }
  }, [data, selectedDate]);

  return { tableData };
}
