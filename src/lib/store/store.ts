import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import userReducer from './reducer/userSlice';
import targetReducer from './reducer/useTarget';
import  taskReducer from './reducer/useTask';
 
import usersReducer from './reducer/useUser';;
import fileReducer from './reducer/useFile'
import companyReducer from './reducer/useCompany';
import emissionReducer from './reducer/useEmission';
import roleReducer from './reducer/useRole';
import globalActionsReducer from './reducer/useGlobalActions'
 
  
  
 
const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(persistConfig, userReducer);



const rootReducer = combineReducers({
  user: persistedReducer,
  target: targetReducer,
  task: taskReducer,
  users:usersReducer,
 
  company:companyReducer,
  emission:emissionReducer,
  role:roleReducer,
  file: fileReducer,
  globalActions: globalActionsReducer,
  
 
});

// Configure the store with the combined reducer
const store = configureStore({
  reducer: rootReducer,
});
// const store = configureStore({
//   reducer: {
//     user: persistedReducer,

//   },
// });

export const persistor = persistStore(store);
export default store;