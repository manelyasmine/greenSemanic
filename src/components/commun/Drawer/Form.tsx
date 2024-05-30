import React, { useState } from 'react';
import { Label } from '@mui/icons-material';
import CloseIcon from '@mui/icons-material/Close';
import {
  Box,
  Button,
  Drawer,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@mui/material';
import Card from '@mui/material/Card';
import Divider from '@mui/material/Divider';
import Slide from '@mui/material/Slide';

import { body, header, HeaderBody } from '@/styles/theme/Bottom-drawer';
import { Filter } from '@/styles/theme/Filter';

interface FormTarget {
  name?: string;
  type?: string;
  emissionReduction?: string;
  baseToTargetYear?: string;
}
interface FormProps {
  newTarget: FormTarget;
  setNewTarget: any;
  // onClose: () => void;
  // onCreateTask: (task: string) => void; // Function to handle task creation
}

const Form: React.FC<FormProps> = ({ newTarget, setNewTarget }) => {
  const [error, setError] = useState(false);
  const handleChange = (name: string, event: any) => {
    const regex = /^\d{4}-\d{4}$/;
    if (name == 'baseToTargetYear') {
      console.log('see year to ' + event);
      if (!regex.test(event)) {
        setError(true);
        setNewTarget({ ...newTarget, [name]: event });
      } else {
        const newString = event?.split('-');
        console.log('new string '+ newString[0])
        setNewTarget({ ...newTarget, baseYear: newString[0], targetYear: newString[1] , [name]: event });
        setError(false);
      }
    }else{
      setNewTarget({ ...newTarget, [name]: event });

    }
  };
  return (
    <Grid sx={body}>
      <Grid>
        <Grid sx={HeaderBody}>
          <Typography variant="h5">Create new target</Typography>
          <Typography variant="body2">
            Add a new target to further streamline your carbon emission management process.
          </Typography>
        </Grid>
        <Typography variant="subtitle2">Target Name</Typography>
        <TextField
          label="Target Name"
          value={newTarget.name}
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
            value={newTarget.type}
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
          value={newTarget.emissionReduction}
          onChange={(e) => handleChange('emissionReduction', e.target.value)}
          margin="normal"
          fullWidth
        />
        <Typography variant="subtitle2">Base To Target Year</Typography>
        <TextField
          label="Base To Target Year"
          value={newTarget.baseToTargetYear}
          onChange={(e) => handleChange('baseToTargetYear', e.target.value)}
          margin="normal"
          error={error}
          placeholder="YYYY - YYYY"
          fullWidth
        />
      </Grid>
    </Grid>
  );
};

export default Form;
