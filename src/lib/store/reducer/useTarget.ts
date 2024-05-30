import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  target: null,
  targets : []
};

const targetSlice = createSlice({
  name: 'target',
  initialState,
  reducers: {
    setTarget(state, action) {
      state.target = action.payload;
    },
    clearTarget(state) {
      state.target = null;
    },
    setTargets(state, action) { 
      state.targets = action.payload;
    }
  },
});


export const { setTarget, clearTarget , setTargets} = targetSlice.actions;

export default targetSlice.reducer;
