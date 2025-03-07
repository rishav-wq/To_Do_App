import { configureStore } from '@reduxjs/toolkit';
import taskReducer from './slices/taskSlice';
import authReducer from './slices/authSlice';
import { thunk as reduxThunk } from 'redux-thunk';  // Import redux-thunk

export const store = configureStore({
  reducer: {
    tasks: taskReducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(reduxThunk), // Add redux-thunk
});