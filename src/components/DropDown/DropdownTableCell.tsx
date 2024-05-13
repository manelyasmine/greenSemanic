import React, { useState } from 'react';
import { DashboardIcon, DotsHorizontal } from '@/icons';
import { MoreVert as MoreVertIcon } from '@mui/icons-material';
import { IconButton, ListItemIcon, ListItemText, Menu, MenuItem } from '@mui/material';

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
    onDelete();
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
        <MenuItem onClick={handleModify}>
          <ListItemIcon>{/* <EditIcon size={16} /> */}</ListItemIcon>
          <ListItemText primary="Modify" />
        </MenuItem>
        <MenuItem onClick={handleDelete}>
          <ListItemIcon>{/* <DeleteIcon size={16} /> */}</ListItemIcon>
          <ListItemText primary="Delete" />
        </MenuItem>
        {onAssign && ( // Render assign option only if onAssign function is provided
          <MenuItem onClick={handleAssign}>
            <ListItemIcon></ListItemIcon>
            <ListItemText primary="Assign" />
          </MenuItem>
        )}
      </Menu>
    </div>
  );
};

export default Dropdown;
