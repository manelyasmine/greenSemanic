import React from 'react';
import { Alert, Snackbar, SnackbarProps } from '@mui/material';

export type ToastProps = SnackbarProps & {
  open: boolean;
  action?: React.ReactNode;
  // btnType?: 'primary' | 'secondary' | 'tertiary' | 'primaryLight' | 'secondaryGray' | 'dashBorder' | 'link' | 'error';
  //size?: 'small' | 'medium' | 'large';
  autoHideDuration?: number;
  handleClose: () => void;
  message: React.ReactNode;
  type: 'success' | 'error' | 'info';
  vertical?: 'top' | 'bottom';
  horizontal?: 'left' | 'right' | 'center';
};
export default function Toast({
  type,
  open,
  autoHideDuration = 3000,
  handleClose,
  message,
  action,
  vertical = 'bottom',
  horizontal = 'center',
}: ToastProps) {
  return (
    <Snackbar
      open={open}
      autoHideDuration={autoHideDuration}
      onClose={handleClose}
      action={action}
      anchorOrigin={{ vertical, horizontal }}
      sx={{
        width: '4000px', // Custom width
      }}
    >
      <Alert
        severity={type}
        onClose={handleClose}
        sx={{
          width: '400px', // Custom width
        }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
}
