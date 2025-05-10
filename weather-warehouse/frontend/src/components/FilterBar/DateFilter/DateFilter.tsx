import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";
import React, { useContext, useEffect, useRef, useState } from "react";
import { LOCAL_STORAGE_SELECTED_DATE_NAME } from "../../../consts/historicalDate.const";
import { HistoricalContext } from "../../../contexts/HistoricalContext/HistoricalContext";
import { useHistoricalDates } from "../../../hooks/useHistoricalDates";
import { StyledDatePicker } from "../../../stlyes/inputField.style";
import { DateFilterProps } from "./DateFilter.type";


export function DateFilter({ onDateChange }: DateFilterProps) {

  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(getStoredDate());
  const { location } = useContext(HistoricalContext);
  const { data: historicalDates, isLoading } = useHistoricalDates(location.name);
  const isInitialized = useRef(false);
  const previousLocation = useRef(location.name);
  const datePickerLoadingPlaceholder = isLoading ? "Loading..." : "Date";
  const datePickerPlaceholder = selectedDate ? selectedDate.format("YYYY-MM-DD") : datePickerLoadingPlaceholder;

  function getStoredDate() {
    const storedDate = localStorage.getItem(LOCAL_STORAGE_SELECTED_DATE_NAME);
    return storedDate ? dayjs(storedDate) : null
  }

  const handleDateChange = (date: Dayjs | null) => {
    setSelectedDate(date);
    onDateChange?.(date);
  };

  useEffect(() => {
    if (isInitialized.current && location.name !== previousLocation.current) {
      setSelectedDate(null);
      onDateChange?.(null);
    } else {
      isInitialized.current = true;
    }
    previousLocation.current = location.name;
  }, [location.name]);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_SELECTED_DATE_NAME, selectedDate?.format("YYYY-MM-DD") ?? "");
  }, [selectedDate]);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <StyledDatePicker
        format="YYYY-MM-DD"
        sx={{ boxShadow: 4 }}
        onAccept={handleDateChange}
        value={selectedDate}
        minDate={dayjs("1750-01-01")}
        disabled={!location.name || isLoading || !historicalDates?.length}
        shouldDisableDate={(date) => {
          if (isLoading || !historicalDates?.length) return true;
          const formattedDate = date.format("YYYY-MM-DD");
          return !historicalDates.includes(formattedDate);
        }}
        slotProps={{
          textField: {
            size: 'small',
            placeholder: datePickerPlaceholder
          },
          popper: { sx: { ".MuiPaper-root": { borderRadius: "20px" } } },
        }}
      />
    </LocalizationProvider>
  );
}
