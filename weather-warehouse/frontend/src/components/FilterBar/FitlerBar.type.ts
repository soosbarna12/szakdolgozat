import { Dayjs } from 'dayjs';
import { Pages } from '../../types/page.type';

export interface FilterBarProps {
  type: Pages;
  location: string;
  onDateChange?: (dateValue: Dayjs | null) => void;
  onSaveLocation?: () => void;
  onExportLocation?: () => void;
  onResetLocation?: () => void;

}
