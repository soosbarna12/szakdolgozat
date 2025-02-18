import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import { InputAdornment } from "@mui/material";
import React from "react";
import { StyledLocationSearch } from '../../../stlyes/inputField.style';
import { Pages } from '../../../types/page.type';
import { noop } from "../../../utils/noop";
import { LocationSearchProps } from './LocationSearch.type';

const widthByType: Record<Pages, number> = {
  [Pages.Historical]: 250,
  [Pages.Today]: 400,
  [Pages.Forecast]: 400
};

export function LocationSearch(props: Readonly<LocationSearchProps>) {
  const { type } = props;
  const width = widthByType[type];

  return (
    <StyledLocationSearch
      id="input-with-icon-adornment"
      placeholder='Location'
      onClick={noop}
      color="primary"
      sx={{ boxShadow: 4, width }}
      startAdornment={
        <InputAdornment position="start">
          <SearchOutlinedIcon />
        </InputAdornment>
      }
    />
  );
}