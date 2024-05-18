import React, { useState } from 'react';
import { Button, Modal,ButtonGroup,Typography ,IconButton} from '@mui/material';
import Box from '@mui/material/Box';

import CloseIcon from '@mui/icons-material/Close';
import { palette } from '@/styles/theme/colors';

interface DeleteConfirmationProps {}

const DeleteConfirmation: React.FC<DeleteConfirmationProps> = ({open,setOpen}) => {
   
 
  const handleClose = () => setOpen(false);
  const handleDelete = () => {
    handleClose();
  };

  return (
    
    <Modal open={open} onClose={handleClose} 
    
  
    >
       <Box sx={{position: 'absolute',top:"50%",left:"40%",
         display: 'flex',
         padding: '1.5rem',
         flexDirection: 'column',
         justifyContent: 'center',
         alignItems: 'center',
         borderRadius: '0.375rem',
         background:palette.common.white,
          }} >
         <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: "stretch" }}>
            <Typography variant="h4">Do you want to delete this?</Typography>
            <IconButton sx={{ justifyContent: "flex-end" }}>
              <CloseIcon />
            </IconButton>
           


              </Box>
        <Typography>Are you sure you want to delete?</Typography>
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
