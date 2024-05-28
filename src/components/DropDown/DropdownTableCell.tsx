import React, { useState } from 'react';
import { DashboardIcon, DotsHorizontal,AssignIcon,DeleteIcon,ModifyIcon } from '@/icons';
import { MoreVert as MoreVertIcon } from '@mui/icons-material';
import { IconButton, ListItemIcon, ListItemText, Menu, MenuItem } from '@mui/material';
import DropDownStyle from '@/styles/theme/DropDown';

import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import DeleteConfirmation from '@/components/commun/Alerts/DeleteConfirmation';
import { palette } from '@/styles/theme/colors';
interface DropdownProps {
  // Function to handle modification triggered from the dropdown
  onModify: (data: any) => void;
  // Function to handle deletion triggered from the dropdown
  onDelete: (data: any) => void;
  // Function to handle assignment triggered from the dropdown (optional)
  onAssign?: (data: any) => void;
}

const Dropdown: React.FC<DropdownProps> = ({ onModify, onDelete, onAssign }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [isDeleteOpen,setIsDeleteOpen]=useState(false);
  const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleModify = () => {
    handleClose();
    onModify?.(); // Call the onModify function if provided
  };

  const handleDelete = () => {
    handleClose();
    setIsDeleteOpen(!isDeleteOpen);
  };

  const handleAssign = () => {
    handleClose();
    onAssign?.(); // Call the onAssign function if provided (optional)
  };

  return (
    <div>
      <IconButton onClick={handleOpen}>
        <DotsHorizontal fontSize="small" />
      </IconButton>
      
      <Menu
         
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        MenuListProps={{ 'aria-labelledby': 'dropdown-button' }}
      >
        <Card sx={DropDownStyle}>
        <MenuItem onClick={handleModify}>
          <ListItemIcon> <ModifyIcon  /> </ListItemIcon>
          <ListItemText primary="Modify" />
        </MenuItem>
        <MenuItem onClick={handleDelete}>
          <ListItemIcon> <DeleteIcon   /> </ListItemIcon>
          <ListItemText primary="Delete" />
          
        </MenuItem>
         <MenuItem onClick={handleAssign}>
            <ListItemIcon>  <AssignIcon   /> </ListItemIcon>
            <ListItemText primary="Assign" />
          </MenuItem>
      </Card>
      </Menu>
      {isDeleteOpen && (
          <DeleteConfirmation
          open={isDeleteOpen}
          setOpen={setIsDeleteOpen}
          title='Do you want to delete this?'
          subtitle='Are you sure you want to delete?'
          primary='Delete'
          secondary='Cancel'
          primaryColor={{ backgroundColor: palette.danger[500] }}
          />
      )}
      
     
    </div>
  );
};

export default Dropdown;
