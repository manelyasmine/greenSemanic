import React, { useState } from 'react';
import {Drawer,FormControl,Grid,Divider,MenuItem,Box,IconButton,TextField,Button,Typography}from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
 import OutlinedInput from '@mui/material/OutlinedInput';

import {header,FooterBox,FooterBody,body} from '@/styles/theme/Bottom-drawer';
import {Task} from '@/types/task';

import Select, { SelectChangeEvent } from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const names = [
  'Oliver Hansen',
  'Van Henry',
  'April Tucker',
  'Ralph Hubbard',
  'Omar Alexander',
  'Carlos Abbott',
  'Miriam Wagner',
  'Bradley Wilkerson',
  'Virginia Andrews',
  'Kelly Snyder',
];

interface BottomDrawerProps {
  
  newTask:any;
  setNewTask:any;
  handleCancelTask: () => void;
  onCreateTask: (task: Task) => void;
  open:boolean,
  users:any;
  targets:any; 

}
 
const BottomDrawer: React.FC<BottomDrawerProps> = ({open,handleCancelTask, onCreateTask,users,targets,newTask, setNewTask  }) => {
  console.log("BottomDrawer targets===>",targets,users)
   
  const handleChange = (name: string, event: Task) => {
   
    setNewTask({ ...newTask, [name]: event });
     
  };  
  
  const handleSelectChange = (event: React.ChangeEvent<{ value: unknown }>, name: string) => {
    const value = event.target.value as string | string[];
     console.log("handle select change",name,value)
    handleChange(name, value);
  };
  
  const handleCreateTask = () => {
     setNewTask({ ...newTask, ['usersIds']: usersIds })
    onCreateTask(newTask);

    console.log('update,updatedTask=====>',newTask,usersIds)
    
  };


  const [usersIds, setUsersIds] = React.useState<string[]>([]);

  const handleMultiSelectChange = (event: SelectChangeEvent<typeof usersIds>) => {
    const {
      target: { value },
    } = event;
    setUsersIds(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
    console.log("usersIdsusersIdsusersIdsusersIds==>",usersIds)
    setNewTask({ ...newTask, usersIds: usersIds });
   /*  const userIds = event.target.value as string[]; // Type assertion
    setNewTask({ ...newTask, usersIds: userIds }); */
  };


  return ( 
    
    <form onSubmit={handleCreateTask}>
    
  
    <Drawer anchor="bottom" open={open} onClose={handleCancelTask}>
      <Slide direction="up" in={open} mountOnEnter unmountOnExit>
        <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center' }}>
          <Box sx={header}>
            <Typography
              variant="h4"
              sx={{
                color: 'var(--Foundation-Grey-grey-700, #121417)',
                fontFeatureSettings: '"cv04" on, "cv03" on, "cv02" on, "cv11" on, "clig" off, "liga" off',
              }}
            >
              {' '}
              Add Task{' '}
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Typography variant="help">need help?</Typography>
              <IconButton onClick={handleCancelTask} sx={{ marginLeft: 8 }}>
                <CloseIcon />
              </IconButton>
            </Box>
          </Box>
          <Box sx={body}>
               
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                gap: '0.5rem',
                alignSelf: 'stretch',
              }}
            >
              <Typography variant="h5" sx={{color:'var(--Grey-grey-900, #1A1D21)'}}>Create New Task</Typography>
              <Typography variant="bodyP3" sx={{color:'var(--Grey-grey-400, #88909'}}> Add a new task to further streamline your carbon emission management process.</Typography>
              
            </Box>
 


<Grid container spacing={2} display="flex" flexDirection="row">
      {/* Grid items */}

      <Grid item xs={12} >
      <Grid container spacing={2} alignItems="center">
           
         
      <Typography variant='subtitle3'>Task Name</Typography>
      <TextField
            label="Task Title"
            value={newTask.taskName}
           
            onChange={(e) => handleChange('taskName', e.target.value)}
            margin="normal"
            fullWidth
          />
      
        </Grid>
        </Grid>
        
  <Divider style={{ margin: "1rem 0", backgroundColor: "red" ,strokeWidt:"1px"}} />
      {/* Repeat the same structure for other grid items */}
      <Grid item xs={12}  >
      <Grid container spacing={2} alignItems="center">
          
      <Typography variant='subtitle3'>Target Name</Typography>
      <FormControl fullWidth>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={newTask.targetName || ''}
          onChange={(e) => handleSelectChange(e, 'targetName')}
          label="Select"
        >
        {targets && Array.isArray(targets) ? (  
          Object.entries(targets).map(([key, value]) => (
            <MenuItem key={value.id} value={value.id}>
              {value.name}  
            </MenuItem>
          ))
        ) : (
          // Display a message while users are loading or unavailable
          <Typography variant="body2" sx={{ color: 'var(--Grey-grey-600, #606977)' }}>
            {targets === undefined ? 'Loading targets...' : 'No targets available'}
          </Typography>
        )}  
          </Select>
        </FormControl>
      </Grid>

      </Grid>
      <Grid item xs={12}  >
      <Grid container spacing={2} alignItems="center">
         
              
      <Typography variant='subtitle3'>Due Date</Typography>
      <TextField
            label="Due Date"
            value={newTask.dueDate}
            onChange={(e) => handleChange('dueDate',e.target.value)}
            margin="normal"
            fullWidth
          />
          </Grid>
      </Grid>
      
      <Grid item xs={12}  >
      <Grid container spacing={2} alignItems="center">
            
    


        <Typography variant='subtitle3'>Assigned To</Typography>
        <FormControl  fullWidth> 
        <Select
          labelId="demo-multiple-name-label"
          id="demo-multiple-name"
          multiple
          fullWidth
          value={usersIds}
          onChange={handleMultiSelectChange}
          input={<OutlinedInput label="Name" />}
          MenuProps={MenuProps}
        >
           {users && Array.isArray(users) ? ( // Check if users is an array and defined
            Object.entries(users).map(([key, value]) => (
              <MenuItem key={value._id} value={value._id}>
                {value.email}  
              </MenuItem>
              ))
        ) : (
          // Display a message while users are loading or unavailable
          <Typography variant="body2" sx={{ color: 'var(--Grey-grey-600, #606977)' }}>
            {users === undefined ? 'Loading targets...' : 'No targets available'}
          </Typography>
        )}
        </Select>
      </FormControl>
         </Grid>
      </Grid>

 
</Grid>

          </Box>
          <Divider sx={{ mt: 2,color:"black" }} />
          <Grid sx={FooterBox}>
            <Grid sx={FooterBody}>
              <Button
                variant="contained"
                btnType="secondaryGray"
                onClick={handleCancelTask}
                sx={{
                  borderRadius: '0.375rem',
                  background: 'var(--Colors-Base-00, #FFF)',

                  border: '1px solid var(--Grey-grey-200, #B3B8C2)',
                }}
              >
                <Typography variant="subtitle3" sx={{ color: 'var(--Grey-grey-600, #606977)' }}>
                  Cancel
                </Typography>
              </Button>

              <Button
                variant="contained"
                btnType="primary"
                onClick={handleCreateTask}
                sx={{
                  borderRadius: '0.375rem',
                  background: 'var(--Green-green-500, #16B364)',
                }}
              >
                <Typography variant="subtitle3" sx={{ color: 'var(--Colors-Base-00, #FFF)' }}>
                  Confirm
                </Typography>
              </Button>
            </Grid>
          </Grid> 
        </Box>
      </Slide>
    </Drawer>
    </form>
    
      
     
        
      
      
      
   
       
      

     
    

         
    
  );
};

export default BottomDrawer;
