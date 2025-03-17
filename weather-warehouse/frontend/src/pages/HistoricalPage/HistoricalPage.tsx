import React, { useEffect, useState } from "react";
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid2';
import { FilterBar } from '../../components/FilterBar/FilterBar';
import { ContentBox, StyledItem } from '../../stlyes/content.style';
import { Pages } from '../../types/page.type';
import { DataMap } from '../../components/DataGrids/DataMap/DataMap';
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { DataTable } from "../../components/DataGrids/DataTable/DataTable";
import dayjs from "dayjs";
import { DataChart } from "../../components/DataGrids/DataChart/DataChart";


export function HistoricalPage() {
  const [location, setLocation] = useState(() => localStorage.getItem("location") || "");
  const [selectedDate, setSelectedDate] = useState<dayjs.Dayjs | null>(null);

  const handleLocationChange = (newLocation: string) => {
    setLocation(newLocation);
    localStorage.setItem("location", newLocation);
  };

  const handleDateChange = (dateValue: dayjs.Dayjs | null) => {
    setSelectedDate(dateValue);
  };

  const { data } = useQuery({
    queryKey: ["weather", location],
    queryFn: async () => {
      const response = await axios.get(`/today/data?location=${location}`);
      return response.data;
    },
    enabled: !!location,
  });

  const [tableData, setTableData] = useState([
    { date: "2023-08-01", maxTemp: 32, minTemp: 25, humidity: 60 },
    { date: "2023-07-31", maxTemp: 34, minTemp: 23, humidity: 70 },
  ]);

  useEffect(() => {
    if (data?.main?.temp_max && data?.main?.temp_min) {
      const currentDate = new Date().toISOString().split("T")[0];
      setTableData((prev) => [
        ...prev,
        {
          date: currentDate,
          maxTemp: Math.round(data.main.temp_max - 273.15),
          minTemp: Math.round(data.main.temp_min - 273.15),
          humidity: data.main.humidity,
        },
      ]);
    }
  }, [data]);

  useEffect(() => {
    if (selectedDate) {
      const newRecord = {
        date: selectedDate.format("YYYY-MM-DD"),
        maxTemp: 28,
        minTemp: 18,
        humidity: 55,
      };
      setTableData((prev) => [...prev, newRecord]);
    }
  }, [selectedDate]);

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
              <DataMap data={data} />
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
            <StyledItem >
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
