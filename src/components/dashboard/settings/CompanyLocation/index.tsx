import React from 'react';
import { Paper,Box, Button, Container,Stack,Grid,Typography,OutlinedInput,InputAdornment, TextField, List, ListItem, ListItemText } from '@mui/material';
import Map from './MapLocation';
import LocationList from './LocationList';
import { MagnifyingGlass as MagnifyingGlassIcon } from '@phosphor-icons/react/dist/ssr/MagnifyingGlass';
import {PlusIcon,ExportIcon} from '@/icons';
import { MuiButton } from '@/styles/theme/components/button';
import { boxFilterDropDown, Filter, outlinedInput } from '@/styles/theme/Filter';
import { styled } from '@mui/material/styles';
 
 

const initlocations=[
  {
    id :1,
    name:"Location 01",
    location:"1901 Thornridge Cir. Shiloh, Hawaii 81063",
  },
  {
    id :2,
    name:"Location 01",
    location:"1901 Thornridge Cir. Shiloh, Hawaii 81063",
  },
  {
    id :3,
    name:"Location 01",
    location:"1901 Thornridge Cir. Shiloh, Hawaii 81063",
  }
]
const CompanyLocation: React.FC = () => {
  const [locations, setLocations] = React.useState<string[]>([]);
  const [search, setSearch] = React.useState<string>('');

  const addLocation = () => {
    // Implement location adding logic
    const newLocation = prompt("Enter a new location:");
    if (newLocation) {
      setLocations([...locations, newLocation]);
    }
  };

  const filteredLocations = locations.filter(location =>
    location.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Stack container spacing={2} direction="row">
    <Grid item xs={6}>

      <Box  >
      <Box  >
      <Box    container justifyContent="space-between"
         sx={{display: 'flex',
         alignItems: 'flex-start',
         gap: '2rem',
         backgroundColor:"yellow"
         }}
        >
        <Typography variant="h5" sx={{ color: 'var(--Gray-900, #101828)' }}>
          Locations
        </Typography>
        <Button 
          btnType="Primary"
          startIcon={<PlusIcon   />} 
          sx={{
            ...MuiButton.styleOverrides.sizeSmall,
            borderRadius: "6px",
            justifyContent: 'flex-end',
            background: "var(--Green-green-500, #16B364)",
          }}>
          <Typography variant="h7" sx={{display:"flex",justifyContent:"flex-end", color: "var(--Colors-Base-00, #FFF)" }} onClick={addLocation}>
            Add Location
          </Typography>
        </Button>
        </Box>
        </Box>
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
            <ListItem key={location.id}>
              <ListItemText primary={location.name} secondary={location.location} />
            </ListItem>
          ))}
        </List>
       
      </Box>
    </Grid>
    <Grid item xs={8}>
      <Map  sx={{width:"100px",height:"100px"}} />
    </Grid>
  </Stack>
  );
};

export default CompanyLocation;
