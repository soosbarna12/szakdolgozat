import React, { useContext, useMemo } from "react";
import { Skeleton } from "@mui/material";
import { ResponsiveContainer, Tooltip, CartesianGrid, XAxis, YAxis, Legend, Line } from "recharts";
import { StlyedLineChart } from "../../../stlyes/content.style";
import { HistoricalDataTable } from "../../../types/historicalDataTable.type";
import { HistoricalContext } from "../../../contexts/HistoricalContext/HistoricalContext";
import { TemperatureScale } from "../../../types/temperatureScale.type";
import { temperatureScaleChanger } from "../../../utils/temperatureScaleChanger";


export function DataChart({ data }: { data: HistoricalDataTable[] }) {
  const { temperatureScale, setTemperatureScale } = useContext(HistoricalContext);
  const temperatureScaleLabel = (temperatureScale === TemperatureScale.Celsius ? "°C" : "°F");

  const convertedData = useMemo(() => {
    return data.map((entry) => ({
      ...entry,
      maxTemp: temperatureScaleChanger(TemperatureScale.Celsius, temperatureScale, entry.maxTemp),
      minTemp: temperatureScaleChanger(TemperatureScale.Celsius, temperatureScale, entry.minTemp),
    }));
  }, [data, temperatureScale]);


  function renderContent() {
    if (!convertedData || convertedData.length === 0) {
      return (
        <Skeleton
          variant="rectangular"
          animation="wave"
          width="100%"
          height="100%"
          sx={{ borderRadius: '10px' }}
        />
      )
    }
    return (
      <ResponsiveContainer width="100%" height="100%">
        < StlyedLineChart data={convertedData} >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="maxTemp" stroke="#8884d8" name={`Maximum Temperature ${temperatureScaleLabel}`} />
          <Line type="monotone" dataKey="minTemp" stroke="#82ca9d" name={`Minimum Temperature ${temperatureScaleLabel}`} />
        </StlyedLineChart >
      </ResponsiveContainer>
    )
  }

  return renderContent()
}
