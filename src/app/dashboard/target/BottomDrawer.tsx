import React, { useState } from 'react';
import {Box, Drawer,} from '@mui/material';
import Divider from '@mui/material/Divider'; 
import Slide from '@mui/material/Slide'; 
import HeaderDrawer from '@/components/commun/Drawer/Header';
import Form from '@/components/commun/Drawer/Form';
import Footer from '@/components/commun/Drawer/Footer';
import ResponsiveDrawer from './ResponsiveDrawer';
interface BottomDrawerProps {
  open: boolean;
  onClose: () => void;
  onCreateTask: (task: string) => void; // Function to handle task creation
}

const BottomDrawer: React.FC<BottomDrawerProps> = ({ open, onClose, onCreateTask }) => {
  const [newTask, setNewTask] = useState('');

  const handleCreateTask = () => {
    onCreateTask(newTask);
    setNewTask('');
    onClose();
  }; 
 
  return ( 
    
    <ResponsiveDrawer
    anchor="bottom" // Adjust anchor position as needed
    open={open} 
    onClose={onClose}
    setNewTask={setNewTask} newTask={newTask} handleCreateTask={handleCreateTask} handleCancelTask={onClose}
    // Pass any additional props needed by the drawer components
  />
  );
};

export default BottomDrawer;
