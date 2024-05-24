import React from 'react';
import { Box, Button, Container,Stack,Grid,Typography,OutlinedInput,InputAdornment, TextField, List, ListItem, ListItemText } from '@mui/material';
import Map from './MapLocation';
import LocationList from './LocationList';
import { MagnifyingGlass as MagnifyingGlassIcon } from '@phosphor-icons/react/dist/ssr/MagnifyingGlass';
import {PlusIcon,ExportIcon} from '@/icons';
import { MuiButton } from '@/styles/theme/components/button';
import { boxFilterDropDown, Filter, outlinedInput } from '@/styles/theme/Filter';

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
   /*  <Container maxWidth="xl" style={{ height: '100vh', display: 'flex', flexDirection: 'row', padding: 0 }}>
      <Box sx={{ width: '30%', padding: 2, boxShadow: 3 }}>
         
        <Button variant="contained" onClick={addLocation} fullWidth>
          Add New Location
        </Button>
        <OutlinedInput
        defaultValue=""
        placeholder="Search for anything..."
        startAdornment={
          <InputAdornment position="start">
            <MagnifyingGlassIcon fontSize="var(--icon-fontSize-md)" />
          </InputAdornment>
        }
        sx={outlinedInput}
      />
        <LocationList locations={initlocations} />  
      </Box>
       <Box sx={{ width: '70%', padding: 2 }}>
        <Map />
      </Box> 
    </Container> */


    <Stack spacing={6} sx={{ height: '80vh', overflowY: 'auto' }}>
    <Grid container alignItems="center" >
     <Grid item xs={12} sm={6} md={4} lg={3} direction="column" justifyContent="space-between">
       <Typography variant="h5"   sx={{ color: 'var(--Gray-900, #101828)' }}>
       Locations
       </Typography>
       <Button
     btnType="Primary"
     sx={{
       ...MuiButton.styleOverrides.sizeSmall,
       borderRadius: "6px",
       justifyContent: 'flex-end',
       background: "var(--Green-green-500, #16B364)",
     }}

     onClick={()=>{}}
     startIcon={<PlusIcon fontSize="var(--icon-fontSize-sm)" />}  
   >
     <Typography variant="h7" 
     sx={{ color: "var(--Colors-Base-00, #FFF)" }}
     >
       Add Location
     </Typography>
   </Button>
     </Grid> 
     
   

    
    
 
 
  
</Grid>

  
     
   
  
   </Stack>
  );
};

export default CompanyLocation;
