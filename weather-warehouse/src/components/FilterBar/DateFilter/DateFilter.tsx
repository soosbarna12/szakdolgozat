import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import React from "react";

export function DateFilter() {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        sx={{
          boxShadow: 4, margin: 1, borderRadius: 50, width: 200, height: 40, border: 0, borderColor: "#f5f5f5",
          '& .MuiInputBase-root': {
            borderRadius: '20px',
            borderColor: "#f5f5f5",
            border: 0
          },
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: "#f5f5f5",
            borderWidth: "2px",
          },
          "&:hover:not(.Mui-focused)": {
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: "#1976d2",
            },
          },
        }}
        slotProps={{
          textField: { size: 'small', placeholder: "Date" },
          popper: { sx: { ".MuiPaper-root": { borderRadius: "20px" }, }, },
        }} />
    </LocalizationProvider>
  );
}
