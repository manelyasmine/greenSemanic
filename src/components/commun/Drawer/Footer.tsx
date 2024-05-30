import React, { useState } from 'react';
import { Label } from '@mui/icons-material';
import CloseIcon from '@mui/icons-material/Close';
import { Box, Drawer, Grid, IconButton, TextField, Typography } from '@mui/material';
import Card from '@mui/material/Card';
import Divider from '@mui/material/Divider';
import Slide from '@mui/material/Slide';

import { FooterBody, FooterBox, HeaderBody } from '@/styles/theme/Bottom-drawer';
import { palette } from '@/styles/theme/colors';
import { Filter } from '@/styles/theme/Filter';

import { Button } from '../Button';

interface FooterProps {
  handleCancelTarget: () => void;
  handleCreateTarget: any; // Function to handle task creation
}

const Footer: React.FC<FooterProps> = ({ handleCancelTarget, handleCreateTarget }) => {
  return (
    <Grid sx={FooterBox}>
      <Grid sx={FooterBody}>
        <Button btnType={'secondary'} onClick={handleCancelTarget}>
          Cancel
        </Button>

        <Button variant="contained" color="primary" onClick={handleCreateTarget}>
          Confirm
        </Button>
      </Grid>
    </Grid>
  );
};

export default Footer;
