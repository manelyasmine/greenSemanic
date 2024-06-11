import React, { useState, useEffect, use } from 'react';
import {
  Box,
  Button,
  Drawer,FormControl,Select,
   
  IconButton,
  Grid,Checkbox,Divider,MenuItem,
  TextField,
  Typography,
} from '@mui/material';
import { Label } from '@mui/icons-material';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import {  Filter,  } from '@/styles/theme/Filter';
import {header,body,HeaderBody,FooterBody,FooterBox} from '@/styles/theme/Bottom-drawer';
import Card from '@mui/material/Card';
 import { useDispatch, useSelector } from 'react-redux';
import { Task } from '@/types/task'; 
import {User} from '@/types/user';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

 
interface UpdateBottomDrawerTaskProps {
  open: boolean;
  isAssign:boolean;
  handleCancelTask: () => void;
  users:any;
  targets:any;
  task : Task;
  userId:User;
  headerName:string;
  titleName:string;
  subtitleName:string;
  onUpdateTask: (task: Task) => void; // Function to handle task creation
}
 

const UpdateBottomDrawerTask: React.FC<UpdateBottomDrawerTaskProps> = ({ open, handleCancelTask, onUpdateTask  , task,users,targets,isAssign,headerName,titleName,subtitleName}) => {
 
 const [updatedTask, setupdatedTask] = useState<Task>(task);
 const [initialTarget, setInitialTarget] = useState<string | undefined>(task.targetName);
 /* const [initialUsers, setInitialUsers] = useState<string[] | undefined>(
  task.usersIds?.map((userId: { _id: string }) => userId._id) || [],
); */

 
 const [error, setError] = useState(false);
 const handleUpdateTask = () => {
   console.log('update,updatedTask=====>',updatedTask)
   onUpdateTask(updatedTask);
   
 };

 const handleChange = (name: string, event: Task) => {
  
 
  setupdatedTask({ ...updatedTask, [name]: event });
   
};

useEffect(() => {
  // Set initial target only once on component mount
  setInitialTarget(task.targetName);
 

  
}, [task.targetName]); // Re-run effect if task.targetName changes


const handleSelectChange = (event: React.ChangeEvent<{ value: unknown }>, name: string) => {
  const value = event.target.value as string | string[];
  handleChange(name, value);
};
const handleMultiSelectChange = (event: React.ChangeEvent<{ value: unknown }>) => {
  const value = event.target.value as string[];
  handleChange('usersIds', value);
  console.log("handle change user ids",updatedTask.usersIds)
};
 
 return ( 
    
    <form onSubmit={handleUpdateTask}>
    
  
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
              {headerName} 
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
              <Typography variant="h5" sx={{color:'var(--Grey-grey-900, #1A1D21)'}}>{titleName}</Typography>
              <Typography variant="bodyP3" sx={{color:'var(--Grey-grey-400, #88909'}}>{subtitleName}</Typography>
              
            </Box>
 


<Grid container spacing={2} display="flex" flexDirection="row">
      {/* Grid items */}

      <Grid item xs={12} >
      <Grid container spacing={2} alignItems="center">
      
         
      <Typography variant='subtitle3'>Task Name</Typography>
      <TextField
            label="Task Title"
            value={updatedTask.taskName || ''}
            defaultValue={task.taskName}
            onChange={(e) => handleChange('taskName', e.target.value)}
            margin="normal"
            fullWidth
            disabled={isAssign} 
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
                  
                  value={updatedTask.targetName || initialTarget}
                  onChange={(e) => handleSelectChange(e, 'targetName')}
                  disabled={isAssign} 
                      
                       
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
            label="Task Title"
            defaultValue={task.dueDate}
            value={updatedTask.dueDate || ''}
            onChange={(e) => handleChange('dueDate',e.target.value)}
            disabled={isAssign} 
            margin="normal"
            fullWidth
          />
          </Grid>
      </Grid>
      
      <Grid item xs={12}  >
      <Grid container spacing={2} alignItems="center">
            
      <Typography variant='subtitle3'>Assigned To</Typography>
      <FormControl fullWidth>
      <Select
            labelId="demo-multiple-select-label"
            id="demo-multiple-select"
            multiple
            value={updatedTask.usersIds || ''}  
            onChange={handleMultiSelectChange}
            label="Assigned To"
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
                {users === undefined ? 'Loading users...' : 'No users available'}
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
               
                btnType="primary"
                onClick={handleUpdateTask}
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

export default UpdateBottomDrawerTask;
