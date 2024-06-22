/* import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  emission: null,
  emissions: [],
};

const emissionSlice = createSlice({
  name: 'emission',
  initialState,
  reducers: {
    setEmission(state, action) {
      state.emission = action.payload;
    },
    clearEmission(state) {
      state.emission = null;
    },
    setEmissions(state, action) {
      state.emissions = action.payload;
    },
  },
});

export const { clearEmission, setEmission, setEmissions } = emissionSlice.actions;

export default emissionSlice.reducer;
 */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  emissions: [],
  totalRows: 0,
  totalPages: 1,
};

const emissionSlice = createSlice({
  name: 'emission',
  initialState,
  reducers: {
    setEmissions(state, action) {
      state.emissions = action.payload.emissions;
      state.totalRows = action.payload.total;
      state.totalPages = action.payload.totalPages;
    },
    clearEmissions(state) {
      state.emissions = [];
      state.totalRows = 0;
      state.totalPages = 1;
    },
  },
});

export const { clearEmissions, setEmissions } = emissionSlice.actions;

export default emissionSlice.reducer;
