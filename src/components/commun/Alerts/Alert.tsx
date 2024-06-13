import React, { Children, useEffect, useState } from 'react';
import { Alert as MuiAlert, AlertProps as MuiAlertProps } from '@mui/material';
export type AlertProps = MuiAlertProps & {
  children?: React.ReactNode;
  sx?: any;
  severity: 'success' | 'error' | 'info' | 'warning';
  setChildren?: any;
};

export const Alert: React.FC<AlertProps> = ({ sx, severity, children , setChildren}: AlertProps) => {
  const [visible, setVisible] = useState(true);
    console.log('here'+children)
  useEffect(() => {
    const timer = setTimeout(() => {
        console.log('insude')
        setChildren('')
      //setVisible(false); // Hide the alert after 1 second
    }, 3000);

    // Clean up the timer when the component unmounts or re-renders
    return () => clearTimeout(timer);
  }, [children]);

  return (
    <>
      { children && (
        <MuiAlert severity={severity} sx={sx} >
          {children}
        </MuiAlert>
      )}
    </>
  );
};
