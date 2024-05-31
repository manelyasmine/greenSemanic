import React, { useState } from 'react';
import { AssignIcon, DashboardIcon, DeleteIcon, DotsHorizontal, ModifyIcon } from '@/icons';
import { MoreVert as MoreVertIcon, Update } from '@mui/icons-material';
import { Divider, IconButton, ListItemIcon, ListItemText, Menu, MenuItem } from '@mui/material';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import { useDispatch, useSelector } from 'react-redux';

import { Target } from '@/types/target';
import { setTargets } from '@/lib/store/reducer/useTarget';
import { targetApis } from '@/lib/target/targetApis';
import DeleteConfirmation from '@/components/commun/Alerts/DeleteConfirmation';
import { DropDOwn, itemMenu } from '@/styles/theme/DropDown';
import UpdateBottomDrawer from '@/app/dashboard/target/UpdateBottomDrawer';
import { palette } from '@/styles/theme/colors';
interface DropdownProps {
  // Function to handle modification triggered from the dropdown
  // onModify?: (data: any) => void;
  // // Function to handle deletion triggered from the dropdown
  // onDelete?: (data: any) => void;
  // // Function to handle assignment triggered from the dropdown (optional)
  // onAssign?: (data: any) => void;
  target: Target;
}
 
const Dropdown: React.FC<DropdownProps> = ({ task }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isUpdate , setIsUpdate] = useState(false)
  //const { targets } = useSelector((state: any) => state.target);
  //const { targets } = useSelector((state: any) => state.target);
  const dispatch = useDispatch();
  const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  // const handleModify = () => {
  //   handleClose();
  //   // onModify?.(); // Call the onModify function if provided
  // };

  const handleModify = React.useCallback(async (data:  Target): Promise<void> => {

    // const { error, res } = await targetApis.updateTarget(data);
    // if (error) {
    //   return;
    // } else {
    //   const indexToRemove = targets.indexOf(target);
    //   //const newTargets = targets.filter((_: any, i: any) => i !== indexToRemove);
    // const { error, res } = await targetApis.updateTarget(data);
    // if (error) {
    //   return;
    // } else {
    //   const indexToRemove = targets.indexOf(target);
    //   //const newTargets = targets.filter((_: any, i: any) => i !== indexToRemove);

    //   const newTargets =  targets.map((tar : Target) => {
    //     if (tar.id === data.id) {
    //       return data;
    //     }
    //     return tar;
    //   });
    //   //setIsDeleteOpen(false);
    //   dispatch(setTargets(newTargets));
    //   setIsUpdate(false)
    // }
    // handleClose();
    //   const newTargets =  targets.map((tar : Target) => {
    //     if (tar.id === data.id) {
    //       return data;
    //     }
    //     return tar;
    //   });
    //   //setIsDeleteOpen(false);
    //   dispatch(setTargets(newTargets));
    //   setIsUpdate(false)
    // }
    // handleClose();
  }, []);

  const handleDelete = React.useCallback(async (): Promise<void> => {

    // const { error, res } = await targetApis.deleteTarget(target.id);
    // if (error) {
    //   return;
    // } else {
    //   const indexToRemove = targets.indexOf(target);
    //   const newTargets = targets.filter((_: any, i: any) => i !== indexToRemove);
    //   setIsDeleteOpen(false);
    //   dispatch(setTargets(newTargets));
    // }
    // const { error, res } = await targetApis.deleteTarget(target.id);
    // if (error) {
    //   return;
    // } else {
    //   const indexToRemove = targets.indexOf(target);
    //   const newTargets = targets.filter((_: any, i: any) => i !== indexToRemove);
    //   setIsDeleteOpen(false);
    //   dispatch(setTargets(newTargets));
    // }

    // handleClose();
    // handleClose();
  }, []);

  const handleAssign = () => {
    handleClose();
    //onAssign?.(); // Call the onAssign function if provided (optional)
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
      >
        <Box sx={DropDOwn}>
          <MenuItem onClick={() => {handleClose() ,setIsUpdate(!isUpdate)}} sx={itemMenu}>
            <ListItemIcon>
              {' '}
              <ModifyIcon />{' '}
            </ListItemIcon>
            <ListItemText primary="Modify" />
          </MenuItem>
          <Divider variant="middle" />
          <MenuItem
            onClick={() => {
              setIsDeleteOpen(!isDeleteOpen);
            }}
            sx={itemMenu}
          >
            <ListItemIcon>
              {' '}
              <DeleteIcon />{' '}
            </ListItemIcon>
            <ListItemText primary="Delete" />
          </MenuItem>
          <Divider variant="middle" />
          <MenuItem onClick={handleAssign} sx={itemMenu}>
            <ListItemIcon>
              {' '}
              <AssignIcon />{' '}
            </ListItemIcon>
            <ListItemText primary="Assign" />
          </MenuItem>
        </Box>
      </Menu>
     {/* <DeleteConfirmation open={isDeleteOpen} setOpen={setIsDeleteOpen} handleDelete={handleDelete} />
      */}
          {isDeleteOpen &&
        <DeleteConfirmation
          open={isDeleteOpen}
          setOpen={setIsDeleteOpen}
          title="Do you want to delete this?"
          subtitle="Are you sure you want to delete this file."
          primary="Delete"
          secondary="Cancel"
          handleDelete={handleDelete} 
          primaryColor={{ backgroundColor: palette.danger[500] }}
        />}
     {/*   <UpdateBottomDrawer open={isUpdate} onClose={() => setIsUpdate(!isUpdate)} onUpdateTarget={handleModify } target ={target} />
   */}  </div>
  );
};

export default Dropdown;
