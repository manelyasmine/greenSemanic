import React ,{useState} from 'react';
import { Drawer, Slide, Box, Typography, IconButton,Divider,Grid,Button,TextField,Select, MenuItem, FormControl } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import {header,body,HeaderBody,FooterBody,FooterBox} from '@/styles/theme/Bottom-drawer';

import Avatar from '@mui/material/Avatar';
interface NewUserProps {
  isNewUser: boolean;
  handleNewUser: () => void;
  handleCreateUser: (user: string) => void;
  handleClose: () => void;
}
interface NewUserProps {
  open: boolean;
  onClose: () => void;
  onCreateTask: (task: string) => void; // Function to handle task creation
}

const NewUser: React.FC<NewUserProps> = ({ open, onClose, onCreateUser }) => {
  const [newUser, setNewUser] = useState('');
  const [value,setValue]=useState('');
const handleChange=()=>{
  console.log("handle change")
}
  const handleCreateUser = () => {
    onCreateUser(NewUser);
    setNewUser('');
    onClose();
  };
   
  return (
   
      
    <Drawer anchor="bottom" open={open} onClose={onClose}>
    <Slide direction="up" in={open} mountOnEnter unmountOnExit>
     <Box sx={{ display: 'flex', flexDirection: 'column', 
     justifyContent: 'space-between', alignItems: 'center', }}>
      <Box sx={header}>
          <Typography 
          variant="h4"   
          sx={{ color: 'var(--Foundation-Grey-grey-700, #121417)',
          fontFeatureSettings: '"cv04" on, "cv03" on, "cv02" on, "cv11" on, "clig" off, "liga" off',
        }}
        >    Add User </Typography>
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
      <Box sx={{
        display: 'flex',
       flexDirection: 'column', 
       alignItems: 'center', 
       gap:"2rem"

      }}>
       
            <Avatar sx={{ width: 100, height: 100 }}> {/* Adjust the size of the avatar as needed */}
              {/* Add the avatar content here */}
            </Avatar>
            <IconButton> {/* Add onClick handler to change image */}
              {/* Add icon for changing image */}
            </IconButton>
          
       
          </Box>
       
          <Box sx={{ display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          gap: '0.5rem',
          alignSelf: 'stretch',


           }} >
            <Typography variant='subtitle3'>User Name</Typography>
            <TextField
              label="User Name"
              value={newUser}
              onChange={(e) => setNewUser(e.target.value)}
              margin="normal"
              fullWidth
              
            />
          </Box>
          <Box sx={{ display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          gap: '0.5rem',
          alignSelf: 'stretch',


           }}>
            <Typography variant='subtitle3'>User Email</Typography>
            <TextField
              label="User Email"
              value={newUser}
              onChange={(e) => setNewUser(e.target.value)}
              margin="normal"
              fullWidth
              
            />
          </Box>
          <Box sx={{ display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          gap: '0.5rem',
          alignSelf: 'stretch',


           }}>
            <Typography variant='subtitle3'>User Phone</Typography>
            <TextField
              label="User Phone"
              value={newUser}
              onChange={(e) => setNewUser(e.target.value)}
              margin="normal"
              fullWidth
               
            />
          </Box>
          <Box sx={{ display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          gap: '0.5rem',
          alignSelf: 'stretch',


           }} >
            <FormControl fullWidth>
              <Typography variant='subtitle3'>Role</Typography>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={value}
                label="Select"
                onChange={handleChange}
              >
                <MenuItem value="Admin">Admin</MenuItem>
                <MenuItem value="Role1">Role1</MenuItem>
                <MenuItem value="Role2">Role2</MenuItem>
              </Select>
            </FormControl>
          </Box>
            
        </Box>
        <Divider sx={{ mt: 2 }} />
        <Grid  sx={FooterBox}>
            <Grid sx={FooterBody}>
          <Button variant="contained" btnType="secondaryGray" onClick={onClose}
          
          sx={{
            borderRadius: "0.375rem",
  background: "var(--Colors-Base-00, #FFF)",

  
border: "1px solid var(--Grey-grey-200, #B3B8C2)",
 
           }}
          >
            <Typography variant="subtitle3" sx={{color: "var(--Grey-grey-600, #606977)"}}>
            Cancel</Typography>
          </Button>

         <Button variant="contained" btnType="primary" onClick={onClose}
          sx={{
            borderRadius: "0.375rem",
  background: "var(--Green-green-500, #16B364)"
           }}
         
         >
          <Typography variant="subtitle3" sx={{color:"var(--Colors-Base-00, #FFF)"}}>
          Confirm</Typography>
            
          </Button>
      </Grid>
      </Grid>

    </Box>
    </Slide>
  </Drawer>
         
       
  );
}

export default NewUser;
