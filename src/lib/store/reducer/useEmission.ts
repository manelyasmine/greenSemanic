import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  emission: null,
  emissions:[],
};

const emissionSlice = createSlice({
  name: 'emission',
  initialState,
  reducers: {
    setEmission(state, action) {
      state.emission = action.payload.data;
    },
    clearEmission(state) {
      state.emission = null;
    },
    setEmissions(state, action) {
        state.emissions = action.payload.data;
      },
  },
});

export const { clearEmission, setEmission,setEmissions } = emissionSlice.actions;

export default emissionSlice.reducer;
