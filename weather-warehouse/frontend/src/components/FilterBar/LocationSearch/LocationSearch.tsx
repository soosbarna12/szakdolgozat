import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import Autocomplete from '@mui/material/Autocomplete';
import InputAdornment from '@mui/material/InputAdornment';
import React, { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";
import { useGeolocationQuery } from "../../../hooks/useGeolocationQuery";
import { useHistoricalLocations } from "../../../hooks/useHistoricalLocations";
import { StyledAutocompleteDropdown, StyledLocationSearch } from "../../../stlyes/inputField.style";
import { Pages } from "../../../types/page.type";
import { LocationOption, LocationSearchProps } from "./LocationSearch.type";


export function LocationSearch(props: Readonly<LocationSearchProps>) {
  const { type: pageType, location, setLocation } = props;
  const [inputValue, setInputValue] = useState(getOptionLabel(location as LocationOption));
  const [selectedValue, setSelectedValue] = useState<LocationOption | null>(null);
  const [debouncedValue] = useDebounce(inputValue, 500);
  const [options, setOptions] = useState<Array<LocationOption>>([]);
  const todayLocationOptions = useGeolocationQuery(debouncedValue, pageType);
  const historicalLocations = useHistoricalLocations(debouncedValue, pageType);
  const { data, error, isLoading } = getLocationOptions(pageType, todayLocationOptions, historicalLocations);


  useEffect(() => {
    if (debouncedValue.trim() === "" || selectedValue?.name === debouncedValue) {
      setOptions([]);
      return;
    }
  }, [debouncedValue, selectedValue]);

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


  function getLocationOptions(pageType: Pages, todayLocationOptions: any, historicalLocations: any) {
    if (pageType === Pages.Today) {
      return todayLocationOptions;
    }
    if (pageType === Pages.Historical || pageType === Pages.Forecast) {
      return historicalLocations;
    }
    return { data: [], error: null, isLoading: false };
  }

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
      setInputValue(getOptionLabel(newValue));
      setLocation({ name: newValue.name, country: newValue.country, state: newValue.state, lat: newValue.lat, lon: newValue.lon });
    }
  }

  function handleInputChange(event: React.SyntheticEvent, newValue: string, reason: string) {
    if (reason === "input") {
      setInputValue(newValue);

      if (newValue.trim() === "") {
        setLocation({ name: "", lat: 0, lon: 0 });
      }
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
          data-testid="locationSearchBox"
          placeholder={pageType === Pages.Today ? location.name : "Location"}
          sx={{ boxShadow: 4, width: pageType === "Historical" ? 300 : 400 }}
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