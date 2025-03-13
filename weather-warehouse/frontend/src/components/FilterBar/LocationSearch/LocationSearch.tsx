import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import { InputAdornment } from "@mui/material";
import React, { useState, useEffect } from "react";
import { useDebounce } from 'use-debounce';
import { StyledLocationSearch } from '../../../stlyes/inputField.style';
import { Pages } from '../../../types/page.type';
import { noop } from "../../../utils/noop";
import { LocationSearchProps } from './LocationSearch.type';
import axios from 'axios';

const widthByType: Record<Pages, number> = {
  [Pages.Historical]: 250,
  [Pages.Today]: 400,
  [Pages.Forecast]: 400
};

export function LocationSearch(props: Readonly<LocationSearchProps>) {
  const { type, location, onLocationChange } = props;
  const width = widthByType[type];

  const [value, setValue] = useState(location);
  const [debouncedValue] = useDebounce(value, 500);

  useEffect(() => {
    onLocationChange(debouncedValue);
  }, [debouncedValue, onLocationChange]);

  useEffect(() => {
    if (!location) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;
          try {
            const response = await axios.get(`/today/data?lat=${lat}&lon=${lon}`);
            const city = response.data.name;
            const country = response.data.sys?.country;
            setValue(`${city}, ${country}`);
          } catch (error) {
            console.error(error);
          }
        },
        (error) => console.error(error)
      );
    }
  }, []);

  return (
    <StyledLocationSearch
      id="input-with-icon-adornment"
      placeholder="Location"
      value={value}
      onChange={(event) => setValue(event.target.value)}
      sx={{ boxShadow: 4, width }}
      startAdornment={
        <InputAdornment position="start">
          <SearchOutlinedIcon />
        </InputAdornment>
      }
    />
  );
}