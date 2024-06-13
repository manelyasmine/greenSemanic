import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = {
  isOpenToast: false,
  message: '',
  type: '',
};

const GlobalActionsSlice = createSlice({
  name: 'globalActions',
  initialState,
  reducers: {
    setOpenToast(
      state,
      action: PayloadAction<{ message: string; type: 'success' | 'error' | 'warning' | 'info' }>
    ) {
      state.isOpenToast = true;
      state.message = action.payload.message;
      state.type = action.payload.type;
    },
    setCloseToast(state) {
      state.isOpenToast = false;
      state.message = '';
      state.type = '';
    },
    // clearTarget(state) {
    //   state.target = null;
    // },
    // setTargets(state, action) {
    //   state.targets = action.payload;
    // }
  },
});

export const { setOpenToast, setCloseToast } = GlobalActionsSlice.actions;

export default GlobalActionsSlice.reducer;
