import React from "react";
import { ResponsiveContainer, Tooltip, CartesianGrid, XAxis, YAxis, Legend, Line, Bar, ComposedChart } from "recharts";
import { HistoricalDataTable } from "../../../types/historicalDataTable.type";

export function WindPressureCombinedChart({ data }: { data: HistoricalDataTable[] }) {
  if (!data || data.length === 0) {
    return <p>No data available</p>;
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