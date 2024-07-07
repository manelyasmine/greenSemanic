import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  report: [],
  reportToSend: null,
};

const reportSlice = createSlice({
  name: 'report',
  initialState,
  reducers: {
    setReport(state, action) {
      state.report = action.payload;
    },
    clearReport(state) {
      state.report = [];
    },
    setReportToSend(state, action) {
      state.reportToSend = action.payload;
    },
    clearReportToSent(state) {
      state.reportToSend = null;
    },
  },
});

export const { setReport, clearReport, setReportToSend, clearReportToSent } = reportSlice.actions;

export default reportSlice.reducer;
