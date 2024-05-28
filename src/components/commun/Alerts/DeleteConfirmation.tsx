import React, { useState } from 'react';
import {  Modal,ButtonGroup,Typography ,IconButton} from '@mui/material';
import Box from '@mui/material/Box';

import { Button } from '@/components/commun/Button';
import CloseIcon from '@mui/icons-material/Close';
import { palette } from '@/styles/theme/colors';
 
interface DeleteConfirmationProps {}

const DeleteConfirmation: React.FC<DeleteConfirmationProps> = ({open,setOpen,title,subtitle,primary,secondary,primaryColor}) => {
   
 
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
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
      <Typography variant="h4" sx={{padding:"1.5rem"}}
      sx={{color:'var(--Colors-Primary-Slate-800, #2D3643)'}}
      >{title}</Typography>
      <IconButton aria-label="close">
        <CloseIcon />
      </IconButton>
      
    </Box>
    <Box sx={{ display: 'flex', flexDirection: 'column',justifyContent:"flex-start" }}>
      <Typography variant="bodyP2" sx={{  textAlign: 'right',color:'var(--Grey-grey-600, #606977)'
 }}>
        {subtitle}
      </Typography>
    
        <Box  sx={{paddingTop:'1.5rem',paddingBottom:'1.5rem',
      display: 'flex',
      justifyContent: 'flex-end',
      alignItems: 'flex-start',
      gap: 'var(--12, 0.75rem)',
      alignSelf: 'stretch'


      }}> 
      <Button  btnType="secondaryGray" 
      sx={{ color: 'color: var(--Grey-grey-600, #606977)',
      backgroundColor:'var(--Colors-Base-00, #FFF)', 
      fontWeight: 700 }}>
             {secondary}
      </Button>
      <Button  btnType="primary" sx={{...primaryColor,
        borderRadius: '0.375rem',color:palette.common.white, fontWeight: 700 

      }}>
              {primary}
      </Button> 
    </Box>
    </Box>
    </Box>
  
   
       
    </Modal>
    
  );
};

export default DeleteConfirmation;
