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

import dayjs from "dayjs";
import { LocationContext } from "../../contexts/LocationContext";
import { useSaveLocationQuery } from "../../hooks/useSaveLocationQuery";


export function HistoricalPage() {
  const [date, setDate] = useState<dayjs.Dayjs | null>(null);
  const { location } = useContext(LocationContext);
  const { historicalPageData, setHistoricalPageData } = useContext(LocationContext);
  //const { data: todayData, error, isLoading } = useTodayDataQuery(location.lat, location.lon); // currently using the todays data query, because the historical is not available yet
  const { data: todayData, error } = useTodayDataQuery(location.name); // currently using the todays data query, because the historical is not available yet
  //onst { data: geoData, error: geoError } = useGeolocationQuery(location.name);
  const { tableData } = useHistoricalData({ data: todayData, date });
  const { refetch: refetchSaveLocationQuery } = useSaveLocationQuery(todayData, date);

  // handle date change
  const handleDateChange = (dateValue: dayjs.Dayjs | null) => {
    setDate(dateValue);
  };

  const handleSaveLocation = async () => {
    refetchSaveLocationQuery();
  }

  // Sync tableData with historicalPageData
  useEffect(() => {
    if (tableData && tableData.length > 0) {
      setHistoricalPageData((prevData) => {
        const newData = tableData.filter(
          (newRecord) =>
            !prevData.some(
              (existingRecord) =>
                existingRecord.date === newRecord.date &&
                existingRecord.location === newRecord.location
            )
        );
        return [...prevData, ...newData];
      });
    }
  }, [tableData, setHistoricalPageData]);

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
              <DataTable data={historicalPageData} />
            </StyledItem>
          </Grid>

          <Grid size={{ xs: 6, md: 8 }}>
            <StyledItem sx={{ height: "400px" }}>
              <DataChart data={historicalPageData} />
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
