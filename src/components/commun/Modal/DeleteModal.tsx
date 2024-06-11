import React, { useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import { ButtonGroup, IconButton, Modal, Typography,Grid } from '@mui/material';
import Box from '@mui/material/Box';

import { Button } from '@/components/commun/Button';
import { palette } from '@/styles/theme/colors';

interface DeleteModalProps {
  onClose: () => void;
  handleDelete: any;
  open: boolean;
  title:any;
  subtitle:any;
}

const DeleteModal: React.FC<DeleteModalProps> = ({ open, onClose, handleDelete,title,subtitle }) => {
  const handleClose = () => onClose();
  

  return (
    <Modal open={open} onClose={onClose} 
    
  
    >
       <Box sx={{position: 'absolute',top:"40%",left:"40%",
         display: 'flex',
         padding: '1.5rem',
         flexDirection: 'column',
         justifyContent: 'center',
         alignItems: 'flex-start',
         
         borderRadius: '0.375rem',
         background:palette.common.white,
         gap: '1.5rem' 
          }} >
   
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center',gap:"24px"  }}>
          <Typography variant="h4"  >
            {title}
          </Typography >
          <IconButton aria-label="close" onClick={handleClose} sx={{justifyContent:"flex-end",marginBottom: '1.5rem',marginLeft:"16px"}}>
            <CloseIcon />
          </IconButton>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center',  }}>
          <Typography variant="bodyP2" sx={{justifyContent:"flex-start"}} >
           {subtitle}
          </Typography>

         
        </Box>


        <Box
            sx={{
              //paddingTop: '1.5rem',
              //paddingBottom: '1.5rem',
              display: 'flex',
              justifyContent: 'flex-end',
              alignItems: 'flex-end',
              gap: 'var(--12, 0.75rem)',
              alignSelf: 'stretch',
            }}
          >
            <Button
              btnType="secondaryGray"
              sx={{
                color: 'color: var(--Grey-grey-600, #606977)',
                backgroundColor: 'var(--Colors-Base-00, #FFF)',
                fontWeight: 700,
              }}
              onClick={handleClose}
            >
              Cancel
            </Button>
            <Button
              btnType="error"
              // sx={{...primaryColor,
              //   borderRadius: '0.375rem',
              //   color: palette.common.white,
                
              //   fontWeight: 700,
              // }}
              onClick={handleDelete}
            >
              Delete
            </Button>
          </Box>
        </Box>
    </Modal>
  );
};

export default DeleteModal;
