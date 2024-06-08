import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  task: null,
  tasks : []
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
    }
  },
});


export const { setTask, clearTask , setTasks} = taskSlice.actions;

export default taskSlice.reducer;
