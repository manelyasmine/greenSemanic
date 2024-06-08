import React, { useState,useEffect } from 'react';
import { AssignIcon, DashboardIcon, DeleteIcon, DotsHorizontal, ModifyIcon } from '@/icons';
import { MoreVert as MoreVertIcon, Update } from '@mui/icons-material';
import { Divider, IconButton, ListItemIcon, ListItemText, Menu, MenuItem } from '@mui/material';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import { useDispatch, useSelector } from 'react-redux';

import { Task } from '@/types/task';
import { setTasks } from '@/lib/store/reducer/useTask';

import { setUsers } from '@/lib/store/reducer/useUser';

import { taskApis } from '@/lib/task/taskApis';
import DeleteConfirmation from '@/components/commun/Alerts/DeleteConfirmation';
import { DropDOwn, itemMenu } from '@/styles/theme/DropDown'; 
import { palette } from '@/styles/theme/colors';

import UpdateBottomDrawerTask from "@/app/dashboard/tasks/UpdateBottomDrawer";
import { userApis } from '@/lib/user/userApis';
import { User } from '@/types/user';

import { Target } from '@/types/target';
import { setTargets } from '@/lib/store/reducer/useTarget';
import { targetApis } from '@/lib/target/targetApis';
interface DropdownTaskProps { 
  task: Task;
}
 

const DropdownTask: React.FC<DropdownTaskProps> = ({ task }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isUpdate , setIsUpdate] = useState(false)
  const { tasks } = useSelector((state: any) => state.task); 

  const { targets } = useSelector((state: any) => state.target);
  const { users } = useSelector((state: any) => state.users); 
  const dispatch = useDispatch();
  const [user, setUser] = React.useState<User>({});
  const [isAssign,setIsAssign]=useState(false);
  const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

<<<<<<< HEAD
 
=======
  const [user, setUser] = React.useState<User>({});
>>>>>>> 1099567 (modify ui for add task,add modify drawer ,integration for some apis task)

  const handleClose = () => {
    setAnchorEl(null);
    setIsUpdate(false)
<<<<<<< HEAD
    setIsAssign(false);
  };
  
 
  const handleModify = React.useCallback(async (data:  Task): Promise<void> => {

    const { error, res } = await taskApis.updateTask(data);
    if (error) {
      return;
    } else { 

      const newTasks =  targets.map((tar : Task) => {
        if (tar.id === data.id) {
          return data;
        }
        return tar;
      });
      //setIsDeleteOpen(false);
      dispatch(setTasks(newTasks));
      setIsUpdate(false)

=======
  };
  
  // const handleModify = () => {
  //   handleClose();
  //   // onModify?.(); // Call the onModify function if provided
  // };


  const handleModify = React.useCallback(async (data:  Task): Promise<void> => {

    const { error, res } = await taskApis.updateTask(data);
    if (error) {
      return;
    } else {
      const indexToRemove = tasks.indexOf(Task); 

      const newTasks =  targets.map((tar : Task) => {
        if (tar.id === data.id) {
          return data;
        }
        return tar;
      });
      //setIsDeleteOpen(false);
      dispatch(setTasks(newTasks));
      setIsUpdate(false)
>>>>>>> 1099567 (modify ui for add task,add modify drawer ,integration for some apis task)
    }
    handleClose();
  }, []);


  const handleAssign = React.useCallback(async (data:  Task): Promise<void> => {
    console.log("handle assign data===>",data)
    const { error, res } = await taskApis.assignTask(data);
    if (error) {
      return;
    } else { 

      const newTasks =  targets.map((tar : Task) => {
        if (tar.id === data.id) {
          return data;
        }
        return tar;
      });
     
      dispatch(setTasks(newTasks));
      setIsAssign(false)

    }
    handleClose();
  }, []);




















  const handleDelete = React.useCallback(async (): Promise<void> => {
    console.log("handle deelte task===>",task,Task)
    const { error, res } = await taskApis.deleteTask(task.id);
    if (error) {
      return;
    } else {
      const indexToRemove = tasks.indexOf(task);
      const newTasks = tasks.filter((_: any, i: any) => i !== indexToRemove);
      setIsDeleteOpen(false);
      dispatch(setTasks(newTasks));
    }

    handleClose();
  }, []);

  

 const handleTargets= React.useCallback(async (): Promise<void> => {
    handleClose();
    try {
      const { res } = await targetApis.getTargets();
      dispatch(setTargets(res));
       
      
    } catch (error) {
      console.error('Error fetching users:', error); 
    }
 
     
}, [dispatch]);  

 
const handleUsers= React.useCallback(async (): Promise<void> => {
  handleClose();
  try {
    const { res } = await userApis.getUsers();
    dispatch(setUsers(res));
    console.log("useeeeeeeeee",Object.keys(res),Object.keys(users))
      
    
  } catch (error) {
    console.error('Error fetching users:', error); 
  }
 
    
      }, 
[dispatch]);      

 const handleTargets= React.useCallback(async (): Promise<void> => {
    handleClose();
    try {
      const { res } = await targetApis.getTargets();
      dispatch(setTargets(res));
       
      
    } catch (error) {
      console.error('Error fetching users:', error); 
    }

    console.log("user api drop===>",users)
     
        }, [dispatch]);  

 
  const handleUsers= React.useCallback(async (): Promise<void> => {
          handleClose();
          try {
            const { res } = await userApis.getUsers();
            dispatch(setUsers(res));
            console.log("useeeeeeeeee",Object.keys(res),Object.keys(users))
             
            
          } catch (error) {
            console.error('Error fetching users:', error); 
          }
      
          console.log("user api drop===>",users)
           
              }, [dispatch]);      

  return (
    <div>
      <IconButton onClick={handleOpen}> <DotsHorizontal />  </IconButton>    
     <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        MenuListProps={{ 'aria-labelledby': 'dropdown-button' }}
      >
        <Box sx={DropDOwn}>
<<<<<<< HEAD
          <MenuItem onClick={() => {handleUsers() ,handleTargets(),setIsUpdate(!isUpdate)}} sx={itemMenu}> <ListItemIcon>  <ModifyIcon />  </ListItemIcon> <ListItemText primary="Modify" /></MenuItem>  
            <Divider variant="middle" />  
          <MenuItem onClick={() => {setIsDeleteOpen(!isDeleteOpen);  }}sx={itemMenu}> <ListItemIcon>  <DeleteIcon />    </ListItemIcon>  <ListItemText primary="Delete" /></MenuItem>
=======
          <MenuItem onClick={() => {handleUsers() ,handleTargets(),setIsUpdate(!isUpdate)}} sx={itemMenu}>
            <ListItemIcon>
              {' '}
              <ModifyIcon />{' '}
            </ListItemIcon>
            <ListItemText primary="Modify" />
          </MenuItem>
>>>>>>> 1099567 (modify ui for add task,add modify drawer ,integration for some apis task)
          <Divider variant="middle" />
          <MenuItem onClick={() => {handleUsers() ,handleTargets(),setIsAssign(!isAssign)}} sx={itemMenu}>   <ListItemIcon>  <AssignIcon />   </ListItemIcon><ListItemText primary="Assign" /> </MenuItem>
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
<<<<<<< HEAD
      {(isUpdate  ) &&(
       <UpdateBottomDrawerTask 
       open={isUpdate  } 
       handleCancelTask={ handleClose } 
       onUpdateTask={handleModify } 
       task ={task} 
       users={users} 
       targets={targets} 
       isAssign={isAssign}
       headerName="Update Task"
       titleName="Update a Task"
       subtitleName="update task to further streamline your carbon emission management process."
       
       />)
      }

{( isAssign) &&(
       <UpdateBottomDrawerTask 
       open={isAssign} 
       handleCancelTask={ handleClose } 
       onUpdateTask={handleAssign } 
       task ={task} 
       users={users} 
       targets={targets} 
       isAssign={isAssign}

       headerName="Assign Task"
       titleName="Assign a Task"
       subtitleName="assign a task to further streamline your carbon emission management process."
       
       />)
      }
=======

       <UpdateBottomDrawerTask open={isUpdate} handleCancelTask={ handleClose } onUpdateTask={handleModify } task ={task} users={users} targets={targets} />
>>>>>>> 1099567 (modify ui for add task,add modify drawer ,integration for some apis task)
     </div>
  );
};

export default DropdownTask;
