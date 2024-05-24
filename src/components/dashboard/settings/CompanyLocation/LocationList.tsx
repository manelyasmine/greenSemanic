import React from 'react';
import { List, ListItem, ListItemText } from '@mui/material';

interface Location {
  id: number;
  name: string;
  location: string;
}

interface LocationListProps {
  locations: Location[];
}

const LocationList: React.FC<LocationListProps> = ({ locations }) => {
  return (
    <List>
      {locations.map((location) => (
        <ListItem key={location.id}>
          <ListItemText primary={location.name} secondary={location.location} />
        </ListItem>
      ))}
    </List>
  );
};

export default LocationList;
