import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import { MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet'
import { Height } from '@mui/icons-material';
import 'leaflet/dist/leaflet.css';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { DataMapProps } from './DataMap.type';
import { MutableRefObject, useRef } from 'react';
import { useMapEvent } from 'react-leaflet';


function RecenterAutomatically({ coords }: { coords: [number, number] }) {
  const map = useMap();

  useEffect(() => {
    map.setView(coords);
  }, [coords, map]);

  return null;
}

export function DataMap({ data }: Readonly<DataMapProps>) {
  // changed code: store coords in state
  const [coords, setCoords] = useState<[number, number]>([51.505, -0.09]);

  // changed code: update coords from data
  useEffect(() => {
    if (data && data.coord) {
      setCoords([data.coord.lat, data.coord.lon]);
    }
  }, [data]);

  return (
    <MapContainer
      style={{ height: "100%", width: "100%" }}
      center={coords}
      zoom={13}
      scrollWheelZoom={true}
    > 
      <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={coords}>
          <Popup>{data?.name}</Popup>
        </Marker>
      <RecenterAutomatically coords={coords} />
    </MapContainer>
  );

  
  /*
  const [lat, setLat] = useState(51.505);
  const [lon, setLon] = useState(-0.09);
  
  const RecenterAutomatically = ({lat,lng}) => {
    const map = useMap();
     useEffect(() => {
       map.setView([lat, lng]);
     }, [lat, lng]);
     return null;
   }

  /*
  const [coords, setCoords] = useState<[number, number]>([51.505, -0.09]);

  useEffect(() => {
    if (data) {
      setCoords([data.coord.lat, data.coord.lon]);
    }
  }, [data]);
*/
}
