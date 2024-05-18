import React, { useState } from 'react';
import {Box, Drawer,Grid} from '@mui/material';
import Divider from '@mui/material/Divider'; 
import Slide from '@mui/material/Slide'; 
import HeaderDrawer from '@/components/commun/Drawer/Header';
import Form from '@/components/commun/Drawer/Form';
import Footer from '@/components/commun/Drawer/Footer';
import { useMediaQuery } from '@mui/material';


const ResponsiveDrawer = ({ anchor, open, onClose,setNewTask,newTask,handleCreateTask, ...otherProps }) => {
  const isMobile = useMediaQuery('(max-width: 600px)'); // Adjust breakpoint for mobile as needed
  const isLaptop = useMediaQuery('(min-width: 600px) and (max-width: 1024px)'); // Adjust breakpoint for laptop

  const drawerContent = (
    <Grid sx={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
    }}>
      <HeaderDrawer {...otherProps} onClose={onClose} open={open} />
      <Form {...otherProps} setNewTask={setNewTask} newTask={newTask} handleCreateTask={handleCreateTask} />
      <Divider />
      <Footer {...otherProps} handleCancelTask={onClose} handleCreateTask={handleCreateTask} />
    </Grid>
  );

  return (
    <Drawer anchor={anchor} open={open} onClose={onClose}>
      {isMobile ? (
        <Slide direction="up" in={open} mountOnEnter unmountOnExit>
          {drawerContent}
        </Slide>
      ) : (
        <>
          {isLaptop && (
            <Box sx={{ width: '500px', minWidth: '350px', maxWidth: '600px' }}> {/* Adjust width for laptops */}
              {drawerContent}
            </Box>
          )}
          {!isLaptop && ( // Render with flexbox for larger screens
            <Box sx={{ width: 'flex', minHeight: 'calc(100vh - 64px)' }}> {/* Adjust height for large screens */}
              {drawerContent}
            </Box>
          )}
        </>
      )}
    </Drawer>
  );
};

export default ResponsiveDrawer;
