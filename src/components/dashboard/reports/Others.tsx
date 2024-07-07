import React, { useState } from 'react';
import { DeleteIcon, DotsHorizontal, DownloadIcon, ShareIcon } from '@/icons';
import { MoreVert as MoreVertIcon } from '@mui/icons-material';
import { Divider, IconButton, ListItemIcon, ListItemText, Menu, MenuItem } from '@mui/material';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import { useDispatch, useSelector } from 'react-redux';

import { Target } from '@/types/target';
import api from '@/lib/api';
import { reportApis } from '@/lib/report/reportApis';
import { setOpenToast } from '@/lib/store/reducer/useGlobalActions';
import { setTargets } from '@/lib/store/reducer/useTarget';
import { targetApis } from '@/lib/target/targetApis';
import DeleteConfirmation from '@/components/commun/Alerts/DeleteConfirmation';
import { palette } from '@/styles/theme/colors';

import ExportRapport from './ExportRapport';
import ExportStep1 from './ExportStep1';

interface OthersProps {
  report: any;
}

const Others: React.FC<OthersProps> = ({ report }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);
  const { targets } = useSelector((state: any) => state.target);

  const { user } = useSelector((state: any) => state.user);
  const [activeStep, setActiveStep] = useState(0);
  console.log('otehrs', report);

  const [roleToDelete, setRoleToDelete] = useState<Report | null>(null);
  const dispatch = useDispatch();

  const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    console.log('nexttt', activeStep);
  };

  const handleDeleteReport = React.useCallback(async (): Promise<void> => {
    console.log('handle delete role===>', report.id);

    const { error } = await reportApis.deleteReport(report._id, user);
    if (error) {
      dispatch(setOpenToast({ message: error, type: 'error' }));
      return;
    }
    dispatch(setOpenToast({ message: 'Data Added Successfully', type: 'success' }));
    /* const newRoles = report.filter((role) => role._id !== roleToDelete._id);

     dispatch(setReport(newRoles));
    setIsDelete(false);
    setReportToDelete(null);  */
  }, [dispatch]);

  const handleModify = React.useCallback(
    async (data: Target): Promise<void> => {
      const { error, res } = await targetApis.updateTarget(data);
      if (!error) {
        const newTargets = targets.map((tar: Target) => (tar.id === data.id ? data : tar));
        dispatch(setOpenToast({ message: 'Target Added Successfully', type: 'success' }));
        dispatch(setTargets(newTargets));
        setIsUpdate(false);
      } else {
        dispatch(setOpenToast({ message: 'Something wrong' + error, type: 'error' }));
      }
      handleClose();
    },
    [dispatch, targets]
  );

  const handleDelete = React.useCallback(async (): Promise<void> => {
    const { error, res } = await targetApis.deleteTarget(target.id);
    if (!error) {
      const newTargets = targets.filter((_: any, i: any) => i !== targets.indexOf(target));
      dispatch(setTargets(newTargets));
      setIsDeleteOpen(false);
    }
    handleClose();
  }, [dispatch, report, targets]);

  const handleDownload = () => {
    if (report.downloadURL) {
      window.open(api + '/' + report.downloadURL, '_blank');
    }
  };
  return (
    <div>
      <IconButton onClick={handleOpen}>
        <DotsHorizontal />
      </IconButton>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        MenuListProps={{ 'aria-labelledby': 'dropdown-button' }}
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          padding: '14px 0px',
          gap: '12px',
          borderRadius: '6px',
          border: '1px solid var(--Colors-Primary-Slate-200, #FFF)',

          boxShadow: '0px 20px 24px -4px rgba(45, 54, 67, 0.04), 0px 8px 11px -4px rgba(45, 54, 67, 0.04)',
        }}
      >
        <MenuItem
          onClick={() => {
            handleDownload();
          }}
          sx={{
            display: 'flex',
            alignItems: 'center',
            alignSelf: 'stretch',
            padding: '10px 16px 10px 20px',
            gap: '10px',
          }}
        >
          <ListItemIcon>
            <DownloadIcon />
          </ListItemIcon>
          <ListItemText primary="Download" />
        </MenuItem>
        <Divider variant="middle" />
        <MenuItem
          onClick={() => {
            handleClose();
            setIsUpdate(!isUpdate);
          }}
          sx={{
            display: 'flex',
            alignItems: 'center',
            alignSelf: 'stretch',
            padding: '10px 16px 10px 20px',
            gap: '10px',
          }}
        >
          <ListItemIcon>
            <ShareIcon />
          </ListItemIcon>
          <ListItemText primary="Share" />
        </MenuItem>
        <Divider variant="middle" />
        <MenuItem
          onClick={() => {
            handleClose();
            setIsDeleteOpen(!isDeleteOpen);
          }}
          sx={{
            display: 'flex',
            alignItems: 'center',
            alignSelf: 'stretch',
            padding: '10px 16px 10px 20px',
            gap: '10px',
          }}
        >
          <ListItemIcon>
            <DeleteIcon />
          </ListItemIcon>
          <ListItemText primary="Delete" />
        </MenuItem>
      </Menu>
      {isDeleteOpen && (
        <DeleteConfirmation
          open={isDeleteOpen}
          setOpen={setIsDeleteOpen}
          handleDelete={handleDeleteReport}
          title="Do you want to delete this?"
          subtitle="Are you sure you want to delete this file."
          primary="Delete"
          secondary="Cancel"
          primaryColor={{ backgroundColor: palette.danger[500] }}
        />
      )}
    </div>
  );
};

export default Others;
