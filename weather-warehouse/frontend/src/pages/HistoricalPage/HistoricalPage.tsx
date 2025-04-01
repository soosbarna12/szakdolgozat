import React, { useState } from "react";
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid2';
import { FilterBar } from "../../components/FilterBar/FilterBar";
import { ContentBox, StyledItem } from "../../stlyes/content.style";
import { Pages } from "../../types/page.type";
import { DataMap } from "../../components/DataGrids/DataMap/DataMap";
import { DataTable } from "../../components/DataGrids/DataTable/DataTable";
import { DataChart } from "../../components/DataGrids/DataChart/DataChart";
import { useHistoricalDataQuery } from "../../hooks/useHistoricalDataQuery";
import { useHistoricalData } from "../../hooks/useHistoricalData";
import dayjs from "dayjs";
import { useTodayDataQuery } from "../../hooks/useTodayDataQuery";
import { WeatherCard } from "../../components/DataGrids/WeatherCard/WeatherCard";
import axios from "axios";
import { useAlert } from "../../utils/AlertContext";
//import "../../pages/HistoricalPage/HistoricalPage.mock";


export function HistoricalPage() {
  const [location, setLocation] = useState(() => localStorage.getItem("location") || "");
  const [date, setDate] = useState<dayjs.Dayjs | null>(null);
  const { data: historicalData, error: historicalError } = useHistoricalDataQuery({ location, date });
  const { data: todayData, error } = useTodayDataQuery(location);
  const { tableData } = useHistoricalData({ data: historicalData, date });
  const { showAlert } = useAlert();

  // Handle location change
  const handleLocationChange = (newLocation: string) => {
    setLocation(newLocation);
    localStorage.setItem("location", newLocation);
  };

  // Handle date change
  const handleDateChange = (dateValue: dayjs.Dayjs | null) => {
    setDate(dateValue);
  };

  // Save location action from the FilterBar actions menu
  const handleSaveLocation = async () => {
    if (!location) {
      showAlert("No location to save", "warning");
      return;
    }
    try {
      const apiKey = "462394b96065d405cd9ca7b3ef92d634";
      const geoRes = await axios.get(`https://api.openweathermap.org/geo/1.0/direct?q=${location}&limit=1&appid=${apiKey}`);
      if (geoRes.data && geoRes.data.length > 0) {
        const { name, lat, lon, } = geoRes.data[0];
        const token = localStorage.getItem("token");
        await axios.post(
          "/user/saveLocation",
          { name: name, latitude: lat, longitude: lon, date: date },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        showAlert("Location saved successfully", "success");
      } else {
        showAlert("Location not found", "error");
      }
    } catch (error) {
      console.error(error);
      showAlert("Failed to save location", "error");
    }
  };


  return (
    <>
      <FilterBar
        type={Pages.Historical}
        location={location}
        onDateChange={handleDateChange}
        onLocationChange={handleLocationChange}
        onSaveLocation={handleSaveLocation}
      />

      <ContentBox>
        <Grid container spacing={2}>

          <Grid size={{ xs: 6, md: 8 }}>
            <StyledItem sx={{ height: "400px" }}>
              {historicalError ? (
                <p>Error fetching historical data.</p>
              ) : (
                <DataMap data={historicalData} />
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
