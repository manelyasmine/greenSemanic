"use client";
import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { MuiButton } from '@/styles/theme/components/button';
import { TextField } from '@mui/material';
import { palette } from '@/styles/theme/colors';
import Stack from '@mui/material/Stack';
import {GreneIcon,CameraIcon} from '@/icons';
import Divider from '@mui/material/Divider'; 
import { makeStyles } from '@mui/styles'; // Import for creating custom styles

import styled from '@emotion/styled';
import {
  
  Grid,Button
  
} from '@mui/material';  
import MyButton from './MyButton';
const useStyles = makeStyles((theme) => ({
  rowContainer: {
    display: 'flex',
    flexDirection: 'column', // Change to 'row' for horizontal arrangement
    justifyContent: 'center', // Center elements horizontally
    alignItems: 'center', // Center elements vertically (optional)
  },
}));
const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});
export const CompanyLogo = ({  onLogoChange, hasLogo = false}) => {
  const classes = useStyles(); // Use the custom styles

  const handleLogoUpload = (event) => {
    console.log("handle logo updat")
    const file = event.target.files[0];
    if (file && onLogoChange) {
      onLogoChange(file); // Pass uploaded file to parent component
    }
  };
  return (
    <Grid item xs={3}   
    sx={{display: 'flex',
    height: '14.4375rem',
    padding: '0rem 3.1875rem',
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: 'var(--12, 0.75rem)'}}>
  
    <Stack direction="column" className={classes.rowContainer}>
    <Typography variant="bodyB2" sx={{ color: "#24292F", fontFeatureSettings: '"cv04" on, "cv03" on, "cv02" on, "cv11" on, "clig" off, "liga" off' }}>
      Company Logo
    </Typography>
      <span  style={{
        display: 'flex',
        height: '4.4375rem',
        padding: '0rem 3.1875rem',
        flexDirection: 'column',
        alignItems: 'flex-start',
        gap: 'var(--12, 0.75rem)'
      }}  >{/* Content for the span */}</span>
    
      {hasLogo ? (
          <GreneIcon />
        ) : (
          <GreneIcon />
        )}

<VisuallyHiddenInput type="file" onChange={handleLogoUpload} accept=".jpg,.jpeg,.png" />
      <Button btnType="secondary"  
       variant="contained"
       style={{ 
         borderRadius: '2rem',
          background: "var(--Green-green-400, #3CCB7F)",
          
          display: 'flex',
width: '2.25rem',
height: '2.25rem',
padding: '0.5rem',
justifyContent: 'center',
alignItems: 'center',
gap: '0.5rem',
       }}
 >

     <CameraIcon/>
    </Button>
    </Stack>
  </Grid>
  );
};

 
