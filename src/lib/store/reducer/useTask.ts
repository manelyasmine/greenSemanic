import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  task: null,
  tasks : [],
  myTasks:[],
};

const taskSlice = createSlice({
  name: 'task',
  initialState,
  reducers: {
    setTask(state, action) {
      state.task = action.payload;
    },
    clearTask(state) {
      state.task = null;
    },
    setTasks(state, action) { 
      state.tasks = action.payload;
    },
    setMyTasks(state, action) { 
      state.myTasks = action.payload;
    }
  },
});


export const { setTask, clearTask , setTasks,setMyTasks} = taskSlice.actions;

export default taskSlice.reducer;
