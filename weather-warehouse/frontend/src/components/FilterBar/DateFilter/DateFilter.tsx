import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import React from "react";
import { StyledDatePicker } from "../../../stlyes/inputField.style";
import dayjs, { Dayjs } from "dayjs";
import { DateFilterProps } from "./DateFilter.type";


export function DateFilter({ onDateChange }: DateFilterProps) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <StyledDatePicker
        sx={{ boxShadow: 4 }}
        onChange={(value) => onDateChange?.(value)}
        slotProps={{
          textField: { size: 'small', placeholder: "Date" },
          popper: { sx: { ".MuiPaper-root": { borderRadius: "20px" } } },
        }}
      />
    </LocalizationProvider>
  );
}
