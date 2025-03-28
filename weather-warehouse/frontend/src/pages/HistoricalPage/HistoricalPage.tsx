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


export function HistoricalPage() {

  const [location, setLocation] = useState(() => localStorage.getItem("location") || "");
  const [date, setDate] = useState<dayjs.Dayjs | null>(null);
  const { data: historicalData } = useHistoricalDataQuery({ location, date });
  const { data: todayData, error, isLoading } = useTodayDataQuery(location);
  const { tableData } = useHistoricalData({ data: historicalData, date });


  // Handle location change
  const handleLocationChange = (newLocation: string) => {
    setLocation(newLocation);
    localStorage.setItem("location", newLocation);
  };

  // Handle date change
  const handleDateChange = (dateValue: dayjs.Dayjs | null) => {
    setDate(dateValue);
  };


  return (
    <>
      <FilterBar
        type={Pages.Historical}
        location={location}
        onDateChange={handleDateChange}
        onLocationChange={handleLocationChange}
      />

      <ContentBox>
        <Grid container spacing={2}>

          <Grid size={{ xs: 6, md: 8 }}>
            <StyledItem sx={{ height: "400px" }}>
              <DataMap data={historicalData} />
            </StyledItem>
          </Grid>

          <Grid size={{ xs: 6, md: 4 }}>
            <StyledItem sx={{ height: "400px" }}>
              {isLoading && <p>Loading...</p>}
              {error && <p>Error fetching today's weather data.</p>}
              {todayData ? (
                <WeatherCard data={todayData} />
              ) : (
                <p>No data available for today's weather.</p>
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
