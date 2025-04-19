import React, { useContext, useEffect, useState } from "react";
import { ContentBox, StyledItem } from "../../stlyes/content.style";
import { Box } from "@mui/material";
import Grid from "@mui/material/Grid2";

import { Pages } from "../../types/page.type";
import { FilterBar } from "../../components/FilterBar/FilterBar";
import { DataMap } from "../../components/DataGrids/DataMap/DataMap";
import { DataTable } from "../../components/DataGrids/DataTable/DataTable";
import { DataChart } from "../../components/DataGrids/DataChart/DataChart";
//import { WeatherCard } from "../../components/DataGrids/WeatherCard/WeatherCard";

import { useHistoricalData } from "../../hooks/useHistoricalData";

import dayjs from "dayjs";
import { useSaveLocationQuery } from "../../hooks/useSaveLocationQuery";
import { useHistoricalDataQuery } from "../../hooks/useHistoricalDataQuery";
import { HistoricalContext } from "../../contexts/HistoricalContext/HistoricalContext";


export function HistoricalPage() {
  const [date, setDate] = useState<dayjs.Dayjs | null>(null);
  const { location } = useContext(HistoricalContext);
  const { historicalPageData, setHistoricalPageData } = useContext(HistoricalContext);
  //const { data: todayData, error, isLoading } = useTodayDataQuery(location.lat, location.lon); // currently using the todays data query, because the historical is not available yet
  //const { data: todayData, error } = useTodayDataQuery(location.name); // currently using the todays data query, because the historical is not available yet
  const { data: historicalData, error } = useHistoricalDataQuery({ location: location, date: date?.format("YYYY-MM-DD") });
  //onst { data: geoData, error: geoError } = useGeolocationQuery(location.name);
  const { tableData } = useHistoricalData({ data: historicalData, date });
  const { refetch: refetchSaveLocationQuery } = useSaveLocationQuery(historicalData, date);

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
                <DataMap data={historicalData} />
              )}
            </StyledItem>
          </Grid>

          <Grid size={{ xs: 6, md: 4 }}>
            <StyledItem sx={{ height: "400px" }}>
              {error ? (
                <p>Error fetching today's weather data.</p>
              ) : (
                null //<WeatherCard data={historicalData} />
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
