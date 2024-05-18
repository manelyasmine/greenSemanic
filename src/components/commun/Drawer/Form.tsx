import React, { useState } from 'react';
import {
  Box,
  Button,
  Drawer,
  Grid,
  IconButton,
  
  TextField,
  Typography,
} from '@mui/material';

import Divider from '@mui/material/Divider';
import { Label } from '@mui/icons-material';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import {  Filter,  } from '@/styles/theme/Filter';
import {header,body,HeaderBody} from '@/styles/theme/Bottom-drawer';
import Card from '@mui/material/Card';
import { Select, MenuItem, FormControl, InputLabel } from '@mui/material';

 
interface FormProps {
    open: boolean;
    onClose: () => void;
    onCreateTask: (task: string) => void; // Function to handle task creation
  }

const Form: React.FC<FormProps> = ({ newTask, setNewTask, onCreateTask,handleCreateTask }) => {
    const [value, setValue] = useState('');

  const handleChange = (event) => {
    setValue(event.target.value);
  };
    return (
 
        <Grid sx={body}>
        <Grid >
          <Grid sx={HeaderBody}>
          <Typography variant="h5">
          Create new target
            </Typography>
            <Typography variant="body3">
            Add a new target to further streamline your carbon emission management process.
              </Typography>
              </Grid>
              <Typography variant='subtitle3'>Target Name</Typography>
              <TextField
              label="Target Name"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              margin="normal"
              fullWidth
            />
            <Typography variant='subtitle3'>Target Type</Typography>
            <FormControl fullWidth> 
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={value}
        label="Select"
        onChange={handleChange}
      >
        <MenuItem value="Company">Company</MenuItem>
        <MenuItem value="Intensity">Intensity</MenuItem>
        <MenuItem value="Facility">Facility</MenuItem>
      </Select>
    </FormControl>
            <Typography variant='subtitle3'>Emission Reduction Target</Typography>
              <TextField
              label="Emission"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              margin="normal"
              fullWidth
            />
            <Typography variant='subtitle3'>Base To Target Year</Typography>
            <TextField
              label="Base To Target Year"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              margin="normal"
              fullWidth
            />
            </Grid>
           
            </Grid>
   
  );
};

export default Form;
