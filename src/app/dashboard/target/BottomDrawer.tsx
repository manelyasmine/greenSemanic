import { error } from 'console';

import React, { useState } from 'react';
import { Box, Drawer } from '@mui/material';
import Divider from '@mui/material/Divider';
import Slide from '@mui/material/Slide';

import { targetApis } from '@/lib/target/targetApis';
import { Alert } from '@/components/commun/Alerts/Alert';
import Footer from '@/components/commun/Drawer/Footer';
import Form from '@/components/commun/Drawer/Form';
import HeaderDrawer from '@/components/commun/Drawer/Header';

import ResponsiveDrawer from './ResponsiveDrawer';
import { useDispatch, useSelector } from 'react-redux';
import { setTargets } from '@/lib/store/reducer/useTarget';
import { Target } from '@/types/target';

interface BottomDrawerProps {
  open: boolean;
  onClose: () => void;
  onCreateTask: (task: string) => void; // Function to handle task creation
}

interface FormTarget {
  name?: string;
  type?: string;
  emissionReduction?: string;
  baseYear?: string;
}

const BottomDrawer: React.FC<BottomDrawerProps> = ({ open, onClose, onCreateTask }) => {
  const [newTarget, setNewTarget] = useState<Target>({});
  const [errorAlert, setErrorAlert] = useState('');
  const dispatch = useDispatch();
  const { targets } = useSelector((state: any) => state.target);
  const handleCreateTask = React.useCallback(async (): Promise<void> => {
    const regex = /^\d{4}-\d{4}$/;
    // if (!regex.test(newTarget.baseToTargetYear)){ 
    //   setErrorAlert('base To Target Year not ');
    //   return
    // }
    
    const { res , error } = await targetApis.createTarget(newTarget);
    if (error) {
      setErrorAlert(error);
      return
    }
    dispatch(setTargets([...targets , res]))
    onClose();
  }, [newTarget]);

  return (
    <ResponsiveDrawer
      anchor="bottom" // Adjust anchor position as needed
      open={open}
      onClose={onClose}
      setNewTarget={setNewTarget}
      newTarget={newTarget}
      handleCreateTarget={handleCreateTask}
      handleCancelTarget={onClose}
      alert={
        <Alert severity={'error'} setChildren={setErrorAlert}>
          {errorAlert}
        </Alert>
      }
      // Pass any additional props needed by the drawer components
    />
  );
};

export default BottomDrawer;
