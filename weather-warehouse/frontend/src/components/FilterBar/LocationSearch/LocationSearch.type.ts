import { Pages } from '../../../types/page.type';

export interface LocationSearchProps {
  type: Pages;
  location: string;
}

export interface LocationOption {
  name: string;
  state?: string;
  country: string;
  lat: number;
  lon: number;
}