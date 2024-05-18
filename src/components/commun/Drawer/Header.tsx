import React, { useState } from 'react';
import {
  Box,
  Button,
  Drawer,
  Grid,
  IconButton,
  
  TextField,
  Typography,
} from '@mui/material';

import Divider from '@mui/material/Divider';
import { Label } from '@mui/icons-material';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import {  Filter,  } from '@/styles/theme/Filter';
import {header,body,HeaderBody} from '@/styles/theme/Bottom-drawer';
import Card from '@mui/material/Card';
 
 
interface HeaderProps {
    open: boolean;
    onClose: () => void;
    onCreateTask: (task: string) => void; // Function to handle task creation
  }

const Header: React.FC<HeaderProps> = ({ open, onClose, onCreateTask }) => {
    return (
 
        <Box sx={header}>
         
            <Typography 
            variant="h4"   
            sx={{ color: 'var(--Foundation-Grey-grey-700, #121417)',
            fontFeatureSettings: '"cv04" on, "cv03" on, "cv02" on, "cv11" on, "clig" off, "liga" off',
          }}
          >    Add Target 
          </Typography>
       <Box sx={{ display: "flex", alignItems: "center" }}>
        <Typography /* variant="help" */  >
          need help?
        </Typography>
        <IconButton onClick ={onClose } sx={{ marginLeft: 8 }}>
          <CloseIcon />
        </IconButton>
      </Box>
      </Box>
      
      
   
  );
};

export default Header;
