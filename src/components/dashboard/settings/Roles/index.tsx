'use client';

import React, {useState,useEffect} from 'react';
import { PlusIcon } from '@/icons';
import { Button, Grid } from '@mui/material';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import AddRoles from './AddRoles';
import { MuiButton } from '@/styles/theme/components/button';
import ListRoles from './ListRoles';
import {Role} from '@/types/role';
import { useDispatch, useSelector } from 'react-redux';
import { userApis } from '@/lib/user/userApis';
import { User } from '@/types/user'; 
import { setRoles } from '@/lib/store/reducer/useRole';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { roleApis } from '@/lib/role/roleApis';
interface RolesListProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}
export function RolesList() {
  const [isNewRole, setIsNewRole] = useState(false);

  const { roles } = useSelector((state: any) => state.role);
  const [newRole, setNewRole] = useState<Role>({});
  const [users, setUsers] = useState<User>({});

  const dispatch = useDispatch();
  const handleNewRole = () => {
    handleUsers();
    setIsNewRole(!isNewRole);
  };
const handleClose=()=>{
  setIsNewRole(false);
}
/* const handleCreateRole= React.useCallback(async (): Promise<void> => {
    
 console.log("handle create task,=========",newRole)
  const { res , error } = await roleApis.createRole(newRole);
   if (error) { 
    return
  } 
  //dispatch(newRole([...role , res]))
  handleClose();
}, [newRole]); */
const handleUsers= React.useCallback(async (): Promise<void> => {
  
  try {
    const { res } = await userApis.getUsers();
    
    //dispatch(setUsers(res));
   setUsers(res) 
   console.log("useeeeeeeeee",users)
      
    
  } catch (error) {
    console.error('Error fetching users:', error); 
  }
 
    
      }, 
[dispatch]);   

const getRoles = React.useCallback(async (): Promise<void> => {
  try {
    const { error, res } = await roleApis.getRoles();
     
    
    if (error) {
      return;
    }
     
   

    dispatch(setRoles(res));
    setRoles(res);
  } catch (error) {
    console.error('Error fetching tasks:', error);
  }
}, [dispatch]);

useEffect(() => {
  getRoles();
}, [getRoles]);


  return (
    <Stack spacing={6}>
      <Grid container alignItems="center">
        <Grid item xs={6}>
          <Typography variant="h5" sx={{ color: 'var(--Gray-900, #101828)' }}>
            Liste des rôles
          </Typography>
        </Grid>
        <Grid
          item
          xs={6}
          container
          justifyContent="flex-end"
          sx={{ display: 'flex', alignItems: 'flex-start', gap: 'var(--12, 12px)' }}
        >
          <Button
            btnType="Primary"
            sx={{
              ...MuiButton.styleOverrides.sizeSmall,
              borderRadius: '6px',
              justifyContent: 'flex-end',
              background: 'var(--Green-green-500, #16B364)',
            }}
            startIcon={<PlusIcon />}
            onClick={handleNewRole}
          >
            <Typography variant="h7" sx={{ color: 'var(--Colors-Base-00, #FFF)' }}>
              Ajouter Rôle
            </Typography>
          </Button>
        </Grid>
        <Grid>
          <Typography variant="bodyP3" sx={{ color: 'var(--Gray-600, #475467)' }}>
            Gérer les rôles et créer de nouvelles autorisations
          </Typography>
        </Grid>
      </Grid>
      <ListRoles roles={roles}/>
      {isNewRole ? (
   
   <AddRoles 
   open={isNewRole} handleCancelRole={handleClose}  
  users={users}
  newRole={newRole} 
  setNewRole={setNewRole} 
  headerName="Add Roles"
   
        
        
        />

 
 
   
   ):(<></>)
   }
    </Stack>
  );
}
