import { HistoricalLocationData } from '../../../contexts/HistoricalContext/HistoricalContext.type';
import { TodayLocationData } from '../../../contexts/TodayContext/TodayContext.type';
import { Pages } from '../../../types/page.type';

export interface LocationSearchProps {
  type: Pages;
  location: TodayLocationData | HistoricalLocationData;
  setLocation: (location: TodayLocationData | HistoricalLocationData) => void;
}

export interface LocationOption {
  name: string;
  state?: string;
  country: string;
  lat: number;
  lon: number;
}
