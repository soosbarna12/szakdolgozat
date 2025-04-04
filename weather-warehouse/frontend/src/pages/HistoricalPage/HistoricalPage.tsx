import React, { useContext, useEffect, useState } from "react";
import { ContentBox, StyledItem } from "../../stlyes/content.style";
import { Box } from "@mui/material";
import Grid from "@mui/material/Grid2";

import { Pages } from "../../types/page.type";
import { FilterBar } from "../../components/FilterBar/FilterBar";
import { useAlert } from "../../utils/AlertContext";
import { DataMap } from "../../components/DataGrids/DataMap/DataMap";
import { DataTable } from "../../components/DataGrids/DataTable/DataTable";
import { DataChart } from "../../components/DataGrids/DataChart/DataChart";
import { WeatherCard } from "../../components/DataGrids/WeatherCard/WeatherCard";

import { useTodayDataQuery } from "../../hooks/useTodayDataQuery";
import { useHistoricalData } from "../../hooks/useHistoricalData";
import { useGeolocationQuery } from "../../hooks/useGeolocationQuery";

import dayjs from "dayjs";
import axios from "axios"; 
import { LocationContext } from "../../contexts/LocationContext";


export function HistoricalPage() {
  const [date, setDate] = useState<dayjs.Dayjs | null>(null);
  const { location } = useContext(LocationContext);
  //const { data: todayData, error, isLoading } = useTodayDataQuery(location.lat, location.lon); // currently using the todays data query, because the historical is not available yet
  const { data: todayData, error, isLoading } = useTodayDataQuery(location.name); // currently using the todays data query, because the historical is not available yet
  const { data: geoData, error: geoError } = useGeolocationQuery(location.name);
  const { tableData } = useHistoricalData({ data: todayData, date });
  const { showAlert } = useAlert();

  // handle date change
  const handleDateChange = (dateValue: dayjs.Dayjs | null) => {
    setDate(dateValue);
  };

  // handle saveing location
  const handleSaveLocation = async () => {
    if (!location) {
      showAlert("No location to save", "warning");
      return;
    }

    if (!todayData || !todayData.coord) {
      showAlert("Geolocation data is missing for the selected location", "error");
      return;
    }

    const { lat, lon } = todayData.coord;
    const name = todayData.name;

    if (!name || lat === undefined || lon === undefined) {
      showAlert("Missing required location data (name, latitude, or longitude)", "error");
      return;
    }

    // Adjust the date to include the local timezone offset
    const selectedDate = date || dayjs(); // Use the selected date or the current date
    const dateWithOffset = selectedDate.add(2, "hour").format("YYYY-MM-DDTHH:mm:ssZ"); // Add 2 hours and format with timezone offset

    try {
      const token = localStorage.getItem("token");
      await axios.post(
        "/user/saveLocation",
        { name, latitude: lat, longitude: lon, date: dateWithOffset },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      showAlert("Location saved successfully", "success");
    } catch (error) {
      console.error(error);
      showAlert("Failed to save location", "error");
    }
  };

  return (
    <>
      <FilterBar
        type={Pages.Historical}
        location={location.name}
        onDateChange={handleDateChange}
        onSaveLocation={handleSaveLocation}
      />

      <ContentBox>
        <Grid container spacing={2}>

          <Grid size={{ xs: 6, md: 8 }}>
            <StyledItem sx={{ height: "400px" }}>
              {error ? (
                <p>Error fetching historical data.</p>
              ) : (
                <DataMap data={todayData} />
              )}
            </StyledItem>
          </Grid>

          <Grid size={{ xs: 6, md: 4 }}>
            <StyledItem sx={{ height: "400px" }}>
              {error ? (
                <p>Error fetching today's weather data.</p>
              ) : (
                <WeatherCard data={todayData} />
              )}
            </StyledItem>
          </Grid>

          <Grid size={{ xs: 6, md: 4 }}>
            <StyledItem sx={{ height: "400px" }}>
              <h4>Lorem ipsum</h4>
              <Box>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque hic
                dolorem numquam corrupti? Veritatis ex corporis qui ipsam doloribus
                architecto nisi eum. Possimus a molestias maiores debitis deserunt
                praesentium maxime.
              </Box>
            </StyledItem>
          </Grid>

          <Grid size={{ xs: 6, md: 8 }}>
            <StyledItem sx={{ height: "400px" }}>
              <DataTable data={tableData} />
            </StyledItem>
          </Grid>

          <Grid size={{ xs: 6, md: 8 }}>
            <StyledItem sx={{ height: "400px" }}>
              <DataChart data={tableData} />
            </StyledItem>
          </Grid>

          <Grid size={{ xs: 6, md: 4 }}>
            <StyledItem sx={{ height: "400px" }}>
              <h4>Lorem ipsum</h4>
              <Box>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque hic
                dolorem numquam corrupti? Veritatis ex corporis qui ipsam doloribus
                architecto nisi eum. Possimus a molestias maiores debitis deserunt
                praesentium maxime.
              </Box>
            </StyledItem>
          </Grid>

        </Grid>
      </ContentBox>
    </>
  );
}
