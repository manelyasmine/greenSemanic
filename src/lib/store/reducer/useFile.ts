import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  file: null,
  columnMapped: {},
  data:[],
  dataDB:[],
  selectedRow:null,
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
    setColumnMapped(state, action){
      console.log('action '+ JSON.stringify(action.payload))
      state.columnMapped = action.payload
    },
    setData(state, action){
      //console.log('action '+ JSON.stringify(action.payload))
      state.data = action.payload
    },
    setDataDB(state, action){
      //console.log('action '+ JSON.stringify(action.payload))
      state.dataDB = action.payload
    },
    clearDataDB(state) {
      state.dataDB = [];
    },
    setSelectedRow(state, action) {
      console.log('selected data '+ JSON.stringify(action.payload))
      state.selectedRow = action.payload;
    },
    clearSelectedRow(state) {
      state.selectedRow = null;
    },
  },
});


export const { setFile, clearFile, setColumnMapped , setData  , setDataDB  , clearDataDB , setSelectedRow, clearSelectedRow} = fileSlice.actions;

export default fileSlice.reducer;
