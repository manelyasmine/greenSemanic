import React from 'react';
import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api';

const mapContainerStyle = {
  width: '100%',
  height: '100%'
};

const center = {
  lat: -3.745,
  lng: -38.523
};

const MapLocation: React.FC = () => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "5-_SBti_T8mI6TNx42wt6URCo7WUlUK-IDF0wQXNLhg"
  });

  if (loadError) return <div>Error loading maps</div>;
  if (!isLoaded) return <div>Loading Maps</div>;

  return (
    <GoogleMap mapContainerStyle={mapContainerStyle} center={center} zoom={8}>
      <Marker position={center} />
    </GoogleMap>
  );
};

export default MapLocation;
