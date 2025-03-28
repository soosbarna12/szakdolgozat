import React from "react";
import { Skeleton } from "@mui/material";
import { Box } from "@mui/material";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { DataMapProps } from "./DataMap.type";
import { StyledMapContainer } from "../../../stlyes/content.style";
import "leaflet/dist/leaflet.css";


export function DataMap({ data }: Readonly<DataMapProps>) {

  if (!data) {
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

  // default coordinates
  const coords: [number, number] = data.coord ? [data.coord.lat, data.coord.lon] : [51.505, -0.09];


  return (
    <StyledMapContainer center={coords} zoom={12} maxZoom={12} minZoom={2}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://tiles.stadiamaps.com/tiles/stamen_terrain/{z}/{x}/{y}{r}.png"
      />
    </StyledMapContainer>
  );
}
