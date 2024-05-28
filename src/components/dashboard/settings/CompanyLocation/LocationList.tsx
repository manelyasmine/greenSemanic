import React from 'react';
import { List, ListItem, ListItemText,ListItemIcon, ListItemSecondaryAction, IconButton } from '@mui/material';
import { LocalizationHeadIcon, LocalizationIcon } from '@/icons'; 

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
        <ListItem
          key={location.id}
          sx={{
            alignItems: 'flex-start',
            display: 'flex',
            flexDirection: 'column',
            background: 'red',
            mb: 2,
            borderRadius: '8px',
            padding: '8px',
          }}
        >
          
       {/*    <ListItemText primary={location.name} secondary={location.location}   />
       */}  <ListItemIcon> <LocalizationIcon  /> </ListItemIcon>
        </ListItem>
      ))}
        
    </List>
  );
};

export default LocationList;
