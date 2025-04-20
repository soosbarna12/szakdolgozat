import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import React, { useContext, useEffect, useRef } from "react";
import { StyledDatePicker } from "../../../stlyes/inputField.style";
import { DateFilterProps } from "./DateFilter.type";
import { useState } from "react";
import dayjs, { Dayjs } from "dayjs";
import { HistoricalContext } from "../../../contexts/HistoricalContext/HistoricalContext";
import { useHistoricalDates } from "../../../hooks/useHistoricalDates";
import { LOCAL_STORAGE_SELECTED_DATE_NAME } from "../../../consts/historicalDate.const";


export function DateFilter({ onDateChange }: DateFilterProps) {

  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(getStoredDate());
  const { location } = useContext(HistoricalContext);
  const { data: historicalDates, isLoading } = useHistoricalDates(location.name);
  const isInitialized = useRef(false);
  const previousLocation = useRef(location.name);

  function getStoredDate() {
    const storedDate = localStorage.getItem(LOCAL_STORAGE_SELECTED_DATE_NAME);
    return storedDate ? dayjs(storedDate) : null
  }

  const handleDateChange = (date: Dayjs | null) => {
    setSelectedDate(date);
    onDateChange?.(date);
  };

  // reset datepicker when location changes
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
        minDate={dayjs("1750-01-01")} // Set the minimum date to the first date in historicalDates
        disabled={!location.name || isLoading || !historicalDates?.length} // disable if no location is selected
        shouldDisableDate={(date) => {
          if (isLoading || !historicalDates?.length) return true; // Disable all dates while loading
          const formattedDate = date.format("YYYY-MM-DD");
          return !historicalDates.includes(formattedDate); // Disable dates not in historicalDates
        }}
        slotProps={{
          textField: {
            size: 'small',
            placeholder: selectedDate
              ? selectedDate.format("YYYY-MM-DD")
              : "Date",
          },
          popper: { sx: { ".MuiPaper-root": { borderRadius: "20px" } } },
        }}
      />
    </LocalizationProvider>
  );
}
