import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import { InputAdornment, OutlinedInput } from "@mui/material";
import React from "react";
import { noop } from "../../../utils/noop";

export function LocationSearch() {
  return (
    <OutlinedInput
      id="input-with-icon-adornment"
      placeholder='Location'
      onClick={noop}
      color="primary"
      sx={{ boxShadow: 4, margin: 1, borderRadius: 50, width: 250, height: 40 }}
      startAdornment={
        <InputAdornment position="start">
          <SearchOutlinedIcon />
        </InputAdornment>
      }
    />
  );
}