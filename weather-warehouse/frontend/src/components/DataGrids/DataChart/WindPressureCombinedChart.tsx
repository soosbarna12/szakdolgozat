import { Skeleton } from "@mui/material";
import React from "react";
import { Bar, CartesianGrid, ComposedChart, Legend, Line, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { HistoricalDataTable } from "../../../types/historicalDataTable.type";

export function WindPressureCombinedChart({ data }: { data: HistoricalDataTable[] }) {
  if (!data || data.length === 0) {
    return (
      <Skeleton
        variant="rectangular"
        animation="wave"
        width="100%"
        height="100%"
        data-testid="windPressureSkeleton"
        sx={{ borderRadius: '10px' }}
      />
    )
  }

  return (
    <ResponsiveContainer width="100%" height="100%">
      <ComposedChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis yAxisId="left" />
        <YAxis yAxisId="right" orientation="right" />
        <Tooltip />
        <Legend />
        <Bar yAxisId="left" dataKey="pressure" fill="#8884d8" name="Pressure (hPa)" />
        <Line yAxisId="right" type="monotone" dataKey="windSpeed" stroke="#82ca9d" name="Wind Speed (m/s)" />
      </ComposedChart>
    </ResponsiveContainer>
  );
}