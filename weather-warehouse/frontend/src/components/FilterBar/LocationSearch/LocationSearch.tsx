import React, { useState, useEffect } from "react";
import Autocomplete from '@mui/material/Autocomplete';
import StyledTextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import { useDebounce } from "use-debounce";
import axios from "axios";
import { LocationSearchProps } from "./LocationSearch.type";

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
        setOptions(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchSuggestions();
  }, [debouncedValue]);

  return (
    <Autocomplete
      freeSolo
      options={options}
      getOptionLabel={(option) =>
        typeof option === "string"
          ? option
          : `${option.name}${option.state ? `, ${option.state}` : ""}, ${option.country}`
      }
      value={location}
      inputValue={inputValue}
      onInputChange={(event, newInputValue) => {
        setInputValue(newInputValue);
      }}
      onChange={(event, newValue) => {
        if (newValue && typeof newValue !== "string") {
          const selectedLocation = `${newValue.name}${newValue.state ? `, ${newValue.state}` : ""}, ${newValue.country}`;
          setInputValue(selectedLocation);
          onLocationChange(selectedLocation);
        }
      }}
      renderInput={(params) => (
        <StyledTextField
          {...params}
          placeholder="Location"
          variant="outlined"
          sx={{ boxShadow: 4, width: type === "Historical" ? 250 : 400 }}
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