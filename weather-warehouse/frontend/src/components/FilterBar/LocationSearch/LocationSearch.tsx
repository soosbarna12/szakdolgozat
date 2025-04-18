import React, { useState, useEffect, useContext } from "react";
import Autocomplete from '@mui/material/Autocomplete';
import InputAdornment from '@mui/material/InputAdornment';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import { useDebounce } from "use-debounce";
import { LocationOption, LocationSearchProps } from "./LocationSearch.type";
import { StyledAutocompleteDropdown, StyledLocationSearch } from "../../../stlyes/inputField.style";
import { useGeolocationQuery } from "../../../hooks/useGeolocationQuery";
import { useHistoricalLocations } from "../../../hooks/useHistoricalLocations";
import { Pages } from "../../../types/page.type";

export function LocationSearch(props: Readonly<LocationSearchProps>) {
  const { type: pageType, location, setLocation } = props;
  const isTodayPage = pageType === Pages.Today;
  const [inputValue, setInputValue] = useState(getOptionLabel(location as LocationOption));
  const [selectedValue, setSelectedValue] = useState<LocationOption | null>(null);
  const [debouncedValue] = useDebounce(inputValue, 500);
  const [options, setOptions] = useState<Array<LocationOption>>([]);
  const todayLocationOptions = useGeolocationQuery(debouncedValue, pageType);
  const historicalLocations = useHistoricalLocations(debouncedValue, pageType);
  const { data, error, isLoading } = pageType === Pages.Today ? todayLocationOptions : historicalLocations;

  console.log("LocationSearch data: ", location);

  // fetch location suggestions when debounced value changes
  useEffect(() => {
    if (debouncedValue.trim() === "" || selectedValue?.name === debouncedValue) {
      setOptions([]);
      return;
    }
  }, [debouncedValue, selectedValue]);

  // fetch autocomplete options
  useEffect(() => {
    if (data?.length > 0) {
      setOptions(data);
    }
  }, [JSON.stringify(data)]);

  useEffect(() => {
    const optionLabel = getOptionLabel(location as LocationOption);
    if (inputValue !== optionLabel) {
      setInputValue(optionLabel);
    }
  }, [location]);

  function getOptionLabel(option: LocationOption) {
    if (!option.name || !option.country) {
      return "";
    }
    if (option?.state) {
      return `${option.name}, ${option.state}, ${option.country}`;
    }
    return `${option.name}, ${option.country}`;
  }

  function handleAutocompleteMessage() {
    if (isLoading) {
      return "Loading locations...";
    }
    if (error) {
      return "Failed to load locations";
    }
    if (inputValue.trim() === "") {
      return "Start typing to find a location";
    }
    return "No location found";
  }

  function handleOnChange(event: React.SyntheticEvent, newValue: LocationOption | null) {
    if (newValue) {
      setSelectedValue(newValue);
      setInputValue(getOptionLabel(newValue)); // option label format [city name, country]
      setLocation({ name: newValue.name, country: newValue.country, state: newValue.state, lat: 0, lon: 0 });
    }
  }

  function handleInputChange(event: React.SyntheticEvent, newValue: string, reason: string) {
    if (reason === "input") {
      setInputValue(newValue);
    }
  }


  return (
    <Autocomplete
      options={options}
      getOptionLabel={getOptionLabel}
      inputValue={inputValue}
      onInputChange={handleInputChange}
      onChange={handleOnChange}
      PaperComponent={StyledAutocompleteDropdown}
      noOptionsText={handleAutocompleteMessage()}
      renderInput={(params) => (
        <StyledLocationSearch
          {...params}
          placeholder={pageType === Pages.Today ? location.name : "Location"}
          sx={{ boxShadow: 4, width: pageType === "Historical" ? 250 : 400 }}
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