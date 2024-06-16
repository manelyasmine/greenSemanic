import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  file: null,
  columnMapped: {},
  data: [],
  dataDB: [],
  selectedRow: null,
};

const fileSlice = createSlice({
  name: 'file',
  initialState,
  reducers: {
    setFile(state, action) {
      state.file = action.payload;
    },
    clearFile(state) {
      state.file = null;
    },
    setColumnMapped(state, action) {
      state.columnMapped = action.payload;
    },
    clearColumnMapped(state) {
      state.columnMapped ={};
    },
    setData(state, action) {
      //console.log('action '+ JSON.stringify(action.payload))
      state.data = action.payload;
    },
    setDataDB(state, action) {
      //console.log('action '+ JSON.stringify(action.payload))
      state.dataDB = action.payload;
    },
    addDataDB(state, action) {
      state.dataDB.push(action.payload);
      //state.dataDB = [...state.dataDB , action.payload]
    },
    updateDataDB(state, action) {
      const newData = state.dataDB.map((data) => {
        if (data.id == action.payload._id) {
          return action.payload;
        }
        return data;
      });
      state.dataDB = newData;
    },
    clearDataDB(state) {
      state.dataDB = [];
    },
    setSelectedRow(state, action) {
      console.log('selected data ' + JSON.stringify(action.payload));
      state.selectedRow = action.payload;
    },
    clearSelectedRow(state) {
      state.selectedRow = null;
    },
  },
});

export const {
  setFile,
  clearFile,
  setColumnMapped,
  setData,
  setDataDB,
  addDataDB,
  updateDataDB,
  clearDataDB,
  setSelectedRow,
  clearSelectedRow,
  clearColumnMapped
} = fileSlice.actions;

export default fileSlice.reducer;
