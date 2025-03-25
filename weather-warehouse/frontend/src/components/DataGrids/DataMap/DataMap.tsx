import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import { MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet'
import { Height } from '@mui/icons-material';
import 'leaflet/dist/leaflet.css';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { DataMapProps } from './DataMap.type';
import { useMapEvent } from 'react-leaflet';
import { MapLocationChange } from './MapLocationChange';
import { useMapCoordinates } from './useMapCoordinates';
import { StyledMapContainer } from '../../../stlyes/content.style';


export function DataMap({ data }: Readonly<DataMapProps>) {
  const coords = useMapCoordinates(data);

  return (
    <StyledMapContainer
      center={coords} zoom={12} maxZoom={12} minZoom={2}>
      <MapLocationChange coords={coords} />
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://tiles.stadiamaps.com/tiles/stamen_terrain/{z}/{x}/{y}{r}.png"
      />
    </StyledMapContainer>
  );
}
