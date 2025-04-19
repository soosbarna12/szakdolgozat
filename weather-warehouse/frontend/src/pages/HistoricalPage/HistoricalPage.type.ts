import dayjs from "dayjs";
import { HistoricalLocationData } from "../../contexts/HistoricalContext/HistoricalContext.type";

export interface DataMapProps {
  title: string;
  content: string;
  location: string;
  handleLocationChange: (newLocation: string) => void;
}

export interface UseHistoricalDataQueryProps {
  location: HistoricalLocationData;
  date: string | undefined | null;
}

export interface UseHistoricalDataProps {
  data: any;
  date: dayjs.Dayjs | null;
}