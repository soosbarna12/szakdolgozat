import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import React from "react";
import { StyledDatePicker } from "../../../stlyes/inputField.style";
import { DateFilterProps } from "./DateFilter.type";
import { useState } from "react";
import dayjs, { Dayjs } from "dayjs";


export function DateFilter({ onDateChange }: DateFilterProps) {
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(null);

  const handleDateChange = (date: Dayjs | null) => {
    setSelectedDate(date);
    onDateChange?.(date);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <StyledDatePicker
        format="YYYY-MM-DD"
        sx={{ boxShadow: 4 }}
        //onAccept={(value) => onDateChange?.(value)}
        onAccept={handleDateChange}
        slotProps={{
          textField: {
            size: 'small',
            //placeholder: "Date"
            placeholder: selectedDate
              ? selectedDate.format("YYYY-MM-DD")
              : dayjs().format("YYYY-MM-DD"), // default to today's date
          },
          popper: { sx: { ".MuiPaper-root": { borderRadius: "20px" } } },
        }}
      />
    </LocalizationProvider>
  );
}
