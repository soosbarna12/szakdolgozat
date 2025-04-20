import React, { useContext, useEffect, useState } from "react";
import { ContentBox, StyledItem } from "../../stlyes/content.style";
import { Box, Table } from "@mui/material";
import Grid from "@mui/material/Grid2";

import { Pages } from "../../types/page.type";
import { FilterBar } from "../../components/FilterBar/FilterBar";
import { DataMap } from "../../components/DataGrids/DataMap/DataMap";
import { DataTable } from "../../components/DataGrids/DataTable/DataTable";
import { DataChart } from "../../components/DataGrids/DataChart/DataChart";
import { WeatherCard } from "../../components/DataGrids/WeatherCard/WeatherCard";


import dayjs from "dayjs";
import { HistoricalContext } from "../../contexts/HistoricalContext/HistoricalContext";
import { useHistoricalDataQuery } from "../../hooks/useHistoricalDataQuery";
import { useHistoricalTableData } from "../../hooks/useHistoricalTableData";
import { useSaveLocationQuery } from "../../hooks/useSaveLocationQuery";


export function HistoricalPage() {
  const [date, setDate] = useState<dayjs.Dayjs | null>(null);

  // stores the current location
  const { location } = useContext(HistoricalContext);

  // raw weather data from database by location and date
  const { data: historicalData, error } = useHistoricalDataQuery({ location: location, date: date?.format("YYYY-MM-DD") });

  // processed historicalData for the DataTable component
  const { historicalPageData } = useHistoricalTableData({ data: historicalData, date });


  const { refetch: refetchSaveLocationQuery } = useSaveLocationQuery(historicalData, date);
  //const { data: todayData, error, isLoading } = useTodayDataQuery(location.lat, location.lon); // currently using the todays data query, because the historical is not available yet
  //const { data: todayData, error } = useTodayDataQuery(location.name); // currently using the todays data query, because the historical is not available yet
  //onst { data: geoData, error: geoError } = useGeolocationQuery(location.name);


  console.log("|historicalData", historicalData);
  console.log("|historicalPageData", historicalPageData);
  console.log("|tableData", historicalPageData);

  // handle date change
  const handleDateChange = (dateValue: dayjs.Dayjs | null) => {
    setDate(dateValue);
  };

  const handleSaveLocation = async () => {
    refetchSaveLocationQuery();
  }

  useEffect(() => {
    if (location) {
      console.log("-Location changed:", location);
    }
  }, [location]);

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
                <DataMap data={location} />
              )}
            </StyledItem>
          </Grid>

          <Grid size={{ xs: 6, md: 4 }}>
            <StyledItem sx={{ height: "400px" }}>
              {error ? (
                <p>Error fetching today's weather data.</p>
              ) : (
                null // weather card for historical data, brand new component please;
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
