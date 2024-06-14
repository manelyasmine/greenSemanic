import React, { useState, useEffect } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import {
  Box,
  Button,
  FormControl,
  OutlinedInput,
  Drawer,
  Grid,
  IconButton,
  MenuItem,
  Select,
  Slide,
  Divider,
  TextField,
  Typography,
  Checkbox,
} from '@mui/material';
import { userApis } from '@/lib/user/userApis';
import { SelectChangeEvent } from '@mui/material/Select';
import { useDispatch, useSelector } from 'react-redux';
import { setUsers } from '@/lib/store/reducer/useUser';
import { body, FooterBody, FooterBox, header } from '@/styles/theme/Bottom-drawer';
import { User } from '@/types/user';

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

interface UserDrawerProps {
  open: boolean;
  handleCancelUser: () => void;
  users: any;
  roles:any;
  user: User | null;
  headerName: string;
  isUpdate: boolean;
  setNewUser:any; 
  userUpdate:User | null;
}

const UserDrawer: React.FC<UserDrawerProps> = ({ open, handleCancelUser, userUpdate, roles, headerName, isUpdate }) => {

  const [permissions, setPermissions] = useState({
    read_user_management: false,
    write_user_management: false,
    create_user_management: false,
    read_emission_tracking: false,
    write_emission_tracking: false,
    create_emission_tracking: false,
    read_task: false,
    write_task: false,
    create_task: false,
    read_targets: false,
    write_targets: false,
    create_targets: false,
    read_reports: false,
    write_reports: false,
    create_reports: false,
  });
 
  const [currentUser, setCurrentUser] = useState<User>(userUpdate || { username: '',email:'', passwords: '', role: '' });
  const dispatch = useDispatch(); 
  const {user}=useSelector((state:any)=>state.user)

  console.log("user draweer",user.id)
  const handleSaveUser = async () => {
    

    const newUserData = {
      ...currentUser, 
    };

    setCurrentUser(newUserData);

    if (isUpdate) {
      
      
      const { error } = await userApis.updateUser(user?.id,newUserData);
      if (error) {
        console.log("Update error:", error);
        return;
      }
      const updatedUsers = roles.map((r) => (r._id === newUserData._id ? newUserData : r));
      dispatch(setUsers(updatedUsers));
    } else {
      const { res, error } = await userApis.createUser(newUserData);
      if (error) {
        console.log("Create error:", error);
        return;
      }
      dispatch(setUsers([...roles, res]));
    }

    handleCancelUser();
  };

  const handleSelectChange = (event: React.ChangeEvent<{ value: unknown }>, name: string) => {
    const value = event.target.value as string | string[];
     console.log("handle select change",name,value)
    handleChange(name, value);
  };

  

  const handleChange = (name: string, value: any) => {
    setCurrentUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  return (
    <form onSubmit={handleSaveUser}>
      <Drawer anchor="bottom" open={open} onClose={handleCancelUser}>
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
                <IconButton onClick={handleCancelUser} sx={{ marginLeft: 8 }}>
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
                <Typography variant="subtitle3">User Name *</Typography>
                <TextField
                  label="User Name *"
                  value={currentUser.username}
                  onChange={(e) => handleChange('username', e.target.value)}
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
                <Typography variant="subtitle3">User Email *</Typography>
                <TextField
                  label="User Name *"
                  value={currentUser.email}
                  onChange={(e) => handleChange('email', e.target.value)}
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
                <Typography variant="subtitle3">User Password *</Typography>
                <TextField
                  label="User Name *"
                  value={currentUser.password}
                  onChange={(e) => handleChange('password', e.target.value)}
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

            <Typography variant="subtitle3">Phone</Typography>
                <TextField
                  label="User Name *"
                  value={currentUser.phone}
                  onChange={(e) => handleChange('phone', e.target.value)}
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


                <Typography variant="subtitle3">Role</Typography>
                <FormControl fullWidth>
                <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={currentUser.role || ''}
                onChange={(e) => handleSelectChange(e, 'role')}
                label="Select"
                >
                    {roles && Array.isArray(roles) ? (
                      roles.map((role) => (
                        <MenuItem key={role._id} value={role._id}>
                          {role.name}
                        </MenuItem>
                      ))
                    ) : (
                      <Typography variant="body2" sx={{ color: 'var(--Grey-grey-600, #606977)' }}>
                        {roles === undefined ? 'Loading users...' : 'No roles available'}
                      </Typography>
                    )}
                  </Select>
                </FormControl>
              </Box>

            

    

          </Box>
          <Divider sx={{ mt: 2 }} />
          <Grid sx={FooterBox}>
            <Grid sx={FooterBody}>
              <Button
                variant="contained"
                btnType="secondaryGray"
                onClick={handleCancelUser}
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
                onClick={handleSaveUser}
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

export default UserDrawer;
