import React from "react";
import { Skeleton } from "@mui/material";
import { ResponsiveContainer, LineChart, Tooltip, CartesianGrid, XAxis, YAxis, Legend, Line } from "recharts";
import { StlyedLineChart } from "../../../stlyes/content.style";
import { HistoricalDataTable } from "../../../types/historicalDataTable.type";
import { render } from "@testing-library/react";


export function DataChart({ data }: { data: HistoricalDataTable[] }) {


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
        < StlyedLineChart data={data} >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="maxTemp" stroke="#8884d8" />
          <Line type="monotone" dataKey="minTemp" stroke="#82ca9d" />
        </StlyedLineChart >
      </ResponsiveContainer>
    )
  }

  return renderContent()
}
