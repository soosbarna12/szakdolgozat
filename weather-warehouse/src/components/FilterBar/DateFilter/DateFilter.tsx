import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import React from "react";

export function DateFilter() {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        sx={{
          boxShadow: 4, margin: 1, borderRadius: 50, width: 200, height: 40, border: 0,
          '& .MuiInputBase-root': {
            borderRadius: '20px'
          },
        }}
        slotProps={{
          textField: { size: 'small', placeholder: "Select date" },
          popper: { sx: { ".MuiPaper-root": { borderRadius: "20px" }, }, },
        }} />
    </LocalizationProvider>
  );
}
