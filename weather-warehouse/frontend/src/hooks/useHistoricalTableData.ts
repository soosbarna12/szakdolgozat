import { useContext, useEffect } from "react";
import { HistoricalContext } from "../contexts/HistoricalContext/HistoricalContext";
import { UseHistoricalDataProps } from "../pages/HistoricalPage/HistoricalPage.type";


export function useHistoricalTableData(props: Readonly<UseHistoricalDataProps>) {
  //const [tableData, setTableData] = useState<HistoricalDataTable[]>([]);
  const { historicalPageData, setHistoricalPageData } = useContext(HistoricalContext);
  const { data: newRecord } = props;

  useEffect(() => {
    if (newRecord) {
      setHistoricalPageData((prev) => {
        const isDuplicate = prev.some((record) => record.date === newRecord.date
        && record.cityName === newRecord.cityName
        && record.countryCode === newRecord.countryCode);
        return isDuplicate ? prev : [...prev, newRecord];
      });
    }
  }, [newRecord]);

  return { historicalPageData, setHistoricalPageData };
}
