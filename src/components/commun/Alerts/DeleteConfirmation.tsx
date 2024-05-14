import React, { useState } from 'react';
import { Button, Modal,ButtonGroup } from '@mui/material';
import Box from '@mui/material/Box';

import { palette } from '@/styles/theme/colors';

interface DeleteConfirmationProps {}

const DeleteConfirmation: React.FC<DeleteConfirmationProps> = ({open,setOpen}) => {
   
 
  const handleClose = () => setOpen(false);
  const handleDelete = () => {
    handleClose();
  };

  return (
    
    <Modal open={open} onClose={handleClose} sx={{ backgrounColor:"red",dislay:'flex',justifyContent:"center",aligItems:"center" }}>
      <Box sx={{top:"50%",left:"40%",backgrounColor:palette.common.white}} >
        <p>Are you sure you want to delete?</p>
        <ButtonGroup variant="contained" aria-label="contained button group">
          <Button onClick={handleClose}>Cancel</Button>
          <Button color="error" onClick={handleDelete}>
            Delete
          </Button>
        </ButtonGroup>
      </Box>
    </Modal>
    
  );
};

export default DeleteConfirmation;
