import React from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

export function ForecastChart({ data }: { data: number[] }) {
  const chartData = data.map((value, index) => ({ day: index + 1, value }));

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={chartData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="day" label={{ value: "Day", position: "insideBottom", offset: -5 }} />
        <YAxis label={{ value: "Value", angle: -90, position: "insideLeft" }} />
        <Tooltip />
        <Line type="monotone" dataKey="value" stroke="#8884d8" />
      </LineChart>
    </ResponsiveContainer>
  );
}