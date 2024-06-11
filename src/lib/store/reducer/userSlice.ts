import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  users:[],
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action) {
      state.user = action.payload.data;
    },
    clearUser(state) {
      state.user = null;
    },
    setUsers(state, action) { 
      state.users = action.payload;
    }
  },
});

export const { setUser, clearUser,setUsers } = userSlice.actions;

export default userSlice.reducer;
