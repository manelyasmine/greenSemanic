import React, { ReactNode } from 'react';
import { BuildingIcon } from '@/icons/BuildingIcon';
import { Apartment } from '@mui/icons-material';
import { Box, Card, CardContent, CardHeader, Typography } from '@mui/material';
import { ComposableMap, Geographies, Geography, Marker } from 'react-simple-maps';

import { palette } from '@/styles/theme/colors';

import country from '../../../data/country.json';

export interface MapProps {
  value: number;
  fColor?: string;
  title: string;
  sx?: any;
}
export interface MarkerData {
  markerOffset: number;
  name?: string;
  coordinates: [number, number];
}
//const geoUrl = 'https://raw.githubusercontent.com/deldersveld/topojson/master/world-countries.json';
//const geoUrl = 'https://unpkg.com/world-atlas@2.0.2/countries-110m.json';

export default function Map({ sx, value, title, fColor }: MapProps): React.JSX.Element {
  const markers: MarkerData[] = [
    { markerOffset: -20, coordinates: [36.124944, 28.434883] },
    { markerOffset: -20, coordinates: [78.69241, 20.112682] },
    { markerOffset: -20, coordinates: [130.642127, 43.285203] },
    { markerOffset: -20, coordinates: [155.257136, 70.710842] },
    { markerOffset: -20, coordinates: [46.199992, 50.028917] },
    { markerOffset: 30, coordinates: [-50.896047, -14.997852] },
    { markerOffset: -20, coordinates: [-65.671531, 63.990418] },
    { markerOffset: -20, coordinates: [-133.216601, 67.453869] },
  ];
  return (
    <Box sx={{alignContent:'center'}}>
      <ComposableMap
        height={500}
        width={25}
        viewBox="0 0 100 450"
        style={{
          borderRadius: 6,
          width: '100%',
          background: palette.primary[50],
          height: 212,
          userSelect: 'none' /* Disable text selection */,
          pointerEvents: 'none' /* Ignore pointer events */,
        }}
      >
        <Geographies
          geography={country}
          style={{
            borderWidth: 1,
            //width: '100%',
            fill: palette.gray[50], // Change fill color based on country code
            stroke: '#FFFFFF', // Outline color
            strokeWidth: 0.2, // Outline width
          }}
        >
          {({ geographies }) => geographies.map((geo) => <Geography key={geo.rsmKey} geography={geo} />)}
        </Geographies>
        {markers.map(({ name, coordinates, markerOffset }) => (
          <Marker key={name} coordinates={coordinates} id={name}>
            <circle r={15} fill="rgb(101, 208, 152)" stroke={'#8dd6b2'} strokeWidth={8} />
            {/* <text
            textAnchor="middle"
            y={markerOffset}
            style={{ fontFamily: "system-ui", fill: "#5D5A6D" }}
          >
            {name}
          </text> */}
          </Marker>
        ))}
      </ComposableMap>
    </Box>
  );
}
