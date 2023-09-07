import { configureStore } from '@reduxjs/toolkit';

import toastMessageReducer from './reducers/toastMessagesSlice';
import userReducer from './reducers/userSlice';

export const store = configureStore({
  reducer: {
    toastMessages: toastMessageReducer,
    user: userReducer
  },
});