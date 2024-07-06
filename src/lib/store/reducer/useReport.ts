import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  
   
  report: [], 
};

const reportSlice = createSlice({
  name: 'report',
  initialState,
  reducers: {
    setReport(state, action) {
      //console.log('action '+ JSON.stringify(action.payload))
      state.report = action.payload;
    },
   
    clearReport(state) {
      state.report = [];
    },
     
  },
});

export const {
  setReport,
  clearReport,
    
 
} = reportSlice.actions;

export default reportSlice.reducer;
