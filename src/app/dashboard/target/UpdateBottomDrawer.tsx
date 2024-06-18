import React, { useState } from 'react';
import { Label } from '@mui/icons-material';
import CloseIcon from '@mui/icons-material/Close';
import {
  Box,
  Drawer,
  FormControl,
  Grid,
  IconButton,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@mui/material';
import Card from '@mui/material/Card';
import Slide from '@mui/material/Slide';
import { useDispatch, useSelector } from 'react-redux';

import { body, FooterBody, FooterBox, header, HeaderBody } from '@/styles/theme/Bottom-drawer';
import { Filter } from '@/styles/theme/Filter';
import { Button } from '@/components/commun/Button';
import { Target } from '@/types/target';

interface BottomDrawerProps {
  open: boolean;
  onClose: () => void;
  target : Target
  onUpdateTarget: (target: Target) => void; // Function to handle task creation
}

const UpdateBottomDrawer: React.FC<BottomDrawerProps> = ({ open, onClose, onUpdateTarget  , target}) => {
  //const { target } = useSelector((state: any) => state.target);
  console.log("bottom target")
  const [updatedTarget, setupdatedTarget] = useState<Target>({...target , baseToTargetYear:target.baseYear+'-'+target.targetYear});
  const dispatch = useDispatch();
  const [error, setError] = useState(false);
  const handleUpdateTarget = () => {
    console.log('update')
    onUpdateTarget(updatedTarget);
    //setupdatedTarget('');
    //onClose();
  };

  const handleChange = (name: string, event: any) => {
    const regex = /^\d{4}-\d{4}$/;
    if (name == 'baseToTargetYear') {
      console.log('see year to ' + event);
      if (!regex.test(event)) {
        setError(true);
        setupdatedTarget({ ...updatedTarget, [name]: event });
      } else {
        const newString = event?.split('-');
        console.log('Update new string '+ newString[0])
        setupdatedTarget({ ...updatedTarget, baseYear: newString[0], targetYear: newString[1] , [name]: event });
        setError(false);
      }
    }else{
      setupdatedTarget({ ...updatedTarget, [name]: event });
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
              Update Target{' '}
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
                <Typography variant="h5">Update target </Typography>
                <Typography variant="body2">Update existant target </Typography>
              </Grid>
              <Typography variant="subtitle2">Target Name</Typography>
              <TextField
                label="Target Name"
                value={updatedTarget.name}
                onChange={(e) => handleChange('name', e.target.value)}
                //onChange={(e) => setNewTask(e.target.value)}
                margin="normal"
                fullWidth
              />
              <Typography variant="subtitle2">Target Type</Typography>
              <FormControl fullWidth>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={updatedTarget.type}
                  onChange={(e) => handleChange('type', e.target.value)}
                  label="Select"
                >
                  <MenuItem value="Company">Company</MenuItem>
                  <MenuItem value="Intensity">Intensity</MenuItem>
                  <MenuItem value="Facility">Facility</MenuItem>
                </Select>
              </FormControl>
              <Typography variant="subtitle2">Emission Reduction Target</Typography>
              <TextField
                label="Emission"
                value={updatedTarget.emissionReduction}
                onChange={(e) => handleChange('emissionReduction', e.target.value)}
                margin="normal"
                fullWidth
              />
              <Typography variant="subtitle2">Base To Target Year</Typography>
              <TextField
                label="Base To Target Year"
                value={updatedTarget.baseToTargetYear}
                onChange={(e) => handleChange('baseToTargetYear', e.target.value)}
                margin="normal"
                error={error}
                placeholder="YYYY - YYYY"
                fullWidth
              />
            </Grid>
          </Grid>
          <Grid sx={FooterBox}>
            <Grid sx={FooterBody}>
              <Button btnType={'secondary'} onClick={ () => onClose()} >
                Cancel
              </Button>

              <Button variant="contained" color="primary" onClick={ handleUpdateTarget }>
                Confirm
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Slide>
    </Drawer>
  );
};

export default UpdateBottomDrawer;
