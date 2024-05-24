"use client";
import  React ,{useState} from 'react'; 
import Typography from '@mui/material/Typography'; 
import { MuiButton } from '@/styles/theme/components/button';
import Stack from '@mui/material/Stack';  
import {Grid,Button,Card,Container} from '@mui/material';
import {Box,Drawer,TextField,IconButton } from '@mui/material';
import {PlusIcon,ExportIcon} from '@/icons';
import { UsersTable } from './users-table';
import dayjs from 'dayjs'; 
import Slide from '@mui/material/Slide';
import {header,body,HeaderBody,FooterBody,FooterBox} from '@/styles/theme/Bottom-drawer';
import CloseIcon from '@mui/icons-material/Close';
import NewUser from "./NewUser"

import Avatar from '@mui/material/Avatar';
import { Select, MenuItem, FormControl, InputLabel } from '@mui/material';
interface UsersProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const customers = [
  {
    id: 'USR-010',
    name: 'Olivia Rhye',
    status:"active",
    avatar: '/assets/avatar-10.png',
    email: 'alcides.antonio@devias.io',
    phone: '908-691-3242',
    Role:"Admin",
    joinedAt: dayjs().subtract(2, 'hours').toDate(),
  },
  {
    id: 'USR-011',
    name: 'Olivia Rhye',
    status:"active",
    avatar: '/assets/avatar-10.png',
    email: 'alcides.antonio@devias.io',
    phone: '908-691-3242',
    Role:"Admin",
    joinedAt: dayjs().subtract(2, 'hours').toDate(),
  },
  {
    id: 'USR-012',
    name: 'Olivia Rhye',
    status:"active",
    avatar: '/assets/avatar-10.png',
    email: 'alcides.antonio@devias.io',
    phone: '908-691-3242',
    Role:"Admin",
    joinedAt: dayjs().subtract(2, 'hours').toDate(),
  },
]

 

export   function Users() { 
  const [isNewUser,setIsNewUser]=useState(false)
  const handleNewUser=()=>{
    setIsNewUser(!isNewUser); 
   }
  const [newUser, setNewUser] = useState('');
const [value,setValue]=useState('');
  const handleCreateUser = () => {
    
    setNewUser('');
    handleClose();
  };
 

const handleClose=()=>{setIsNewUser(false);}
  const page = 0;
  const rowsPerPage = 5; 
  const paginatedCustomers = applyPagination(customers, page, rowsPerPage);
  return (
    <Stack spacing={6} sx={{ height: '80vh', overflowY: 'auto' }}>
     <Grid container alignItems="center" >
      <Grid item xs={6}>
        <Typography variant="h5"   sx={{ color: 'var(--Gray-900, #101828)' }}>
        Users list
        </Typography>
      </Grid> 
      <Grid item xs={6} container justifyContent="flex-end"
         sx={{display: 'flex',
         alignItems: 'flex-start',
         gap: 'var(--12, 12px)',
         }}
        >
    
    <Button 
      btnType="Primary"
      sx={{ ...MuiButton.styleOverrides.sizeSmall,
            borderRadius: "6px",
            border: '1px solid var(--Grey-grey-200, #B3B8C2)',
            background: 'var(--Colors-Base-00, #FFF)',
            justifyContent: 'flex-end',
            
        }}

      startIcon={<ExportIcon fontSize="var(--icon-fontSize-sm)" />}  
        >
    <Typography variant="h7" sx={{ color: "var(--Grey-grey-600, #606977)" }}>
        Export
      </Typography>
    </Button>

     
     
    <Button
      btnType="Primary"
      sx={{
        ...MuiButton.styleOverrides.sizeSmall,
        borderRadius: "6px",
        justifyContent: 'flex-end',
        background: "var(--Green-green-500, #16B364)",
      }}

      onClick={handleNewUser}
      startIcon={<PlusIcon fontSize="var(--icon-fontSize-sm)" />}  
    >
      <Typography variant="h7" 
      sx={{ color: "var(--Colors-Base-00, #FFF)" }}
      >
        Add User
      </Typography>
    </Button>
  </Grid>
  <Grid>
  <Typography variant="bodyP3" sx={{color: "var(--Gray-600, #475467)"}}>
  Manage users and their account permissions here.
    </Typography>
    </Grid>
</Grid>
 
   
      <UsersTable
          count={paginatedCustomers.length}
          page={page}
          rows={paginatedCustomers}
          rowsPerPage={rowsPerPage}
        />
        
     {isNewUser ? (
   
     <NewUser 
     open={isNewUser} onClose={handleClose} onCreateUser={handleCreateUser}
          
          
          />

   
   
     
     ):(<>faux</>)
     }
   
    </Stack>
  );
}
function applyPagination(rows: Customer[], page: number, rowsPerPage: number): Customer[] {
  return rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
}