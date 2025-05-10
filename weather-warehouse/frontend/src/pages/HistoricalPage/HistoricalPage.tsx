import Grid from "@mui/material/Grid2";
import React, { useContext, useState } from "react";
import { ContentBox, StyledItem } from "../../stlyes/content.style";
import { DataChart } from "../../components/DataGrids/DataChart/DataChart";
import { DataMap } from "../../components/DataGrids/DataMap/DataMap";
import { DataTable } from "../../components/DataGrids/DataTable/DataTable";
import { FilterBar } from "../../components/FilterBar/FilterBar";
import { Pages } from "../../types/page.type";
import dayjs from "dayjs";
import { PrecipitationDataChart } from "../../components/DataGrids/DataChart/PrecipitationDataChart";
import { WindPressureCombinedChart } from "../../components/DataGrids/DataChart/WindPressureCombinedChart";
import { HistoricalWeatherCard } from "../../components/DataGrids/WeatherCard/HistoricalWeatherCard";
import { getAllHistoricalDataTableColumns } from "../../consts/dataTable.const";
import { HistoricalContext } from "../../contexts/HistoricalContext/HistoricalContext";
import { useHistoricalDataQuery } from "../../hooks/useHistoricalDataQuery";
import { useHistoricalTableData } from "../../hooks/useHistoricalTableData";
import { useSaveLocationQuery } from "../../hooks/useSaveLocationQuery";
import { exportCSV } from "../../utils/exportCSV";
import { TemperatureScale } from "../../types/temperatureScale.type";

export function HistoricalPage() {
  const [date, setDate] = useState<dayjs.Dayjs | null>(null);
  const { location, setLocation, temperatureScale } = useContext(HistoricalContext);
  const { data: historicalData, error } = useHistoricalDataQuery({ location: location, date: date?.format("YYYY-MM-DD") });
  const { historicalPageData, setHistoricalPageData } = useHistoricalTableData({ data: historicalData, date });
  const { refetch: refetchSaveLocationQuery } = useSaveLocationQuery(historicalPageData);
  const columnDef = getAllHistoricalDataTableColumns(temperatureScale as TemperatureScale);


  const handleDateChange = (dateValue: dayjs.Dayjs | null) => {
    setDate(dateValue);
  };

  const handleSaveLocation = () => {
    refetchSaveLocationQuery();
  }

  const handleExportLocation = () => {
    exportCSV(historicalPageData);
  };

  const handleResetLocation = async () => {
    setLocation({ name: "", lat: 0, lon: 0 });
    setDate(null);
    setHistoricalPageData([]);
  }

  function handleDataMapInput() {
    if (location.name === "") {
      return { lat: historicalPageData?.at(-1)?.lat ?? 0, lon: historicalPageData?.at(-1)?.lon ?? 0 };
    } else {
      return location;
    }
  }


  return (
    <>
      <FilterBar
        type={Pages.Historical}
        location={location.name}
        onDateChange={handleDateChange}
        onSaveLocation={handleSaveLocation}
        onExportLocation={handleExportLocation}
        onResetLocation={handleResetLocation}
      />

      <ContentBox sx={{ paddingBottom: "2px" }}>
        <Grid container spacing={2}>

          <Grid size={{ xs: 6, md: 8 }}>
            <StyledItem sx={{ height: "400px" }} data-testid="dataMap">
              {error ? (
                <p>Error fetching historical data.</p>
              ) : (
                <DataMap data={handleDataMapInput()} />
              )}
            </StyledItem>
          </Grid>

          <Grid size={{ xs: 6, md: 4 }}>
            <StyledItem sx={{ height: "400px" }} data-testid="historicalWeatherCard">
              {error ? (
                <p>Error fetching historical weather data.</p>
              ) : (
                <HistoricalWeatherCard data={historicalPageData.at(-1)} />
              )}
            </StyledItem>
          </Grid>

          <Grid size={{ xs: 6, md: 12 }}>
            <StyledItem sx={{ height: "400px" }}>
              <DataTable data={historicalPageData} columns={columnDef} />
            </StyledItem>
          </Grid>

          <Grid size={{ xs: 6, md: 6 }}>
            <StyledItem sx={{ height: "400px" }} data-testid="dataTable">
              <DataChart data={historicalPageData} />
            </StyledItem>
          </Grid>

          <Grid size={{ xs: 6, md: 6 }}>
            <StyledItem sx={{ height: "400px" }}>
              <PrecipitationDataChart data={historicalPageData} />
            </StyledItem>
          </Grid>

          <Grid size={{ xs: 6, md: 6 }}>
            <StyledItem sx={{ height: "400px" }}>
              <WindPressureCombinedChart data={historicalPageData} />
            </StyledItem>
          </Grid>

        </Grid>
      </ContentBox>
    </>
  );
}

