import React, { useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import { ButtonGroup, IconButton, Modal, Typography } from '@mui/material';
import Box from '@mui/material/Box';

import { Button } from '@/components/commun/Button';
import { palette } from '@/styles/theme/colors';

interface DeleteConfirmationProps {
  open: boolean;
  setOpen: any;
  handleDelete: any;
}

const DeleteConfirmation: React.FC<DeleteConfirmationProps> = ({ open, setOpen, handleDelete }) => {
  const handleClose = () => setOpen(false);
  

  return (
    <Modal open={open} onClose={() => handleClose}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '40%',
          display: 'flex',
          padding: '1.5rem',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: '0.375rem',
          background: palette.common.white,
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Typography variant="h4" sx={{ padding: '1.5rem' }}>
            Do you want to delete this?
          </Typography>
          <IconButton aria-label="close">
            <CloseIcon />
          </IconButton>
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-start' }}>
          <Typography variant="body2" sx={{ textAlign: 'right' }}>
            Are you sure you want to delete?
          </Typography>

          <Box
            sx={{
              paddingTop: '1.5rem',
              paddingBottom: '1.5rem',
              display: 'flex',
              justifyContent: 'flex-end',
              alignItems: 'flex-start',
              gap: 'var(--12, 0.75rem)',
              alignSelf: 'stretch',
            }}
          >
            <Button
              btnType="secondary"
              sx={{
                color: 'color: var(--Grey-grey-600, #606977)',
                backgroundColor: 'var(--Colors-Base-00, #FFF)',
                fontWeight: 700,
              }}
              onClick={handleClose}
            >
              cancel
            </Button>
            <Button
              btnType="primary"
              sx={{
                borderRadius: '0.375rem',
                color: palette.common.white,
                backgroundColor: palette.danger[500],
                fontWeight: 700,
              }}
              onClick={handleDelete}
            >
              Delete
            </Button>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};

export default DeleteConfirmation;
