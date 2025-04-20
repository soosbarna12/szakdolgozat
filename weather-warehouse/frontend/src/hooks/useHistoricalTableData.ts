import { useState, useEffect, useContext } from "react";
import { UseHistoricalDataProps } from "../pages/HistoricalPage/HistoricalPage.type";
import { HistoricalContext } from "../contexts/HistoricalContext/HistoricalContext";


export function useHistoricalTableData(props: Readonly<UseHistoricalDataProps>) {
  //const [tableData, setTableData] = useState<HistoricalDataTable[]>([]);
  const { historicalPageData, setHistoricalPageData } = useContext(HistoricalContext);
  const { data: newRecord } = props;

  useEffect(() => {
    console.log("-hook-useHistoricalTableData", newRecord);

    if (newRecord) {

      console.log("--hook-newRecord", newRecord);

      setHistoricalPageData((prev) => {
        const isDuplicate = prev.some((record) => record.date === newRecord.date
        && record.cityName === newRecord.cityName
        && record.countryCode === newRecord.countryCode);
        return isDuplicate ? prev : [...prev, newRecord];
      });
    }
  }, [newRecord]);

  return { historicalPageData };
}
