import React, { useState, useEffect,useRef } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import {
  Box,
  Button,
  FormControl,
  OutlinedInput,
  Drawer,
  Grid,
  IconButton,
  MenuItem,
  Select,
  Slide,
  Divider,
  TextField,
  Typography,
  Checkbox,
} from '@mui/material'; 
import { body, FooterBody, FooterBox, header } from '@/styles/theme/Bottom-drawer';
import {Task} from '@/types/task';

import { boxFilterDropDown, Filter, outlinedInput,filterCalander } from '@/styles/theme/Filter';
import dayjs from 'dayjs';

import CircularProgress from '@mui/material/CircularProgress';

import { CalanderIcon, FilterIcon } from '@/icons';
 

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

interface TaskDrawerProps {
  open: boolean;
  task:Task  ;
/*   handleCancelTask: () => void;
  users: any;
 
 
  targets:any;
   
  headerName: string;
  subtitleName:string;
  titleName:string;
  isUpdate: boolean;
  
  */
}
//open, handleCancelTask, onUpdateTask  , task,users,targets,isAssign,headerName,titleName,subtitleName

const TaskDrawer: React.FC<TaskDrawerProps> = ({ open,task/* , handleCancelTask, task, users, targets,headerName,titleName,subtitleName, isUpdate */ }) => {
 
 console.log("update task or assign it",open,task )
  /* const [currentTask, setCurrentTask] = useState<Task>(task);

  const calendarRef = useRef<HTMLDivElement>(null);

 const [isCalendarOpen, setIsCalendarOpen] = useState(false);
 
 const [selectedDate, setSelectedDate] = useState<any>(null);
 const [usersIds, setUsersIds] = React.useState<string[]>([]);

 const toggleCalendar = () => { setIsCalendarOpen(!isCalendarOpen); };
  *//*  const dispatch = useDispatch(); 
  const {user}=useSelector((state:any)=>state.user)

  console.log("user draweer",user.id) */
/*   const handleSaveTask = async () => {
    

    const newTask = {
     
      // Exclude password property using destructuring assignment with rest syntax
      ...(Object.fromEntries(Object.entries(currentUser).filter(([key]) => key !== 'password'))),
    };
    

    setCurrentTask(newTask);

    if (isUpdate) {
      console.log("is update",Object.keys(newTask))
      
      console.log("newTask",newTask,currentUser)
      const { error } = await taskApis.updateTask(newTask);
      if (error) {
        console.log("Update error:", error);
        return;
      }
      const updatedUsers = roles.map((r) => (r._id === newTask._id ? newTask : r));
      dispatch(setUsers(updatedUsers));
    } else {
      const { res, error } = await taskApis.assignTask(newTask);
      if (error) {
        console.log("Create error:", error);
        return;
      }
      dispatch(setUsers([...roles, res]));
    }

    handleCancelTask();
  };



  



 */

 /*  const handleMultiSelectChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    const value = event.target.value as string[];
    handleChange('usersIds', value);
    console.log("handle change user ids",currentTask.usersIds)
  };
const handleSaveTask=()=>{

}
 
const handleSelectChange = (event: React.ChangeEvent<{ value: unknown }>, name: string) => {
    const value = event.target.value as string | string[];
     console.log("handle select change",name,value)
    handleChange(name, value);
  };
const handleChange = (name: string, value: any) => {
    setCurrentTask((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  }; */

  return (



    <form /* onSubmit={handleSaveTask} */>
    
  
    <Drawer anchor="bottom" open={open} /* onClose={handleCancelTask} */>
      <Slide direction="up" in={open} mountOnEnter unmountOnExit>
           </Slide>
    </Drawer>
    </form>
  );
};

export default TaskDrawer;
