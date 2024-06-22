import React, { useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import {
  ButtonGroup,
  FormControl,
  Grid,
  IconButton,
  MenuItem,
  Modal,
  Select,
  TextField,
  Typography,
} from '@mui/material';
import Box from '@mui/material/Box';

import { Button } from '@/components/commun/Button';
import { palette } from '@/styles/theme/colors';

import countriesjson from '../../../data/countries_cities.json';

interface AddLocationModalProps {
  onClose: () => void;
  handleUpdate: any;
  open: boolean;
  locationToUpdate: object
}

const UpdateLocationModal: React.FC<AddLocationModalProps> = ({ open, onClose, handleUpdate, locationToUpdate }) => {
  const handleClose = () => onClose();
  const [location, setLocation] = useState(locationToUpdate);
  const handleChange = (name: string, value: any) => {
    setLocation({ ...location, [name]: value });
  };
  const onUpdate = () => {
    handleUpdate(location);
  };
  return (
    <Modal open={open} onClose={onClose} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Box
        sx={{
          //position: 'absolute',
          // top: '40%',
          // left: '40%',
          display: 'flex',
          padding: '1.5rem',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'flex-start',

          borderRadius: '0.375rem',
          background: palette.common.white,
          gap: '1.5rem',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '24px' }}>
          <Typography variant="h4">Do you want to Update this location?</Typography>
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{ justifyContent: 'flex-end', marginBottom: '1.5rem', marginLeft: '16px' }}
          >
            <CloseIcon />
          </IconButton>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Typography variant="bodyP2" sx={{ justifyContent: 'flex-start' }}>
            Are you sure you want to Update location to company locations
          </Typography>

          {/* <Typography variant="subtitle2">Category</Typography>
          <FormControl fullWidth>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={dataToSend?.category}
              onChange={(e) => handleChange('category', e.target.value)}
              label="Select"
            >
              {category && category.map((cat) => <MenuItem value={cat.value}>{cat.label}</MenuItem>)}
            </Select>
          </FormControl> */}
        </Box>
        <Box flexDirection={'row'} sx={{ width: '100%' }}>
          <Typography variant="subtitle2">Address</Typography>
          <FormControl fullWidth>
            <TextField
              value={location?.address}
              onChange={(e) => handleChange('address', e.target.value)}
              margin="normal"
              fullWidth
            />
          </FormControl>
        </Box>
        <Box flexDirection={'row'} sx={{ width: '100%' }}>
          <Typography variant="subtitle2">city</Typography>
          <FormControl fullWidth>
            <TextField
              value={location?.city}
              onChange={(e) => handleChange('city', e.target.value)}
              margin="normal"
              fullWidth
            />
          </FormControl>
        </Box>

        <Box flexDirection={'row'} sx={{ width: '100%' }}>
          <Typography variant="subtitle2">Country</Typography>
          <FormControl fullWidth>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={location?.country}
              onChange={(e) => handleChange('country', e.target.value)}
              label="Select"
            >
              {countriesjson &&
                Object.keys(countriesjson).map((country) => <MenuItem value={country}>{country}</MenuItem>)}
            </Select>
          </FormControl>
        </Box>
        <Box flexDirection={'row'} sx={{ width: '100%' }}>
          <Typography variant="subtitle2">state</Typography>
          <FormControl fullWidth>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={location?.state}
              onChange={(e) => handleChange('state', e.target.value)}
              label="Select"
            >
              {location && location.country &&
                countriesjson &&
               countriesjson[location.country].map((state) => <MenuItem value={state}>{state}</MenuItem>)}
            </Select>
          </FormControl>
        </Box>

        <Box flexDirection={'row'} sx={{ width: '100%' }}>
          <Typography variant="subtitle2">Postal code</Typography>
          <FormControl fullWidth>
            <TextField
              value={location?.postalCode}
              onChange={(e) => handleChange('postalCode', e.target.value)}
              margin="normal"
              fullWidth
            />
          </FormControl>
        </Box>
        <Box
          sx={{
            //paddingTop: '1.5rem',
            //paddingBottom: '1.5rem',
            display: 'flex',
            justifyContent: 'flex-end',
            alignItems: 'flex-end',
            gap: 'var(--12, 0.75rem)',
            alignSelf: 'stretch',
          }}
        >
          <Button
            btnType="secondaryGray"
            sx={{
              color: 'color: var(--Grey-grey-600, #606977)',
              backgroundColor: 'var(--Colors-Base-00, #FFF)',
              fontWeight: 700,
            }}
            onClick={handleClose}
          >
            Cancel
          </Button>
          <Button
            btnType="primary"
            // sx={{...primaryColor,
            //   borderRadius: '0.375rem',
            //   color: palette.common.white,

            //   fontWeight: 700,
            // }}
            onClick={onUpdate}
          >
            Confirm
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default UpdateLocationModal;
