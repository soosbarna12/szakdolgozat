import dayjs from "dayjs";

export interface DataMapProps {
  title: string;
  content: string;
  location: string;
  handleLocationChange: (newLocation: string) => void;
}

export interface UseHistoricalDataQueryProps {
  location: string;
  date: dayjs.Dayjs | null;
}

export interface UseHistoricalDataProps {
  data: any;
  date: dayjs.Dayjs | null;
}