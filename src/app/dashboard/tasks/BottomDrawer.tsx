import React, { useState } from 'react';
import {
  Box,
  Button,
  Drawer,
   
  IconButton,
  
  TextField,
  Typography,
} from '@mui/material';
import { Label } from '@mui/icons-material';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import {  Filter,  } from '@/styles/theme/Filter';
import {header,body,HeaderBody} from '@/styles/theme/Bottom-drawer';
import Card from '@mui/material/Card';

interface BottomDrawerProps {
  open: boolean;
  onClose: () => void;
  onCreateTask: (task: string) => void; // Function to handle task creation
}

const BottomDrawer: React.FC<BottomDrawerProps> = ({ open, onClose, onCreateTask }) => {
  const [newTask, setNewTask] = useState('');

  const handleCreateTask = () => {
    onCreateTask(newTask);
    setNewTask('');
    onClose();
  };
  console.log("bottomdrawner",open)
  return ( 
    
    <Drawer anchor="bottom" open={open} onClose={onClose}>
      <Slide direction="up" in={open} mountOnEnter unmountOnExit>
       <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
        <Box sx={header}>
            <Typography 
            variant="h4"   
            sx={{ color: 'var(--Foundation-Grey-grey-700, #121417)',
            fontFeatureSettings: '"cv04" on, "cv03" on, "cv02" on, "cv11" on, "clig" off, "liga" off',
          }}
          >    Add Task </Typography>
       <Box sx={{ display: "flex", alignItems: "center" }}>
        <Typography variant="help"  >
          need help?
        </Typography>
        <IconButton onClick={onClose} sx={{ marginLeft: 8 }}>
          <CloseIcon />
        </IconButton>
      </Box>
      </Box>
      <Box sx={body}>
        <Box sx={HeaderBody}>
        <Typography variant="h5">
        Create new task
          </Typography>
          <Typography variant="body3">
          Add a new task to further streamline your carbon emission management process.
            </Typography>
            </Box>
            <Typography variant='subtitle3'>Task Name</Typography>
      <TextField
            label="Task Title"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            margin="normal"
            fullWidth
          />
            <TextField
            label="Task Title"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            margin="normal"
            fullWidth
          />
            <TextField
            label="Task Title"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            margin="normal"
            fullWidth
          />
          </Box>
          <Button variant="contained" color="primary" onClick={handleCreateTask}>
            Create
          </Button>

      </Box>
      </Slide>
    </Drawer>
    
      
     
        
      
      
      
   
       
      

     
    

         
    
  );
};

export default BottomDrawer;
