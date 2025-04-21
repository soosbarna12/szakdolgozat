import { Pages } from '../../types/page.type';
import { Dayjs } from 'dayjs';

export interface FilterBarProps {
  type: Pages;
  location: string;
  onDateChange?: (dateValue: Dayjs | null) => void;
  onSaveLocation?: () => void;
  onResetLocation?: () => void;

}
