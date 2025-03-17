import { Table, TableBody, TableCell, TableHead, TableRow, Paper } from "@mui/material";
import React from "react";
import { styled } from "@mui/material/styles";
import { StyledTableContainer, StyledTableHeaderCell } from "../../../stlyes/content.style";


const StyledTableCell = styled(TableCell)(({ theme }) => ({
    border: "1px solid #ccc",
}));

export function DataTable({ data }: { data: Array<{ date: string; maxTemp: number; minTemp: number; humidity: number }> }) {
    return (
        <StyledTableContainer>
            <Table>
                <TableHead>
                    <TableRow>
                        <StyledTableHeaderCell>Date</StyledTableHeaderCell>
                        <StyledTableHeaderCell>Max Temp (°C)</StyledTableHeaderCell>
                        <StyledTableHeaderCell>Min Temp (°C)</StyledTableHeaderCell>
                        <StyledTableHeaderCell>Humidity (%)</StyledTableHeaderCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.map((item) => (
                        <TableRow key={item.date}>
                            <StyledTableCell>{item.date}</StyledTableCell>
                            <StyledTableCell>{item.maxTemp}</StyledTableCell>
                            <StyledTableCell>{item.minTemp}</StyledTableCell>
                            <StyledTableCell>{item.humidity}</StyledTableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </StyledTableContainer>
    );
}
