import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  company: null,
  locations: []
};

const companySlice = createSlice({
  name: 'company',
  initialState,
  reducers: {
    setCompany(state, action) {
      state.company = action.payload;
    },
    clearCompany(state) {
      state.company = null;
    },
    setLocations(state, action) {
      state.locations = action.payload;
    },
    addLocation(state, action) {
      state.locations.push(action.payload);
    },
    updateLocation(state, action) {
      const newLocation = state.locations.map((location) => {
        if (location.id == action.payload._id) {
          return action.payload;
        }
        return location;
      });
      state.locations = newLocation;
    },
    clearLocations(state) {
      state.locations = [];
    },
     
  },
});


export const { setCompany, clearCompany, setLocations , clearLocations ,addLocation, updateLocation} = companySlice.actions;

export default companySlice.reducer;
