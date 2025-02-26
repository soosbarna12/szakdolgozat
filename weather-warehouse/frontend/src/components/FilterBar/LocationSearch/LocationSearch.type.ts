import { Pages } from '../../../types/page.type';

export interface LocationSearchProps {
  type: Pages;
  location: string;
  onLocationChange: (newLocation: string) => void;
}
