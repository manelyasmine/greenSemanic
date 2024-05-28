import React from 'react';
import { Paper, Box, Button, ListItemIcon, ListItemSecondaryAction, Stack, Grid, Typography, OutlinedInput, InputAdornment, TextField, List, ListItem, ListItemText } from '@mui/material';
import MapLocation from './MapLocation';
import LocationList from './LocationList';
import { MagnifyingGlass as MagnifyingGlassIcon } from '@phosphor-icons/react/dist/ssr/MagnifyingGlass';
import { PlusIcon, ExportIcon } from '@/icons';
import { MuiButton } from '@/styles/theme/components/button';
import { boxFilterDropDown, Filter, outlinedInput } from '@/styles/theme/Filter';
import { styled } from '@mui/material/styles';
import { LocalizationHeadIcon, LocalizationIcon, ModifyIcon, DeleteIcon } from '@/icons';
import DeleteConfirmation from '@/components/commun/Alerts/DeleteConfirmation';

import { palette } from '@/styles/theme/colors';
 
const initlocations = [
  {
    id: 1,
    head: 1,
    name: "Location 01",
    location: "1901 Thornridge Cir. Shiloh, Hawaii 81063",
  },
  {
    id: 2,
    head: 0,
    name: "Location 01",
    location: "1901 Thornridge Cir. Shiloh, Hawaii 81063",
  },
  {
    id: 3,
    head: 0,
    name: "Location 01",
    location: "1901 Thornridge Cir. Shiloh, Hawaii 81063",
  }
]

const CompanyLocation: React.FC = () => {
  const [locations, setLocations] = React.useState<string[]>([]);
  const [search, setSearch] = React.useState<string>('');
  const [isOpen,setIsOpen]=React.useState<string>('');
  const addLocation = () => {
    // Implement location adding logic
   /*  const newLocation = prompt("Enter a new location:");
    if (newLocation) {
      setLocations([...locations, newLocation]);
    } */
    setIsOpen(true);
  };

  const filteredLocations = locations.filter(location =>
    location.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Grid container spacing={1}>
      <Grid item xs={12} md={4}>
       
           
            <Box container justifyContent="space-between"
              sx={{
                display: 'flex',
                padding: '2rem 0rem',
                flexDirection: 'row',
                alignItems: 'flex-start',
                gap: '2rem',
                flex: '1 0 0',
              }}
            >
              <Typography variant="h5" sx={{ color: 'var(--Gray-900, #101828)' }}>
                Locations
              </Typography>
              <Button
                btnType="Primary"
                startIcon={<PlusIcon />}
                sx={{
                  ...MuiButton.styleOverrides.sizeSmall,
                  borderRadius: "6px",
                  justifyContent: 'flex-end',
                  background: "var(--Green-green-500, #16B364)",
                }}
                onClick={addLocation}
              >
                <Typography variant="h7" sx={{ display: "flex", justifyContent: "flex-end", color: "var(--Colors-Base-00, #FFF)" }}>
                  Add Location
                </Typography>
              </Button>
            </Box>
            {isOpen && (
          <DeleteConfirmation
          open={isOpen}
          setOpen={setIsOpen} 
          title='Do you want to add this location?'
          subtitle='Are you sure you want to add location to company locations.'
          primary='Confirm'
          secondary='Cancel'
          primaryColor={{ backgroundColor: 'var(--Green-green-500, #16B364)' }}
          />
      )}
          <OutlinedInput
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search for anything..."
            startAdornment={
              <InputAdornment position="start">
                <MagnifyingGlassIcon fontSize="var(--icon-fontSize-md)" />
              </InputAdornment>
            }
            sx={{
              display: 'flex',
              width: '100%',
              padding: "var(--12, 0.75rem) 1rem",
              alignItems: "center",
              gap: "0.5rem"
            }}
          />
          <List>
            {initlocations.map(location => (
              <ListItem key={location.id} sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                flex: '1 0 0',
              }}>
                <ListItemText primary={location.name}
                  primaryTypographyProps={{ variant: 'bodyB2', color: 'var(--Green-green-700, #087443)' }} />
                {location.head == 1 ?
                  <ListItemIcon>
                    <LocalizationHeadIcon />
                    <ListItemText secondary={location.location}
                      secondaryTypographyProps={{ variant: 'bodyP3', color: 'var(--Green-green-600, #14A35B)' }}
                    />
                  </ListItemIcon>
                  :
                  <ListItemIcon>
                    <LocalizationIcon />
                    <ListItemText secondary={location.location}
                      primaryTypographyProps={{ variant: 'bodyP3', color: 'var(--Green-green-600, #14A35B)' }}
                      secondaryTypographyProps={{ variant: 'bodyP3', color: 'var(--Green-green-600, #14A35B)' }}
                    />
                  </ListItemIcon>
                }
                <ListItemSecondaryAction sx={{ justifyContent: "flex-end", display: 'flex' }}>
                  <Button aria-label="modify" sx={{ display: 'contents' }}>
                    <ModifyIcon />
                  </Button>
                  <Button aria-label="delete" sx={{ display: 'contents' }}>
                    <DeleteIcon />
                  </Button>
                </ListItemSecondaryAction>
              </ListItem>
            ))}
          </List>
         
      </Grid>
      <Grid item xs={12} md={7}>
        <Box sx={{ height: '70%', width: '50%', position: "absolute" }}>
          <MapLocation />
        </Box>
      </Grid>
    </Grid>
  );
};

export default CompanyLocation;
