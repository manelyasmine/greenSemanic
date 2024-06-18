'use client';

import React,{useState,useEffect,useCallback} from 'react';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Checkbox from '@mui/material/Checkbox';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead'; 
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import dayjs from 'dayjs';

import DeleteConfirmation from '@/components/commun/Alerts/DeleteConfirmation';
import { AssignIcon, DashboardIcon, DeleteIcon, DotsHorizontal, ModifyIcon } from '@/icons';
import { useSelection } from '@/hooks/use-selection'; 
import DropdownTableCell from '@/components/DropDown/DropdownTableCell';
import FilterColumns from '../../commun/Filters/FilterColumns';
import { Pagination,IconButton } from '@mui/material';
import { Task } from '@/types/task';
import { taskApis } from '@/lib/task/taskApis';
import { setTasks } from '@/lib/store/reducer/useTask';
import { useDispatch, useSelector } from 'react-redux';
import { palette } from '@/styles/theme/colors';
import UpdateBottomDrawerTask from "@/app/dashboard/tasks/UpdateBottomDrawer";
import {   ListItemIcon, ListItemText, Menu, MenuItem } from '@mui/material';
import { TroubleshootSharp } from '@mui/icons-material';
interface TasksTableProps {
  count?: number;
  page?: number;
   
  rowsPerPage?: number; 
  search:any;
  selectedTab:string;
}

export function TasksTable({ count = 100, rowsPerPage = 5, selectedTab = "All Tasks" }: TasksTableProps): React.JSX.Element {
  const dispatch = useDispatch();

  const { tasks } = useSelector((state: any) => state.task); 
  const { targets } = useSelector((state: any) => state.target);
  const { users } = useSelector((state: any) => state.user); 
  const [page, setPage] = useState(1);
  const [selectedRow,setSelectedRow]=useState(null);
  const [totalPages, setTotalPages] = useState(10);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null);
const [searchInput,setSearchInput]=useState('')
const [searchDate,setSearchDate]=useState('')
const [modify,setModify]=useState(false);
const [isAssign,setIsAssign]=useState(false);
const [isDeleteOpen,setIsDeleteOpen]=useState(false);

console.log("targets",targets)
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>, taskId: string) => {
    setAnchorEl(event.currentTarget);
    setSelectedTaskId(taskId);

  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedTaskId(null);
  };
  const handleClose=()=>{
    setAnchorEl(null);
    setSelectedTaskId(null);
    setModify(false);
    setIsAssign(false);

  }

  const handleModify = (event: React.MouseEvent<HTMLElement>, task: Task) => {
    setAnchorEl(event.currentTarget);
    setSelectedTaskId(task?.id);
    setModify(true); 
   // const selectedTask = tasks.find((task) => task.id === taskId); // Find the selected task
 setSelectedRow(task) 

    console.log("hnale modify",task)
    
    handleMenuClose();
  };

  const handleAssign = (event: React.MouseEvent<HTMLElement>, task: Task) => {
    setAnchorEl(event.currentTarget);
    setSelectedTaskId(task?.id);
    setIsAssign(true); 
   // const selectedTask = tasks.find((task) => task.id === taskId); // Find the selected task
 setSelectedRow(task) 

    console.log("hnale modify",task)
    
    handleMenuClose();
  };


  
 
  const handleDelete = (task: Task) => {
   
    setSelectedTaskId(task?.id);
    setIsDeleteOpen(true);  
    setSelectedRow(task) 
    console.log("handleDelete==>",task, selectedRow)
     
  };

  const getTasks = React.useCallback(async (): Promise<void> => {
    try {
      const filters = {
        dueDate: searchDate,
        page: 1,
        limit: 15,
        search: searchInput,
      };

      const { error, res } = await taskApis.getTasks(filters);

      if (error) {
        return;
      }

      dispatch(setTasks(res));
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  }, [selectedTab, page, rowsPerPage, dispatch, searchInput, searchDate]);

  useEffect(() => {
    getTasks();
  }, [getTasks]);

  const onFilterByDate = (selectedDate: Date) => {
    const selectedDateObjFormat = dayjs(selectedDate).format('YYYY-MM-DD');
    setSearchDate(selectedDateObjFormat);
  };

  const onFilterBySearch = (search) => {
    setSearchInput(search);
  };

  const handleUpdateTask=useCallback(async (data:  any): Promise<void> => {
    console.log("update",data.usersIds)
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
     


    }
    handleClose();
  }, []);
  const handleAssignTask = React.useCallback(async (data:  any): Promise<void> => {
    console.log("handle assign data===>",Object.keys(data))
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
       
    }
    handleClose();
  }, []);
  const handleDeleteTask = React.useCallback(async (data: string): Promise<void> => {
    console.log("handle deelte task===>", data, selectedRow, selectedTaskId);
    const { error, res } = await taskApis.deleteTask(selectedRow?.id);
    if (error) {
      return;
    } else {
      const indexToRemove = tasks.indexOf(selectedRow);
      const newTasks = tasks.filter((_: any, i: any) => i !== indexToRemove);
      setIsDeleteOpen(false);
      // Update tasks in Redux store
      dispatch(setTasks(newTasks));
      // Clear selected row state
      setSelectedRow(null);
    }
  
    handleClose();
  }, [dispatch, tasks, selectedRow]);



  return (
    <Card>
      <FilterColumns onFilterByDate={onFilterByDate} onFilterBySearch={onFilterBySearch} />
      <Divider />
      <Box sx={{ overflowX: 'auto' }}>
        <Table sx={{ minWidth: '800px' }}>
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox"></TableCell>
              <TableCell>Tasks</TableCell>
              <TableCell>Due Date</TableCell>
              <TableCell>Assigned Users</TableCell>
              <TableCell>Progress</TableCell>
              <TableCell>Target Name</TableCell>
              <TableCell>Base To Target Year</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tasks.map((row) => (
              <TableRow hover key={row.id}>
                <TableCell padding="checkbox"></TableCell>
                <TableCell><Typography variant="bodyB3">{row.taskName}</Typography></TableCell>
                <TableCell>{dayjs(row.dueDate).format('MMM D, YYYY')}</TableCell>
<TableCell>
  {Array.isArray(row.usersIds) ? (
    row.usersIds.map((user, index) => (
      <span key={index}>{user.username}</span>
    ))
  ) : (
    <span></span>
  )}
</TableCell>
<TableCell>70%</TableCell>
<TableCell><Typography variant="bodyP3">{row.targetName}</Typography></TableCell>
<TableCell>2020-2023</TableCell>
<TableCell>
  <Box display="flex" justifyContent="center" alignItems="center">
    <IconButton onClick={(event) => handleMenuOpen(event, row.id)}>
      <DotsHorizontal />
    </IconButton>
    <Menu
      anchorEl={anchorEl}
      open={Boolean(anchorEl) && selectedTaskId === row.id}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={(event) => handleModify(event, row)}>
        <ModifyIcon fontSize="small" />
        Modify
      </MenuItem>
      <MenuItem onClick={(event) => handleAssign(event, row)}>
        <AssignIcon fontSize="small" />
        Assign
      </MenuItem>
      <MenuItem onClick={()=>handleDelete(row)}>
        <DeleteIcon fontSize="small" />
        Delete
      </MenuItem>
      {isDeleteOpen && selectedRow && (
        <DeleteConfirmation
          open={isDeleteOpen}
          setOpen={setIsDeleteOpen}
          title="Do you want to delete this?"
          subtitle="Are you sure you want to delete this file."
          primary="Delete"
          secondary="Cancel"
          handleDelete={handleDeleteTask} 
          primaryColor={{ backgroundColor: palette.danger[500] }}
        />)}
    </Menu>

  
  </Box>
</TableCell>
</TableRow>
))}
</TableBody>
</Table>
</Box>
<Divider />
{modify && selectedRow && (
       <UpdateBottomDrawerTask 
       open={modify} 
       handleCancelTask={ handleClose } 
       onUpdateTask={handleUpdateTask } 
       task={selectedRow}
       users={users} 
       targets={targets} 
       isAssign={false}  

       headerName="Edit Task"
       titleName="Edit a Task"
       subtitleName="Edit a task to further streamline your carbon emission management process."
       
       />)
      }
{isAssign && selectedRow && (
       <UpdateBottomDrawerTask 
       open={isAssign} 
       handleCancelTask={ handleClose } 
       onUpdateTask={handleAssignTask } 
       task={selectedRow}
       users={users} 
       targets={targets} 
       isAssign={isAssign}  

       headerName="Assign Task"
       titleName="Assign a Task"
       subtitleName="Assign a task to further streamline your carbon emission management process."
       
       />)
      }


<Box display="flex" justifyContent="center">
<Pagination
count={count}
page={page}
onChange={handleChangePage}
color="primary"
size="medium"
showFirstButton
showLastButton
shape="rounded"
/>
</Box>
</Card>
);
}
