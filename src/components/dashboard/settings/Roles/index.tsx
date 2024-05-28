'use client';

import React, {useState} from 'react';
import { PlusIcon } from '@/icons';
import { Button, Grid } from '@mui/material';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import AddRoles from './AddRoles';
import { MuiButton } from '@/styles/theme/components/button';
import ListRoles from './ListRoles';

interface RolesListProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}
export function RolesList() {
  const [isNewRole, setIsNewRole] = useState(false);
  const handleNewRole = () => {
    setIsNewRole(!isNewRole);
  };
const handleClose=()=>{
  setIsNewRole(false);
}
const handleCreateRole=()=>{

}
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
      <ListRoles />
      {isNewRole ? (
   
   <AddRoles 
   open={isNewRole} onClose={handleClose} onCreateUser={handleCreateRole}
        
        
        />

 
 
   
   ):(<></>)
   }
    </Stack>
  );
}
