import React, { useEffect } from 'react';
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
import { useDispatch, useSelector } from 'react-redux';

import { companyApis } from '@/lib/company/companyApis';
import { addLocation, setLocations, updateLocation } from '@/lib/store/reducer/useCompany';
import { setOpenToast } from '@/lib/store/reducer/useGlobalActions';
import DeleteConfirmation from '@/components/commun/Alerts/DeleteConfirmation';
import AddLocationModal from '@/components/commun/Modal/AddLocationModal';
import DeleteModal from '@/components/commun/Modal/DeleteModal';
import { palette } from '@/styles/theme/colors';
import { MuiButton } from '@/styles/theme/components/button';
import { boxFilterDropDown, Filter, outlinedInput } from '@/styles/theme/Filter';

import LocationList from './LocationList';
import MapLocation from './MapLocation';
import UpdateLocationModal from '@/components/commun/Modal/UpdateLocationModal';

// const initlocations = [
//   {
//     id: 1,
//     head: 1,
//     name: 'Location 01',
//     location: '1901 Thornridge Cir. Shiloh, Hawaii 81063',
//   },
//   {
//     id: 2,
//     head: 0,
//     name: 'Location 01',
//     location: '1901 Thornridge Cir. Shiloh, Hawaii 81063',
//   },
//   {
//     id: 3,
//     head: 0,
//     name: 'Location 01',
//     location: '1901 Thornridge Cir. Shiloh, Hawaii 81063',
//   },
// ];

const CompanyLocation: React.FC = () => {
  // const [locations, setLocations] = React.useState<string[]>([]);
  const [search, setSearch] = React.useState<string>('');
  const [isOpen, setIsOpen] = React.useState(false);
  const [isOpenDelete, setIsOpenDelete] = React.useState(false);
  const [isOpenUpdate, setIsOpenUpdate] = React.useState(false);

  const { company, locations } = useSelector((state: any) => state.company);

  const dispatch = useDispatch();

  const getLocations = React.useCallback(async (): Promise<void> => {
    const { error, res } = await companyApis.getLocations(company._id);
    if (error) {
      return;
    }
    dispatch(setLocations(res));
  }, []);

  // const filteredLocations = locations.filter((location) => location.toLowerCase().includes(search.toLowerCase()));
  useEffect(() => {
    getLocations();
  }, [getLocations]);

  const createLocation = React.useCallback(async (location: any): Promise<void> => {
    const { error, res } = await companyApis.addLocation(company._id, location);
    if (error) {
      dispatch(setOpenToast({ message: error, type: 'error' }));
      return;
    }
    dispatch(setOpenToast({ message: 'Location Added Successfully', type: 'success' }));
    setIsOpen(false);
    dispatch(addLocation(location));
  }, []);

  const handleDelete = React.useCallback(
    async (location): Promise<void> => {
      const { error, res } = await companyApis.deleteLocation(company._id, location._id);
      if (error) {
        dispatch(setOpenToast({ message: error, type: 'error' }));
        return;
      }
      dispatch(setOpenToast({ message: 'Location Deleted Successfully', type: 'success' }));
      const indexToRemove = locations.indexOf(location);
      console.log(locations);
      console.log({ locations });
      console.log(indexToRemove);
      const newLocation = locations.filter((_: any, i: any) => i !== indexToRemove);
      console.log({ newLocation });
      dispatch(setLocations(newLocation));
      setIsOpenDelete(false);
      return;
    },
    [locations]
  );

  const handleUpdate = React.useCallback(
    async (location): Promise<void> => {
      const { error, res } = await companyApis.updateLocation(company._id, location);
      if (error) {
        dispatch(setOpenToast({ message: error, type: 'error' }));
        return;
      }
      dispatch(setOpenToast({ message: 'Location Updated Successfully', type: 'success' }));
      dispatch(updateLocation(location));
      setIsOpenUpdate(false);
      return;
    },
    [locations]
  );

  return (
    <Grid container spacing={1}>
      <Grid item xs={12} md={4}>
        <Box
          container
          justifyContent="space-between"
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
              borderRadius: '6px',
              justifyContent: 'flex-end',
              background: 'var(--Green-green-500, #16B364)',
            }}
            onClick={() => setIsOpen(true)}
          >
            <Typography
              variant="h7"
              sx={{ display: 'flex', justifyContent: 'flex-end', color: 'var(--Colors-Base-00, #FFF)' }}
            >
              Add Location
            </Typography>
          </Button>
        </Box>
        {isOpen && <AddLocationModal open={isOpen} onClose={() => setIsOpen(false)} handleCreate={createLocation} />}
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
            padding: 'var(--12, 0.75rem) 1rem',
            alignItems: 'center',
            gap: '0.5rem',
          }}
        />
        <List>
          {locations.map((location, index) => (
            <ListItem
              key={location.id}
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                flex: '1 0 0',
              }}
            >
              <ListItemText
                primary={'Locations ' + (index + 1)}
                primaryTypographyProps={{ variant: 'bodyB2', color: 'var(--Green-green-700, #087443)' }}
              />
              {location.head == 1 ? (
                <ListItemIcon>
                  <LocalizationHeadIcon />
                  <ListItemText
                    secondary={location.address}
                    secondaryTypographyProps={{ variant: 'bodyP3', color: 'var(--Green-green-600, #14A35B)' }}
                  />
                </ListItemIcon>
              ) : (
                <ListItemIcon>
                  <Stack direction={'row'} alignItems={'center'}>
                    <LocalizationIcon />
                    <ListItemText
                      secondary={location.postalCode + ' ' + location.address}
                      primaryTypographyProps={{ variant: 'bodyP3', color: 'var(--Green-green-600, #14A35B)' }}
                      secondaryTypographyProps={{ variant: 'bodyP3', color: 'var(--Green-green-600, #14A35B)' }}
                    />
                  </Stack>
                </ListItemIcon>
              )}
              {isOpenUpdate && (
                <UpdateLocationModal open={isOpenUpdate} onClose={() => setIsOpenUpdate(false)} handleUpdate={handleUpdate} locationToUpdate={location} />
              )}

              {isOpenDelete && (
                <DeleteModal
                  open={isOpenDelete}
                  onClose={() => setIsOpenDelete(false)}
                  handleDelete={() => handleDelete(location)}
                  title={'Do you want to delete this?'}
                  subtitle={undefined}
                />
              )}
              <ListItemSecondaryAction sx={{ justifyContent: 'flex-end', display: 'flex' }}>
                <Stack direction={'row'} spacing={2}>
                  <Button aria-label="modify" sx={{ display: 'contents' }} onClick={() => setIsOpenUpdate(true)}>
                    <ModifyIcon />
                  </Button>
                  <Button aria-label="delete" sx={{ display: 'contents' }} onClick={() => setIsOpenDelete(true)}>
                    <DeleteIcon />
                  </Button>
                </Stack>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
      </Grid>
      <Grid item xs={12} md={7}>
        <Box sx={{ height: '70%', width: '50%', position: 'absolute' }}>
          <MapLocation />
        </Box>
      </Grid>
    </Grid>
  );
};

export default CompanyLocation;
