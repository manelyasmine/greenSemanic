'use client';

import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Plus as PlusIcon } from '@phosphor-icons/react/dist/ssr/Plus';
import dayjs from 'dayjs'; 
import BottomDrawer from './BottomDrawer'; 
import UpdateBottomDrawerTask from './UpdateBottomDrawer';
import CustomTabs from '@/components/commun/Tabs/taskTabs'; 
import { TasksTable } from '@/components/dashboard/tasks/tasks-table';
import { MyTasksTable } from '@/components/dashboard/tasks/myTasks-table';
import { taskApis } from '@/lib/task/taskApis';
import { Task } from '@/types/task';
import { setTasks } from '@/lib/store/reducer/useTask';
import { useDispatch, useSelector } from 'react-redux';
import { userApis } from '@/lib/user/userApis';
<<<<<<< HEAD
<<<<<<< HEAD
import { User } from '@/types/user'; 
import { setTargets } from '@/lib/store/reducer/useTarget';
 
import { targetApis } from '@/lib/target/targetApis';
=======
import { User } from '@/types/user';
import { Target } from '@/types/target';
=======
import { User } from '@/types/user'; 
>>>>>>> dac5812 (add assign task,add task ,add role,get all roles and start the update roles)
import { setTargets } from '@/lib/store/reducer/useTarget';
 
import { targetApis } from '@/lib/target/targetApis';


<<<<<<< HEAD









>>>>>>> 1099567 (modify ui for add task,add modify drawer ,integration for some apis task)


export default function Page(): React.JSX.Element {
  
<<<<<<< HEAD
  const [selectedTab, setSelectedTab] = React.useState<string>('All Tasks');
  const [users, setUsers] = useState<User>({});
  const [isNewTask,setIsNewTask]=useState(false); 
  const { tasks } = useSelector((state: any) => state.task); 
  const { targets } = useSelector((state: any) => state.target);
  const { user } = useSelector((state: any) => state.user); 
  const [paginatedTask, setPaginatedTasks] = useState<Task[]>([]);

  const [newTask, setNewTask] = useState<Task>({['createdBy']:user.id});
  const rowsPerPage = 5;
  const page = 0;
  const dispatch = useDispatch();
  
  
=======
  const [newTask, setNewTask] = useState<Task>({});
=======
export default function Page(): React.JSX.Element {
  
>>>>>>> dac5812 (add assign task,add task ,add role,get all roles and start the update roles)
  const [selectedTab, setSelectedTab] = React.useState<string>('All Tasks');
  const [users, setUsers] = useState<User>({});
  const [isNewTask,setIsNewTask]=useState(false); 
  const { tasks } = useSelector((state: any) => state.task); 
  const { targets } = useSelector((state: any) => state.target);
<<<<<<< HEAD
  const { users } = useSelector((state: any) => state.users); 
  // Function to handle tab changes
>>>>>>> 1099567 (modify ui for add task,add modify drawer ,integration for some apis task)
=======
  const { user } = useSelector((state: any) => state.user); 
  const [paginatedTask, setPaginatedTasks] = useState<Task[]>([]);

  const [newTask, setNewTask] = useState<Task>({['createdBy']:user.id});
  const rowsPerPage = 5;
  const page = 0;
  const dispatch = useDispatch();
  
  
>>>>>>> dac5812 (add assign task,add task ,add role,get all roles and start the update roles)
  const handleTabChange = (event: React.ChangeEvent<any>, newValue: string) => {
    setSelectedTab(newValue);
  };

<<<<<<< HEAD
<<<<<<< HEAD
const handleNewTask=()=>{ 
  console.log('hNDDDDDDDDDDD NEW TASK')
   handleTargets();  
   handleUsers();
  
  
 
=======
  const page = 0;
  const rowsPerPage = 5;
  const [isNewTask,setIsNewTask]=useState(false); 
  const dispatch = useDispatch();

  const { tasks } = useSelector((state: any) => state.task);
  const { user } = useSelector((state: any) => state.user);
  const [paginatedTask, setPaginatedTasks] = useState<Task[]>([]);
=======
>>>>>>> dac5812 (add assign task,add task ,add role,get all roles and start the update roles)
const handleNewTask=()=>{ 
  console.log('hNDDDDDDDDDDD NEW TASK')
   handleTargets();  
   handleUsers();
  
  
 
<<<<<<< HEAD
  //handleClose();
  setIsNewTask(!isNewTask);
>>>>>>> 1099567 (modify ui for add task,add modify drawer ,integration for some apis task)
=======
>>>>>>> dac5812 (add assign task,add task ,add role,get all roles and start the update roles)
 
}
const [errorAlert, setErrorAlert] = useState('');
const handleCreateTask = React.useCallback(async (): Promise<void> => {
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> dac5812 (add assign task,add task ,add role,get all roles and start the update roles)
   
  setNewTask({ ...newTask, ['createdBy']: user.id });
 console.log("handle create task,=========",newTask,user.id)
  const { res , error } = await taskApis.createTask(newTask);
   if (error) {
<<<<<<< HEAD
    setErrorAlert(error);
    return
  } 
  dispatch(setTasks([...tasks , res]))
  handleClose();
}, [newTask]);

 
=======
  const regex = /^\d{4}-\d{4}$/;
 
  //const { res , error } = await taskApis.createTask(newTask);
 /*  if (error) {
=======
>>>>>>> dac5812 (add assign task,add task ,add role,get all roles and start the update roles)
    setErrorAlert(error);
    return
  } 
  dispatch(setTasks([...tasks , res]))
  handleClose();
}, [newTask]);

 
<<<<<<< HEAD

}, [page, rowsPerPage]);

useEffect(() => {
  getTasks();
}, [getTasks]); */

>>>>>>> 1099567 (modify ui for add task,add modify drawer ,integration for some apis task)
=======
>>>>>>> dac5812 (add assign task,add task ,add role,get all roles and start the update roles)
const handleTargets= React.useCallback(async (): Promise<void> => {
 
  
  try {
    const { res } = await targetApis.getTargets();
<<<<<<< HEAD
<<<<<<< HEAD
    dispatch(setTargets(res));  
    
  } catch (error) {
    console.error('Error fetching targets:', error); 
  }
 
=======
    dispatch(setTargets(res)); 
     
=======
    dispatch(setTargets(res));  
>>>>>>> dac5812 (add assign task,add task ,add role,get all roles and start the update roles)
    
  } catch (error) {
    console.error('Error fetching targets:', error); 
  }
<<<<<<< HEAD

  console.log("user api drop===>",users)
>>>>>>> 1099567 (modify ui for add task,add modify drawer ,integration for some apis task)
=======
 
>>>>>>> dac5812 (add assign task,add task ,add role,get all roles and start the update roles)
   
      }, [dispatch]);  


const handleUsers= React.useCallback(async (): Promise<void> => {
<<<<<<< HEAD
<<<<<<< HEAD
  
  try {
    const { res } = await userApis.getUsers();
    
    //dispatch(setUsers(res));
   setUsers(res) 
   console.log("useeeeeeeeee",users)
=======
        
  try {
    const { res } = await userApis.getUsers();
     dispatch(setUsers(res));
    console.log("handleUsers get user",res)
>>>>>>> 1099567 (modify ui for add task,add modify drawer ,integration for some apis task)
=======
  
  try {
    const { res } = await userApis.getUsers();
    
    //dispatch(setUsers(res));
   setUsers(res) 
   console.log("useeeeeeeeee",users)
>>>>>>> dac5812 (add assign task,add task ,add role,get all roles and start the update roles)
      
    
  } catch (error) {
    console.error('Error fetching users:', error); 
  }
<<<<<<< HEAD
<<<<<<< HEAD
 
    
      }, 
[dispatch]);    
=======

  console.log("handleUsers===>",users)
    
}, [dispatch]);    
>>>>>>> 1099567 (modify ui for add task,add modify drawer ,integration for some apis task)
=======
 
    
      }, 
[dispatch]);    
>>>>>>> dac5812 (add assign task,add task ,add role,get all roles and start the update roles)



 
const getTasks = React.useCallback(async (): Promise<void> => {
  try {
    const { error, res } = await taskApis.getTasks();
     
    
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
}, [getTasks]);



const handleClose=()=>{setIsNewTask(false)}
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
<<<<<<< HEAD
<<<<<<< HEAD
            //onClick={()=>handleNewTask, setIsNewTask(!isNewTask)}
            onClick={() => {handleUsers() , handleTargets(),setIsNewTask(!isNewTask)}}
=======
            onClick={ ()=>{handleUsers(),handleNewTask()}}
>>>>>>> 1099567 (modify ui for add task,add modify drawer ,integration for some apis task)
=======
            //onClick={()=>handleNewTask, setIsNewTask(!isNewTask)}
            onClick={() => {handleUsers() , handleTargets(),setIsNewTask(!isNewTask)}}
>>>>>>> dac5812 (add assign task,add task ,add role,get all roles and start the update roles)
          >
            New Task
          </Button>
        </div>
         
      </Stack>
 
           
      
<<<<<<< HEAD
<<<<<<< HEAD
            {/*   <BottomDrawer 
=======
              <BottomDrawer 
>>>>>>> 1099567 (modify ui for add task,add modify drawer ,integration for some apis task)
=======
            {/*   <BottomDrawer 
>>>>>>> dac5812 (add assign task,add task ,add role,get all roles and start the update roles)
                open={isNewTask}
                newTask={newTask}
                setNewTask={setNewTask}
                handleCancelTask={handleClose}
               handleCreateTask={handleCreateTask}
<<<<<<< HEAD
<<<<<<< HEAD
               
              /> */}
=======
               users={users} targets={targets}
              />
>>>>>>> 1099567 (modify ui for add task,add modify drawer ,integration for some apis task)
=======
               
              /> */}
>>>>>>> dac5812 (add assign task,add task ,add role,get all roles and start the update roles)
            
 
           <BottomDrawer 
            open={isNewTask} 
            handleCancelTask={handleClose}  
            newTask={newTask}
            setNewTask={setNewTask}
            onCreateTask={handleCreateTask}  
            users={users} 
            targets={targets}/>  
     {/* 
     {(isNewTask  ) &&(
       <UpdateBottomDrawerTask 
       open={isNewTask  } 
       handleCancelTask={ handleClose } 
       onUpdateTask={handleCreateTask } 
       task ={newTask} 
       users={users} 
       targets={targets} 
       isAssign={isNewTask}
       headerName="New Task"
       titleName="Add new Task"
       subtitleName="Add new task to further streamline your carbon emission management process."
       
       />)
      } */}
 
      {selectedTab === 'All Tasks' && (
       

        <TasksTable count={paginatedTask.length} page={page} rows={tasks} rowsPerPage={rowsPerPage} />
      )}
      {selectedTab !== 'All Tasks' && (
        <MyTasksTable  count={paginatedTask.length}  page={page} rows={tasks} rowsPerPage={rowsPerPage} />)
      }  
          
    </Stack>
  );
}

function applyPagination(rows: any[], page: number, rowsPerPage: number): Task[] {
  return rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
}