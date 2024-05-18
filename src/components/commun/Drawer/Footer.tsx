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

import {FooterBody,FooterBox,HeaderBody} from '@/styles/theme/Bottom-drawer';
import Card from '@mui/material/Card';
 
 
interface FooterProps {
    open: boolean;
    handleCancelTask: () => void;
    handleCreateTask: (task: string) => void; // Function to handle task creation
  }

const Footer: React.FC<FooterProps> = ({  handleCancelTask, handleCreateTask }) => {
    return (
 
        <Grid  sx={FooterBox}>
            <Grid sx={FooterBody}>
          <Button variant="contained" color="secondary" onClick={handleCancelTask}>
            Cancel
          </Button>

         <Button variant="contained" color="primary" onClick={handleCreateTask}>
            Confirm
          </Button>
      </Grid>
      </Grid>
      
      
   
  );
};

export default Footer;
