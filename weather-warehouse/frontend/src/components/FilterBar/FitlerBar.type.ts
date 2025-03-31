import { Pages } from '../../types/page.type';
import { Dayjs } from 'dayjs';

export interface FilterBarProps {
  type: Pages;
  location: string;
  onLocationChange: (newLocation: string) => void;
  onDateChange?: (dateValue: Dayjs | null) => void;
  onSaveLocation?: () => void;
}
