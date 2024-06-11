import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import userReducer from './reducer/userSlice';
import targetReducer from './reducer/useTarget';
import fileReducer from './reducer/useFile'

const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(persistConfig, userReducer);



const rootReducer = combineReducers({
  user: persistedReducer,
  target: targetReducer,
  file: fileReducer
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