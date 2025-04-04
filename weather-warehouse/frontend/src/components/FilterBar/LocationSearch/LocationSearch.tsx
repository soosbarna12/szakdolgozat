import React, { useState, useEffect, useContext } from "react";
import Autocomplete from '@mui/material/Autocomplete';
import InputAdornment from '@mui/material/InputAdornment';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import { useDebounce } from "use-debounce";
import { LocationOption, LocationSearchProps } from "./LocationSearch.type";
import { StyledAutocompleteDropdown, StyledLocationSearch } from "../../../stlyes/inputField.style";
import { useGeolocationQuery } from "../../../hooks/useGeolocationQuery";
import { LocationContext } from "../../../contexts/LocationContext";


export function LocationSearch(props: Readonly<LocationSearchProps>) {
  const { type, location } = props;
  const [inputValue, setInputValue] = useState(location);
  const [debouncedValue] = useDebounce(inputValue, 500);
  const [options, setOptions] = useState<Array<LocationOption>>([]);
  const { data: locationOptions, error, isLoading } = useGeolocationQuery(debouncedValue);
  const { setLocation } = useContext(LocationContext);

  // fetch location suggestions when debounced value changes
  useEffect(() => {
    if (debouncedValue.trim() === "") {
      setOptions([]);
      return;
    }
  }, [debouncedValue]);

  // fetch autocomplete options
  useEffect(() => {
    if (locationOptions?.length > 0) {
      setOptions(locationOptions);
    }
  }, [locationOptions]);


  function getOptionLabel(option: LocationOption) {
    if (typeof option === "string") {
      return option;
    }
    return `${option.name}${option.state ? `, ${option.state}` : ""}, ${option.country}`;
  }

  function handleAutocompleteMessage() {
    if (isLoading || inputValue.trim() === "") {
      return "Start typing to find a location";
    }
    return "No location found";
  }

  function handleOnChange(event: React.SyntheticEvent, newValue: LocationOption | null) {
    if (newValue && typeof newValue !== "string") {
      const selectedLocation = getOptionLabel(newValue)
      setInputValue(selectedLocation);
      setLocation({
        name: selectedLocation,
        lat: newValue.lat,
        lon: newValue.lon,
      });
    }
  }


  return (
    <Autocomplete
      options={options}
      getOptionLabel={getOptionLabel}
      inputValue={inputValue}
      onInputChange={(event, newValue) => setInputValue(newValue)}
      onChange={handleOnChange}
      PaperComponent={StyledAutocompleteDropdown}
      noOptionsText={handleAutocompleteMessage()}
      renderInput={(params) => (
        <StyledLocationSearch
          {...params}
          placeholder={location ? location : "Location"}
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
