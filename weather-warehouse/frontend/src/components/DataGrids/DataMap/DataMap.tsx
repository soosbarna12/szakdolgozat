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


export function DataMap({ data }: Readonly<DataMapProps>) {
  const [coords, setCoords] = useState<[number, number]>([51.505, -0.09]);

  useEffect(() => {
    if (data && data.coord) {
      setCoords([data.coord.lat, data.coord.lon]);
    }
  }, [data]);

  return (
    <MapContainer style={{ height: '100%', width: '100%' }} center={coords} zoom={20}>
      <MapLocationChange coords={coords} />
      <TileLayer
        attribution="© CARTO"
        url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
      />
    </MapContainer>
  );
}
