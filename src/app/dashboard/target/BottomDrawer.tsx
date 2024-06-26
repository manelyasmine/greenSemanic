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
import { setOpenToast } from '@/lib/store/reducer/useGlobalActions';
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
    
    const { res , error } = await targetApis.createTarget(newTarget);
    if (error) {
     // setErrorAlert(error);

dispatch(setOpenToast({ message: 'Something wrong '+error, type: 'error' }));
      return
    }
    dispatch(setOpenToast({ message: 'Target Added Successfully', type: 'success' }));
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
