import React, { useState } from "react";
import Grid from "@mui/material/Grid2";
import { FilterBar } from "../../components/FilterBar/FilterBar";
import { ContentBox, StyledItem } from "../../stlyes/content.style";
import { Pages } from "../../types/page.type";
import { DataMap } from "../../components/DataGrids/DataMap/DataMap";
import { DataTable } from "../../components/DataGrids/DataTable/DataTable";
import { DataChart } from "../../components/DataGrids/DataChart/DataChart";
import { useTodayDataQuery } from "../../hooks/useTodayDataQuery";
import { useHistoricalData } from "../../hooks/useHistoricalData";
import dayjs from "dayjs";
import axios from "axios";
import { useAlert } from "../../utils/AlertContext";
import { useGeolocationQuery } from "../../hooks/useGeolocationQuery";


export function HistoricalPage() {
  const [location, setLocation] = useState(() => localStorage.getItem("location") || "");
  const [date, setDate] = useState<dayjs.Dayjs | null>(null);
  const { data: todayData, error, isLoading } = useTodayDataQuery(location);
  const { data: geoData, error: geoError } = useGeolocationQuery(location);
  const { tableData } = useHistoricalData({ data: todayData, date });
  const { showAlert } = useAlert();

  const handleLocationChange = (newLocation: string) => {
    setLocation(newLocation);
    localStorage.setItem("location", newLocation);
  };

  const handleDateChange = (dateValue: dayjs.Dayjs | null) => {
    setDate(dateValue);
  };

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

    try {
      const token = localStorage.getItem("token");
      await axios.post(
        "/user/saveLocation",
        { name, latitude: lat, longitude: lon, date },
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
        location={location}
        onDateChange={handleDateChange}
        onLocationChange={handleLocationChange}
        onSaveLocation={handleSaveLocation}
      />

      <ContentBox>
        <Grid container spacing={2}>
          <Grid size={{ xs: 6, md: 8 }}>
            <StyledItem sx={{ height: "400px" }}>
              {error ? <p>Error fetching data.</p> : <DataMap data={todayData} />}
            </StyledItem>
          </Grid>

          <Grid size={{ xs: 6, md: 8 }}>
            <StyledItem sx={{ height: "400px" }}>
              {error ? <p>Error fetching data.</p> : <DataTable data={tableData} />}
            </StyledItem>
          </Grid>

          <Grid size={{ xs: 6, md: 8 }}>
            <StyledItem sx={{ height: "400px" }}>
              <DataChart data={tableData} />
            </StyledItem>
          </Grid>
        </Grid>
      </ContentBox>
    </>
  );
}
