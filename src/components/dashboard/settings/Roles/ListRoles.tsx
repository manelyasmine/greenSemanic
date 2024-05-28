import React from 'react';
import { DeleteIcon, ExportIcon, LocalizationHeadIcon, LocalizationIcon, ModifyIcon, PlusIcon } from '@/icons';
import {
  Box,
  Button,
  Grid,
  InputAdornment,
  List,
  ListItem,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
  OutlinedInput,
  Paper,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { MagnifyingGlass as MagnifyingGlassIcon } from '@phosphor-icons/react/dist/ssr/MagnifyingGlass';

import DeleteConfirmation from '@/components/commun/Alerts/DeleteConfirmation';
import { palette } from '@/styles/theme/colors';
import { MuiButton } from '@/styles/theme/components/button';
import { boxFilterDropDown, Filter, outlinedInput } from '@/styles/theme/Filter';
import {CheckIcon} from '@/icons';
const initlocations = [
  {
    id: 1,
    role:'admin',
    all: 'All Admin control',
    tracking: 'View & Edit Tracking Emissions',
    tasks: 'View & Edit Tasks',
    targets: 'View & Edit Targets',
    reports: 'View & Edit Reports',
  },
  {
    id: 2,
    role:'admin1',
    all: 'All Admin control',
    tracking: 'View & Edit Tracking Emissions',
    tasks: 'View & Edit Tasks',
    targets: 'View & Edit Targets',
    reports: 'View & Edit Reports',
  },
  {
    id: 3,
    role:'role 1',
    all: 'All Admin control',
    tracking: 'View & Edit Tracking Emissions',
    tasks: 'View & Edit Tasks',
    targets: 'View & Edit Targets',
    reports: 'View & Edit Reports',
  },
];

const ListRoles: React.FC = () => {
  return (
    <Grid container spacing={2}>
      {initlocations.map((location) => (
        <Grid item key={location.id} xs={12} md={4}>
          <Paper variant="outlined">
            <List>
              <ListItem
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                  flex: '1 0 0',
                }}
              >

                <ListItemText
                  primary={location.role}  
                  primaryTypographyProps={{ variant: 'h5', color: 'var(--Green-green-700, #4F5662)' }}
                />

<ListItemIcon>
    <Box sx={{background: 'var(--Green-green-500, #16B364)', borderRadius: '22px',  display: 'flex',
    width: '16px',
    height: '16px',
    padding: '2px',
    justifyContent: 'center',
    alignItems: 'center',}}>
<CheckIcon  />
</Box>
<ListItemText
primary={location.all}  
primaryTypographyProps={{ variant: 'bodyP3', color: 'var(--Green-green-500, #727C8D)' }}
/>
</ListItemIcon>
<ListItemIcon>
    <Box sx={{background: 'var(--Green-green-500, #16B364)', borderRadius: '22px',  display: 'flex',
    width: '16px',
    height: '16px',
    padding: '2px',
    justifyContent: 'center',
    alignItems: 'center',}}>
<CheckIcon  />
</Box>
                  <ListItemText
                  primary={location.tracking}
                  primaryTypographyProps={{ variant: 'bodyP3', color: 'var(--Green-green-500, #727C8D)' }}
               
                />
                </ListItemIcon>
                <ListItemIcon>
    <Box sx={{background: 'var(--Green-green-500, #16B364)', borderRadius: '22px',  display: 'flex',
    width: '16px',
    height: '16px',
    padding: '2px',
    justifyContent: 'center',
    alignItems: 'center',}}>
<CheckIcon  />
</Box>
                <ListItemText
                      primary={location.tasks}    
                     
                      primaryTypographyProps={{ variant: 'bodyP3', color: 'var(--Green-green-500, #727C8D)' }}
               />
               </ListItemIcon>
               <ListItemIcon>
    <Box sx={{background: 'var(--Green-green-500, #16B364)', borderRadius: '22px',  display: 'flex',
    width: '16px',
    height: '16px',
    padding: '2px',
    justifyContent: 'center',
    alignItems: 'center',}}>
<CheckIcon  />
</Box>
                    <ListItemText
                      primary={location.reports} 
                      primaryTypographyProps={{ variant: 'bodyP3', color: 'var(--Green-green-500, #727C8D)' }}
               
                    />
                    </ListItemIcon>
                    <ListItemIcon>
    <Box sx={{background: 'var(--Green-green-500, #16B364)', borderRadius: '22px',  display: 'flex',
    width: '16px',
    height: '16px',
    padding: '2px',
    justifyContent: 'center',
    alignItems: 'center',}}>
<CheckIcon  />
</Box>
                    <ListItemText
                      primary={location.targets}
                      primaryTypographyProps={{ variant: 'bodyP3', color: 'var(--Green-green-500, #727C8D)' }}
               
               />
                   </ListItemIcon>
                <ListItemSecondaryAction sx={{ justifyContent: 'flex-end', display: 'flex',top:"14%" }}>
                  <Button aria-label="modify" sx={{ display: 'contents' }}>
                    <ModifyIcon />
                  </Button>
                  <Button aria-label="delete" sx={{ display: 'contents' }}>
                    <DeleteIcon />
                  </Button>
                </ListItemSecondaryAction>
              </ListItem>
            </List>
          </Paper>
        </Grid>
      ))}
    </Grid>
  );
};

export default ListRoles;
