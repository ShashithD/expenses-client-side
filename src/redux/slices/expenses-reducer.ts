import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { isAxiosError } from 'axios';
import axiosInstance from '../../../axiosConfig';
import { ExpenseFormType } from '@/helpers/types';

interface Expense {
  _id: string;
  title: string;
  description: string;
  amount: number;
  date: string;
  type: string;
}

interface ExpencesState {
  expenses: Expense[];
  createPending: boolean;
  alert: {
    show: boolean;
    type: string;
    message: string;
  };
}

const initialState: ExpencesState = {
  expenses: [],
  createPending: false,
  alert: {
    show: false,
    type: 'success',
    message: '',
  },
};

export const expensesSlice = createSlice({
  name: 'expenses',
  initialState,
  reducers: {
    setExpenses: (state, action) => {
      state.expenses = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createExpense.pending, (state) => {
        state.createPending = true;
      })
      .addCase(createExpense.fulfilled, (state, action) => {
        state.expenses.push(action.payload);
        state.createPending = false;
        state.alert = {
          show: true,
          type: 'success',
          message: 'Expense created successfully!',
        };
      })
      .addCase(createExpense.rejected, (state, action) => {
        state.createPending = false;
        state.alert = {
          show: true,
          type: 'error',
          message: `Failed to create expense: ${action?.payload}`,
        };
      });
  },
});

export const getExpenses = createAsyncThunk(
  'expenses/fetchAll',
  async (_, { dispatch }) => {
    try {
      const expenses = await axiosInstance.get('/expenses');

      dispatch(setExpenses(expenses?.data || []));
    } catch (error) {
      console.log(error);
    }
  }
);

export const createExpense = createAsyncThunk(
  'expenses/create',
  async (expense: ExpenseFormType, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post('/expenses', expense);

      return response.data;
    } catch (error) {
      if (isAxiosError(error)) {
        console.error(
          'Failed to create expense:',
          error?.response?.data?.message
        );
        return rejectWithValue({ message: error?.response?.data?.message });
      } else {
        console.error('Unexpected error:', error);
        return rejectWithValue({ message: 'Unknown error' });
      }
    }
  }
);

export const { setExpenses } = expensesSlice.actions;

export default expensesSlice.reducer;
