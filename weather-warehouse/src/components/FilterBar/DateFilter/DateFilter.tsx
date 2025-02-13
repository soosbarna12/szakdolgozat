import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import React from "react";
import { StyledDatePicker } from "../../../common.style";

export function DateFilter() {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <StyledDatePicker
        sx={{ boxShadow: 4 }}
        slotProps={{
          textField: { size: 'small', placeholder: "Date" },
          popper: { sx: { ".MuiPaper-root": { borderRadius: "20px" }, }, },
        }} />
    </LocalizationProvider>
  );
}
