import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  role: null,
  roles : []
};

const roleSlice = createSlice({
  name: 'role',
  initialState,
  reducers: {
    setRole(state, action) {
      state.role = action.payload;
    },
    clearRole(state) {
      state.role = null;
    },
    setRoles(state, action) { 
      state.roles = action.payload;
    }
  },
});


export const { setRole, clearRole , setRoles} = roleSlice.actions;

export default roleSlice.reducer;
