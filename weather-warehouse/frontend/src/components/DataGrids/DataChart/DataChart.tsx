import React from "react";
import { Skeleton } from "@mui/material";
import {  ResponsiveContainer, LineChart, Tooltip, CartesianGrid, XAxis, YAxis, Legend, Line } from "recharts";
import { StlyedLineChart } from "../../../stlyes/content.style";


export function DataChart({ data }: { data: Array<{ date: string; maxTemp: number; minTemp: number; humidity: number }> }) {
  
    if (!data || data.length === 0) {
    return (
      <Skeleton
        variant="rectangular"
        animation="wave"
        width="100%"
        height="100%"
        sx={{ borderRadius: '10px' }}
      />
    );
  }


  return (
    <ResponsiveContainer width="100%" height="100%">
      <StlyedLineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="maxTemp" stroke="#8884d8" />
        <Line type="monotone" dataKey="minTemp" stroke="#82ca9d" />
      </StlyedLineChart>
    </ResponsiveContainer>
  );
}
