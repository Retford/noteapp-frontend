import { configureStore } from '@reduxjs/toolkit';
import { noteSlice } from './slices/note/noteSlice';
import { authSlice } from './slices/auth/authSlice';

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    note: noteSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
