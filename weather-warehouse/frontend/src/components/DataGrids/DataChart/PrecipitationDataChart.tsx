import React from "react";
import { Skeleton } from "@mui/material";
import { ResponsiveContainer, Tooltip, CartesianGrid, XAxis, YAxis, Legend, Line, AreaChart, Area } from "recharts";
import { StlyedLineChart } from "../../../stlyes/content.style";
import { HistoricalDataTable } from "../../../types/historicalDataTable.type";


export function PrecipitationDataChart({ data }: { data: HistoricalDataTable[] }) {
  function renderContent() {
    if (!data || data.length === 0) {
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
        < AreaChart data={data} >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Area type="monotone" dataKey="precipitation" stroke="#8884d8" name="Precipitation (mm/s)" />
        </AreaChart >
      </ResponsiveContainer>
    )
  }

  return renderContent()
}
