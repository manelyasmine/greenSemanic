import React, { useState,useEffect } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import {
  Box,
  Button,FormControl,OutlinedInput,
   
  Drawer,
 
  Grid,
  IconButton,
  MenuItem,
  Select,
  Slide,Divider,
  TextField,
  Typography,Checkbox,
} from '@mui/material';
import Avatar from '@mui/material/Avatar';
import { roleApis } from '@/lib/role/roleApis';
import  { SelectChangeEvent } from '@mui/material/Select';
import { body, FooterBody, FooterBox, header, HeaderBody } from '@/styles/theme/Bottom-drawer';
import {Role} from '@/types/role'; 

import { setRoles } from '@/lib/store/reducer/useRole';
import { useDispatch, useSelector } from 'react-redux';
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

interface NewRoleProps {
  open: boolean;
  
  handleCancelRole: () => void;
  users:any;
  newRole:any;
  
  onUpdateRole: (role: Role) => void;  
}
  
const NewRole: React.FC<NewRoleProps> = ({ open,handleCancelRole, users,newRole}) => {
     
  const [permissions, setPermissions] = useState({
    read_user_management: false,
    write_user_management: false,
    create_user_management: false,
    read_emission_tracking:false,
    write_emission_tracking:false,
    create_emission_tracking:false,
    read_task:false,
    write_task:false,
    create_task:false,
    read_targets:false,
    write_targets:false,
    create_targets:false,
    read_reports:false,
    write_reports:false,
    create_reports:false,
  });

  const { roles } = useSelector((state: any) => state.role);
  const [usersIds, setUsersIds] = React.useState<string[]>();
  const [updatedRole, setupdatedRole] = useState<Role>(newRole);
  const dispatch = useDispatch();
  useEffect(() => {
    if (newRole?.users) {
      const extractedIds = newRole.users.map((user) => user._id);
      setUsersIds(extractedIds); 
    }
  }, []);

  

  useEffect(() => {
    if (newRole?.permissions) {
      setPermissions((prevPermissions) => {
        // Create a new object to avoid mutation
        const updatedPermissions = { ...prevPermissions };
  
        // Update individual permission values based on newRole.permissions
        newRole.permissions.forEach((permission) => {
          updatedPermissions[permission] = true; // Assuming a true value indicates permission granted
        });
  
        return updatedPermissions;
      });
    }
      

  }, [newRole]);


   






  const handleUpdateRole =  async() => {
    
    const selectedPermissions = Object.entries(permissions)
    .filter(([key, value]) => value) 
    .map(([key]) => key);   
    console.log('nee',newRole)
   newRole = {
    ...updatedRole,
    permissions: selectedPermissions,  
    usersIds:usersIds
  };  
  console.log("update drawer",newRole)
  setupdatedRole(newRole) 
    const { res , error } = await roleApis.updateRole(newRole);
    if (error) { 
      console.log("errrrrrr",error)
     return
   } 
   // Update the roles state with the updated role
   const updatedRoles = roles.map((role) =>
    role._id === newRole._id ? newRole : role
  );

  dispatch(setRoles(updatedRoles));
    handleCancelRole();
  };


   const handleCheckboxChange = (event) => {
    event.preventDefault();
    const { name, checked } = event.target;
    setPermissions((prevPermissions) => ({
      ...prevPermissions,
      [name]: checked,
    }));

    const selectedPermissions = Object.entries(permissions)
    .filter(([key, value]) => value) // Filter only checked permissions (value is true)
    .map(([key]) => key); // Extract permission names

  const updatedNewRole = {
    ...updatedRole,
    permissions: selectedPermissions, // Update newRole with selected permissions
  };  
  setupdatedRole(updatedNewRole)
    
  };  
 


  
    

  const handleMultiSelectChange = (event: SelectChangeEvent<typeof usersIds>) => {
    const {
      target: { value },
    } = event;
  

    setUsersIds(
      typeof value === 'string' ? value.split(',') :value
    );
    
 
    setupdatedRole({ ...updatedRole, usersIds:   usersIds });

   

  };
/*   const handleChange = (name: string, event: Role) => {
   
    newRole[name]=event;
    setNewRole({ newRole});
    console.log(newRole,name,event)
     
  };  
   */
   
  const handleChange = (name: string, value: any) => {
    setupdatedRole((prevRole) => ({
      ...prevRole,
      [name]: value,
    }));
  };
 
 
  


  return (
    <form onSubmit={handleUpdateRole}>
    
  
    <Drawer anchor="bottom" open={open} onClose={handleCancelRole}>
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
              Update Role
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Typography variant="help">need help?</Typography>
              <IconButton onClick={handleCancelRole} sx={{ marginLeft: 8 }}>
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
              <Typography variant="subtitle3">Role Name *</Typography>
              <TextField
                label="Role Name *"
                defaultValue={newRole?.name}
                value={updatedRole?.name || ''}
               
                onChange={(e) => handleChange('name', e.target.value)}
                margin="normal"
                fullWidth
              />
            </Box>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                gap: '0.5rem',
                alignSelf: 'stretch',
              }}
            >
              <Typography variant="subtitle3">Assigned To</Typography>
              <FormControl  fullWidth> 
        <Select
          labelId="demo-multiple-name-label"
          id="demo-multiple-name"
          multiple
          fullWidth
          defaultValue={newRole?.users}
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
            </Box>

            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                gap: '0.5rem',
                alignSelf: 'stretch',
              }}
            >
              <Typography variant="h5" sx={{color:'var(--Grey-grey-900, #1A1D21)'}}>Role Permissions</Typography>
              <Typography variant="bodyP3" sx={{color:'var(--Grey-grey-400, #88909'}}>Customize role with specific permission to manage your software</Typography>
              
            </Box>
 

<Grid container spacing={2} display="flex" flexDirection="row">
      {/* Grid items */}

      <Grid item xs={12} >
      <Grid container spacing={2} alignItems="center">
          <Grid item xs={6}>
          <Typography variant="bodyB2" color="var(--Grey-grey-700, #4F5662)" style={{ margin: "0" }}>Admin Access</Typography>
          </Grid>
          <Grid item xs={4}>
          <Box>
            <Checkbox name="all"   onChange={handleCheckboxChange} /> select all
          </Box>
          </Grid>
          
      
        </Grid>
        </Grid>



      <Grid item xs={12} >
      <Grid container spacing={2} alignItems="center">
          <Grid item xs={6}>
          <Typography variant="bodyB2" color="var(--Grey-grey-700, #4F5662)" style={{ margin: "0" }}>User Management</Typography>
          </Grid>
          <Grid item xs={2}>
          <Box>
            <Checkbox name="read_user_management" checked={permissions.read_user_management} onChange={handleCheckboxChange}   /> Read
          </Box>
          </Grid>
          <Grid item xs={2}>
          <Box>
            <Checkbox name="write_user_management" checked={permissions.write_user_management} onChange={handleCheckboxChange}   /> Write
          </Box>
          </Grid>
          <Grid item xs={2}>
          <Box>
            <Checkbox name="create_user_management"  checked={permissions.create_user_management} onChange={handleCheckboxChange}   /> Create
          </Box>
          </Grid>
      
        </Grid>
        </Grid>
        
  <Divider style={{ margin: "1rem 0", backgroundColor: "red" ,strokeWidt:"1px"}} />
      {/* Repeat the same structure for other grid items */}
      <Grid item xs={12}  >
      <Grid container spacing={2} alignItems="center">
          <Grid item xs={6}>
          <Typography variant="bodyB2" color="var(--Grey-grey-700, #4F5662)" style={{ margin: "0" }}> Emission tracking</Typography>
          </Grid>
          <Grid item xs={2}>
          <Box>
            <Checkbox name="read_emission_tracking" checked={permissions.read_emission_tracking} onChange={handleCheckboxChange}  /> Read
          </Box>
          </Grid>
          <Grid item xs={2}>
          <Box>
            <Checkbox name="write_emission_tracking" checked={permissions.write_emission_tracking} onChange={handleCheckboxChange}  /> Write
          </Box>
          </Grid>
          <Grid item xs={2}>
          <Box>
            <Checkbox name="create_emission_tracking" checked={permissions.create_emission_tracking} onChange={handleCheckboxChange}  /> Create
          </Box>
          </Grid>
      </Grid>

      </Grid>
      <Grid item xs={12}  >
      <Grid container spacing={2} alignItems="center">
          <Grid item xs={6}>
          <Typography variant="bodyB2" color="var(--Grey-grey-700, #4F5662)" style={{ margin: "0" }}>Tasks</Typography>
          </Grid>
           <Grid item xs={2}>
          <Box>
            <Checkbox  name="read_task" checked={permissions.read_task} onChange={handleCheckboxChange}   /> Read
          </Box>
          </Grid>
          <Grid item xs={2}>
          <Box>
            <Checkbox  name="write_task" checked={permissions.write_task}  onChange={handleCheckboxChange} /> Write
          </Box>
          </Grid>
          <Grid item xs={2}>
          <Box>
            <Checkbox  name="create_task"  checked={permissions.create_task} onChange={handleCheckboxChange} /> Create
          </Box>
          </Grid>
          </Grid>
      </Grid>
      
      <Grid item xs={12}  >
      <Grid container spacing={2} alignItems="center">
          <Grid item xs={6}>
          <Typography variant="bodyB2" color="var(--Grey-grey-700, #4F5662)" style={{ margin: "0" }}>Targets</Typography>
          </Grid>
          <Grid item xs={2}>
          <Box>
            <Checkbox  name="read_targets" checked={permissions.read_targets} onChange={handleCheckboxChange}   /> Read
          </Box>
          </Grid>
          <Grid item xs={2}>
          <Box>
            <Checkbox name="write_targets" checked={permissions.write_targets} onChange={handleCheckboxChange} /> Write
          </Box>
          </Grid>
          <Grid item xs={2}>
          <Box>
            <Checkbox name="create_targets" checked={permissions.create_targets} onChange={handleCheckboxChange}  /> Create
          </Box>
          </Grid>
         </Grid>
      </Grid>




      <Grid item xs={12}  >
      <Grid container spacing={2} alignItems="center">
          <Grid item xs={6}>
          <Typography variant="bodyB2" color="var(--Grey-grey-700, #4F5662)" style={{ margin: "0" }}>Reports</Typography>
          </Grid>
          <Grid item xs={2}>
          <Box>
            <Checkbox name="read_reports" checked={permissions.read_reports} onChange={handleCheckboxChange}  /> Read
          </Box>
          </Grid>
          <Grid item xs={2}>
          <Box>
            <Checkbox name="write_reports"  checked={permissions.write_reports} onChange={handleCheckboxChange} /> Write
          </Box>
          </Grid>
          <Grid item xs={2}>
          <Box>
            <Checkbox name="create_reports" checked={permissions.create_reports} onChange={handleCheckboxChange} /> Create
          </Box>
          </Grid>
         </Grid>
      </Grid>
</Grid>

          </Box>
          <Divider sx={{ mt: 2 }} />
          <Grid sx={FooterBox}>
            <Grid sx={FooterBody}>
              <Button
                variant="contained"
                btnType="secondaryGray"
                onClick={handleCancelRole}
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
                onClick={handleUpdateRole}
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

export default NewRole;
