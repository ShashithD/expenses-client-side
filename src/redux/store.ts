import { configureStore } from '@reduxjs/toolkit';
import expensesReducer from './slices/expenses-reducer';
import authReducer from './slices/auth-reducer';

export const store = configureStore({
  reducer: {
    expenses: expensesReducer,
    auth: authReducer,
  },
  devTools: process.env.NODE_ENV !== 'production',
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
