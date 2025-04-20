import React from "react";
import { Skeleton } from "@mui/material";
import { TileLayer } from "react-leaflet";
import { DataMapProps } from "./DataMap.type";
import { StyledMapContainer } from "../../../stlyes/content.style";
import "leaflet/dist/leaflet.css";
import { MapLocationChange } from "./MapLocationChange";


export function DataMap({ data }: Readonly<DataMapProps>) {

  // default coordinates
  const coords: [number, number] = data ? [data.lat, data.lon] : [51.505, -0.09];

  function renderContent() {
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
    return (
      < StyledMapContainer center={coords} zoom={12} maxZoom={12} minZoom={2} >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://tiles.stadiamaps.com/tiles/stamen_terrain/{z}/{x}/{y}{r}.png"
        />
        <MapLocationChange coords={coords} />
      </StyledMapContainer >
    )
  }

  return renderContent();
}
