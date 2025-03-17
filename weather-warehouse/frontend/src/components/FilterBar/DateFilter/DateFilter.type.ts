import { Dayjs } from "dayjs";

export interface DateFilterProps {
  onDateChange?: (dateValue: Dayjs | null) => void;
}