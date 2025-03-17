import { Table, TableBody, TableCell, TableHead, TableRow, Paper } from "@mui/material";
import React from "react";

export function DataTable({ data }: { data: Array<{ date: string; maxTemp: number; minTemp: number; humidity: number }> }) {
    return (
        <Paper>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Date</TableCell>
                        <TableCell>Max Temp (°C)</TableCell>
                        <TableCell>Min Temp (°C)</TableCell>
                        <TableCell>Humidity (%)</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.map((item) => (
                        <TableRow key={item.date}>
                            <TableCell>{item.date}</TableCell>
                            <TableCell>{item.maxTemp}</TableCell>
                            <TableCell>{item.minTemp}</TableCell>
                            <TableCell>{item.humidity}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </Paper>
    );
}
