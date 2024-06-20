'use client';

import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Plus as PlusIcon } from '@phosphor-icons/react/dist/ssr/Plus';
import dayjs from 'dayjs';
import { useDispatch, useSelector } from 'react-redux';

import { Task } from '@/types/task';
import { User } from '@/types/user';
import { setTargets } from '@/lib/store/reducer/useTarget';
import { setTasks } from '@/lib/store/reducer/useTask';
import { targetApis } from '@/lib/target/targetApis';
import { taskApis } from '@/lib/task/taskApis';
import { userApis } from '@/lib/user/userApis';
import CustomTabs from '@/components/commun/Tabs/taskTabs';
import { MyTasksTable } from '@/components/dashboard/tasks/myTasks-table';
import { TasksTable } from '@/components/dashboard/tasks/tasks-table';

import BottomDrawer from './BottomDrawer';
import { setOpenToast } from '@/lib/store/reducer/useGlobalActions';

export default function Page(): React.JSX.Element {
  const [selectedTab, setSelectedTab] = React.useState<string>('All Tasks');
  const [users, setUsers] = useState<User>({});
  const [isNewTask, setIsNewTask] = useState(false);
  const { tasks } = useSelector((state: any) => state.task);
  const { targets } = useSelector((state: any) => state.target);
  const { user } = useSelector((state: any) => state.user);
  const [paginatedTask, setPaginatedTasks] = useState<Task[]>([]);
  const [search, setSearch] = useState('');
  const [newTask, setNewTask] = useState<Task>({ ['createdBy']: user.id });
  const rowsPerPage = 5;
  const page = 0;
  const dispatch = useDispatch();

  const handleTabChange = (event: React.ChangeEvent<any>, newValue: string) => {
    setSelectedTab(newValue);
  };

  const [errorAlert, setErrorAlert] = useState('');
  const handleCreateTask = React.useCallback(async (): Promise<void> => {
    setNewTask({ ...newTask, ['createdBy']: user.id });
    const { res, error } = await taskApis.createTask(newTask);
    if (error) {
      // setErrorAlert(error);
      dispatch(setOpenToast({message : error, type:'error'}))
      return;
    }
    dispatch(setTasks([...tasks, res]));
    dispatch(setOpenToast({message : 'Task Added Successfully', type:'success'}))
    handleClose();
  }, [newTask]);

  /* const getTasks = React.useCallback(async (): Promise<void> => {
  console.log("search get tasks",search)
  try {
    const filters = {
      dueDate: '2022-11-3', // Filter by due date
      page: 1, // Optional pagination (assuming your API supports it)
      limit: 15, // Optional limit (assuming your API supports it)
      search:search,
    };
     
    const { error, res } = await taskApis.getTasks(filters);
     
    
    if (error) {
      return;
    }
    
    let filteredTasks: Task[];
    console.log("filteredTasksfilteredTasks==>",res[0].usersIds)
    if (selectedTab === 'All Tasks') {
      filteredTasks = res;

      console.log("filteredTasks all tasks",res)
    } else {
      //filteredTasks = res.filter((task: Task) =>  task.usersIds['_id'].includes(user.id)); 
       filteredTasks=res.filter((task: Task) => 
        task.usersIds.some((userObj: any) => userObj._id === user.id)
      );
      
      console.log("filteredTasks myyyyy tasks",filteredTasks)
    }

    dispatch(setTasks(filteredTasks));
    setPaginatedTasks(applyPagination(filteredTasks, page, rowsPerPage));
    setTasks(filteredTasks);
  } catch (error) {
    console.error('Error fetching tasks:', error);
  }
}, [selectedTab, user.id, page, rowsPerPage, dispatch]);

useEffect(() => {
  getTasks();
}, [getTasks]); */

  const handleTargets = React.useCallback(async (): Promise<void> => {
    try {
      const { res } = await targetApis.getTargets();
      dispatch(setTargets(res));
    } catch (error) {
      console.error('Error fetching targets:', error);
    }
  }, [dispatch]);

  const handleUsers = React.useCallback(async (): Promise<void> => {
    try {
      const { res } = await userApis.getUsers();

      //dispatch(setUsers(res));
      setUsers(res);
      console.log('useeeeeeeeee', users);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  }, [dispatch]);

  useEffect(() => {
    handleTargets();
    handleUsers();
  }, [handleTargets, handleUsers]);

  const handleFilterBySearch = (data) => {
    setSearch(data);
  };

  const handleClose = () => {
    setIsNewTask(false);
  };
  return (
    <Stack spacing={3}>
      <Stack direction="row" spacing={3}>
        <Stack spacing={1} sx={{ flex: '1 1 auto' }}>
          <Typography variant="h3">All Tasks</Typography>
          <Typography
            variant="body2"
            sx={{
              alignSelf: 'stretch',
              color: 'var(--Grey-grey-400, #88909F)',
              fontFeatureSettings: '"cv04" on, "cv03" on, "cv02" on, "cv11" on, "clig" off, "liga" off',
            }}
          >
            Below is a list of tasks in your carbon emission. Please review and ensure alignment with your
            sustainability objectives
          </Typography>

          <CustomTabs value={selectedTab} screen="tasks" handleChange={handleTabChange} />
        </Stack>
        <div>
          <Button
            startIcon={<PlusIcon fontSize="var(--icon-fontSize-md)" />}
            variant="contained"
            style={{
              borderRadius: '0.375rem',
              background: 'var(--Green-green-500, #16B364)',
            }}
            //onClick={()=>handleNewTask, setIsNewTask(!isNewTask)}
            onClick={() => {
              handleUsers(), handleTargets(), setIsNewTask(!isNewTask);
            }}
          >
            New Task
          </Button>
        </div>
      </Stack>

      <BottomDrawer
        open={isNewTask}
        handleCancelTask={handleClose}
        newTask={newTask}
        setNewTask={setNewTask}
        onCreateTask={handleCreateTask}
        users={users}
        targets={targets}
      />

      {selectedTab === 'All Tasks' && (
        <TasksTable
          count={paginatedTask.length}
          page={page}
          /* rows={tasks} */ rowsPerPage={rowsPerPage}
          selectedTab={'All Tasks'}
        />
      )}
      {selectedTab !== 'All Tasks' && (
        <MyTasksTable
          count={paginatedTask.length}
          page={page}
          /* rows={tasks} */ rowsPerPage={rowsPerPage}
          selectedTab={'My Tasks'}
        />
      )}
    </Stack>
  );
}

function applyPagination(rows: any[], page: number, rowsPerPage: number): Task[] {
  return rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
}
