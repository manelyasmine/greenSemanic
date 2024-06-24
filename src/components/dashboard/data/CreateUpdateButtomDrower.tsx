import React, { useEffect, useState } from 'react';
import { ShareIcon, VectorICon } from '@/icons';
import { Label } from '@mui/icons-material';
import CloseIcon from '@mui/icons-material/Close';
import {
  Box,
  Divider,
  Drawer,
  FormControl,
  Grid,
  IconButton,
  Input,
  MenuItem,
  Select,
  Stack,
  Step,
  StepLabel,
  Stepper,
  TextField,
  Typography,
} from '@mui/material';
import Slide from '@mui/material/Slide';
import { MobileDatePicker } from '@mui/x-date-pickers';
import { DemoItem } from '@mui/x-date-pickers/internals/demo';
import dayjs from 'dayjs';
import { useDispatch, useSelector } from 'react-redux';

import { Data } from '@/types/data';
import { category } from '@/types/forms';
import { calculateDATA } from '@/lib/helper';
import { Button } from '@/components/commun/Button';
import { body, FooterBody, FooterBox, header, HeaderBody } from '@/styles/theme/Bottom-drawer';

import countryjson from '../../../data/country.json';

interface ExportStep1Props {
  open: boolean;
  onClose: () => void;
  title: string;
  subTitle: string;
  action: 'create' | 'update';
  onAction: (data: Data) => void; // Function to handle task creation
}

const countries = countryjson.objects.countries.geometries.map((geometry) => geometry.properties.name);

const CreateUpdateButtomDrower: React.FC<ExportStep1Props> = ({ open, onClose, onAction, title, subTitle, action }) => {
  // const { data } = useSelector((state: any) => state.file);
  const { selectedRow, dataDB } = useSelector((state: any) => state.file);

  const defaultData = action == 'create' ? {} : selectedRow;

  const [dataToSend, setDataToSend] = useState(selectedRow);
  const dispatch = useDispatch();
  const [error, setError] = useState(false);
  useEffect(() => {
    if (action == 'update') setDataToSend(selectedRow);
  }, [selectedRow]);
  const handleChange = (name: string, event: any) => {
    if (dataToSend &&  dataToSend.date && dataToSend.category && dataToSend.location) { 
      const dateExt = dayjs(dataToSend.date)
      const {emission_tracker , scope1 , scope2, scope3} = calculateDATA(dataDB, dayjs(dataToSend.date).year(), dataToSend.category, dataToSend.location)
      console.log('herejenjke'+dateExt.year())
      setDataToSend({
        ...dataToSend,
        [name]: event,
        emission_tracker,
        scope1,
        scope2,
        scope3
      });
    } else {
      setDataToSend({ ...dataToSend, [name]: event });
    }
  };

  return (
    <Drawer anchor="bottom" open={open} onClose={onClose}>
      <Slide direction="up" in={open} mountOnEnter unmountOnExit>
        <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
          <Box sx={header}>
            <Typography
              variant="h4"
              sx={{
                color: 'var(--Foundation-Grey-grey-700, #121417)',
                fontFeatureSettings: '"cv04" on, "cv03" on, "cv02" on, "cv11" on, "clig" off, "liga" off',
              }}
            >
              {' '}
              {title}
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              {/* <Typography variant="help">need help?</Typography> */}
              <IconButton onClick={onClose} sx={{ marginLeft: 8 }}>
                <CloseIcon />
              </IconButton>
            </Box>
          </Box>
          <Grid sx={body}>
            <Grid sx={{ width: '80%' }}>
              <Grid sx={HeaderBody}>
                <Typography variant="h5">{title} </Typography>
                <Typography variant="body2">{subTitle}</Typography>
              </Grid>
              {/* <Typography variant="subtitle2">Date</Typography> */}
              <DemoItem label="Date">
                <MobileDatePicker
                  defaultValue={dayjs(dataToSend?.date)}
                  onChange={(value) => handleChange('date', value)}
                />
              </DemoItem>

              <Typography variant="subtitle2">Location</Typography>
              <FormControl fullWidth>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={dataToSend?.location}
                  onChange={(e) => handleChange('location', e.target.value)}
                  label="Select"
                >
                  {countries && countries.map((country) => <MenuItem value={country}>{country}</MenuItem>)}
                </Select>
              </FormControl>

              <Typography variant="subtitle2">Category</Typography>
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
              </FormControl>

              <Typography variant="subtitle2">Quantity</Typography>
              <TextField
                label="quantity"
                value={dataToSend?.quantity}
                onChange={(e) => handleChange('quantity', e.target.value)}
                margin="normal"
                fullWidth
              />

              <Typography variant="subtitle2">Emission Tracker</Typography>
              <TextField
                disabled
                value={dataToSend?.emission_tracker}
                onChange={(e) => handleChange('emission_tracker', e.target.value)}
                margin="normal"
                fullWidth
              />
            </Grid>
          </Grid>
          <Grid sx={FooterBox}>
            <Grid sx={FooterBody}>
              <Button btnType={'secondary'} onClick={() => onClose()}>
                Cancel
              </Button>

              <Button variant="contained" color="primary" onClick={() => onAction(dataToSend)}>
                Confirm
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Slide>
    </Drawer>
  );
};

export default CreateUpdateButtomDrower;
