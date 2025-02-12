import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import { InputAdornment, OutlinedInput } from "@mui/material";
import React from "react";
import { noop } from "../../../utils/noop";
import { LocationSearchProps } from './LocationSearch.type';

const widthByType: Record<LocationSearchProps['type'], number> = {
  forecast: 400,
  historical: 250,
  today: 400
};

export function LocationSearch(props: Readonly<LocationSearchProps>) {
  const { type } = props;

  return (
    <OutlinedInput
      id="input-with-icon-adornment"
      placeholder='Location'
      onClick={noop}
      color="primary"
      sx={{
        boxShadow: 4, margin: 1, borderRadius: 50, width: widthByType[type], height: 40, border: 0, borderColor: "#f5f5f5",
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
      startAdornment={
        <InputAdornment position="start">
          <SearchOutlinedIcon />
        </InputAdornment>
      }
    />
  );
}