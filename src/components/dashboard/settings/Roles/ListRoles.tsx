import React,{useState} from 'react';
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

import DeleteConfirmation from '@/components/commun/Alerts/DeleteConfirmation';
import { palette } from '@/styles/theme/colors';
import { MuiButton } from '@/styles/theme/components/button';
import { boxFilterDropDown, Filter, outlinedInput } from '@/styles/theme/Filter';
import {CheckIcon,GreneIcon} from '@/icons';
import UpdateRoles from './UpdateRoles';

 import { useDispatch, useSelector } from 'react-redux';
 import { userApis } from '@/lib/user/userApis';
 import {User} from '@/types/user';
 import {Role} from '@/types/role';
interface ListRolesProps {
roles:any;

}
const ListRoles:  React.FC<ListRolesProps>  = ({roles}) => {
  const [open,setIsOpen]=useState(false);
  const [users, setUsers] = useState<User>({});
  const [newRole, setNewRole] = useState<Role>({});
  const dispatch = useDispatch();
   const handleModify=(role)=>{
     console.log("rooooole",role)
     setIsOpen(!open);
     setNewRole(role);
     handleUsers();
    
console.log("is open",open)
   }
   const handleUsers= React.useCallback(async (): Promise<void> => {
  
    try {
      const { res } = await userApis.getUsers();
      
      //dispatch(setUsers(res));
     setUsers(res)   
      
    } catch (error) {
      console.error('Error fetching users:', error); 
    }
   
      
        }, 
  [dispatch]);

  const handleCancelRole=()=>{
    setIsUpdate(!isUpdate)
  }
  return (
    <Grid container spacing={2}>
      {roles.map((role) => (
        <Grid item key={role._id} xs={12} md={4}>
          <Paper variant="outlined">
            <List>
              <ListItem
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                  flex: '1 0 0',
                }}
              >

                <ListItemText
                  primary={role.name}  
                  primaryTypographyProps={{ variant: 'h5', color: 'var(--Green-green-700, #4F5662)' }}
                />

{/* <ListItemIcon>
    <Box sx={{background: 'var(--Green-green-500, #16B364)', borderRadius: '22px',  display: 'flex',
    width: '16px',
    height: '16px',
    padding: '2px',
    justifyContent: 'center',
    alignItems: 'center',}}>
<CheckIcon  />
</Box>
<ListItemText
primary={location?.all}  
primaryTypographyProps={{ variant: 'bodyP3', color: 'var(--Green-green-500, #727C8D)' }}
/>
</ListItemIcon> */}
  {role?.permissions && role.permissions.map((permission) => (
                  <ListItemIcon> 
                  <Box sx={{background: 'var(--Green-green-500, #16B364)', borderRadius: '22px',  display: 'flex',
                width: '16px',
                height: '16px',
                padding: '2px',
                justifyContent: 'center',
                alignItems: 'center',}}>
                  <CheckIcon  />
                  </Box>

                
                    
                   <ListItemText
                     primary={permission?.replace(/_/g, ' ')}
                     primaryTypographyProps={{ variant: 'bodyP3', color: 'var(--Green-green-500, #727C8D)' }}
                   />
                
             
            
          </ListItemIcon>
  ))}
          







          {role?.users && role.users.map((user) => (
                  <ListItemIcon> 
                  <Box sx={{background: 'var(--Green-green-500, #16B364)', borderRadius: '22px',  display: 'flex',
                width: '16px',
                height: '16px',
                padding: '2px',
                justifyContent: 'center',
                alignItems: 'center',}}>
                  <GreneIcon  />
                  </Box>

                
                    
                   <ListItemText
                     primary={user?.username}
                     primaryTypographyProps={{ variant: 'bodyP3', color: 'var(--Green-green-500, #727C8D)' }}
                   />
                
             
            
          </ListItemIcon>
  ))}
             <ListItemSecondaryAction sx={{ justifyContent: 'flex-end', display: 'flex', top: '14%' }}>
  <Button aria-label="modify" sx={{ display: 'contents' }} onClick={()=>handleModify(role)}>
    <ModifyIcon />
  </Button>



  {/* Add spacing between buttons */}
  <Box sx={{ width: '10px' }} />  {/* Adjust width as needed */}

  <Button aria-label="delete" sx={{ display: 'contents', paddingRight: '15%' }} >
    <DeleteIcon />
  </Button>
</ListItemSecondaryAction>

              </ListItem>
            </List>
           
                     
            {open && (
              <UpdateRoles
                open={open}
                handleCancelRole={handleCancelRole}
                users={users}  
                newRole={role} 
                 
              />
            )}
                 
          </Paper>
        </Grid>
      ))}
       
    </Grid>
  );
};

export default ListRoles;
