import React, { useState, useEffect } from "react";
import Autocomplete from '@mui/material/Autocomplete';
import StyledTextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import { useDebounce } from "use-debounce";
import axios from "axios";
import { LocationSearchProps } from "./LocationSearch.type";
import { StyledAutocompleteDropdown, StyledLocationSearch } from "../../../stlyes/inputField.style";

export function LocationSearch(props: Readonly<LocationSearchProps>) {
  const { type, location, onLocationChange } = props;
  const [inputValue, setInputValue] = useState(location);
  const [debouncedValue] = useDebounce(inputValue, 500);
  const [options, setOptions] = useState<Array<{ name: string; country: string; state?: string }>>([]);

  // Fetch location suggestions when debounced value changes
  useEffect(() => {
    if (debouncedValue.trim() === "") {
      setOptions([]);
      return;
    }

    const fetchSuggestions = async () => {
      try {
        const apiKey = "462394b96065d405cd9ca7b3ef92d634";
        const limit = 5;
        const response = await axios.get(
          `https://api.openweathermap.org/geo/1.0/direct?q=${debouncedValue}&limit=${limit}&appid=${apiKey}`
        );
        const newResults = response.data.filter(
          (loc: any, index: number, self: any[]) =>
            index ===
            self.findIndex(
              (t) => t.name === loc.name && t.state === loc.state && t.country === loc.country
            )
        );
        setOptions(newResults);
      } catch (error) {
        console.error(error);
      }
    };
    fetchSuggestions();
  }, [debouncedValue]);

  return (
    <Autocomplete
      options={options}
      getOptionLabel={(option) =>
        typeof option === "string"
          ? option
          : `${option.name}${option.state ? `, ${option.state}` : ""}, ${option.country}`
      }
      inputValue={inputValue}
      onInputChange={(event, newValue) => setInputValue(newValue)}
      onChange={(event, newValue) => {
        if (newValue && typeof newValue !== "string") {
          const selectedLocation = `${newValue.name}${newValue.state ? `, ${newValue.state}` : ""}, ${newValue.country}`;
          setInputValue(selectedLocation);
          onLocationChange(selectedLocation);
        }
      }}
      PaperComponent={StyledAutocompleteDropdown}
      renderInput={(params) => (
        <StyledLocationSearch
          {...params}
          placeholder="Location"
          sx={{ boxShadow: 4, width: type === "Historical" ? 250 : 400 }}
          variant="outlined"
          InputProps={{
            ...params.InputProps,
            startAdornment: (
              <InputAdornment position="start">
                <SearchOutlinedIcon />
              </InputAdornment>
            ),
          }}
        />
      )}
    />
  );
}
