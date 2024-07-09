import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { isAxiosError } from 'axios';
import axiosInstance from '../../../axiosConfig';
import { Expense, ExpenseFormType } from '@/helpers/types';

interface ExpensesState {
  expenses: Expense[];
  createPending: boolean;
  updatePending: boolean;
  statistics: [];
  alert: {
    show: boolean;
    type: string;
    message: string;
  };
}

const initialState: ExpensesState = {
  expenses: [],
  createPending: false,
  updatePending: false,
  statistics: [],
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
    setStatistics: (state, action) => {
      state.statistics = action.payload;
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
      })
      .addCase(updateExpense.pending, (state) => {
        state.createPending = true;
      })
      .addCase(updateExpense.fulfilled, (state, action) => {
        state.expenses.push(action.payload);
        state.createPending = false;
        state.alert = {
          show: true,
          type: 'success',
          message: 'Expense updated successfully!',
        };
      })
      .addCase(updateExpense.rejected, (state, action) => {
        state.createPending = false;
        state.alert = {
          show: true,
          type: 'error',
          message: `Failed to update expense: ${action?.payload}`,
        };
      })
      .addCase(deleteExpense.fulfilled, (state, action) => {
        state.expenses.push(action.payload);
        state.createPending = false;
        state.alert = {
          show: true,
          type: 'success',
          message: 'Expense deleted successfully!',
        };
      })
      .addCase(deleteExpense.rejected, (state, action) => {
        state.createPending = false;
        state.alert = {
          show: true,
          type: 'error',
          message: `Failed to delete expense: ${action?.payload}`,
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
      if (isAxiosError(error) && error.response) {
        let message = 'Failed to sign in';

        if (Array.isArray(error.response.data.message)) {
          message = error.response.data.message.join(' ');
        } else if (typeof error.response.data.message === 'string') {
          message = error.response.data.message;
        }

        return rejectWithValue(message);
      } else {
        return rejectWithValue('Unknown error');
      }
    }
  }
);

export const updateExpense = createAsyncThunk(
  'expenses/update',
  async (expenseData: Expense, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.patch(
        `/expenses/${expenseData._id}`,
        expenseData
      );
      return response.data;
    } catch (error) {
      if (isAxiosError(error)) {
        console.error(
          'Failed to create expense:',
          error?.response?.data?.message
        );

        return rejectWithValue(error?.response?.data?.message);
      } else {
        console.error('Unexpected error:', error);

        return rejectWithValue('Unknown error');
      }
    }
  }
);

export const deleteExpense = createAsyncThunk(
  'expenses/delete',
  async (expenseId: string, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.delete(`/expenses/${expenseId}`);
      return response.data;
    } catch (error) {
      if (isAxiosError(error)) {
        console.error(
          'Failed to create expense:',
          error?.response?.data?.message
        );

        return rejectWithValue(error?.response?.data?.message);
      } else {
        console.error('Unexpected error:', error);

        return rejectWithValue('Unknown error');
      }
    }
  }
);

export const getChartData = createAsyncThunk(
  'expenses/fetchAll',
  async (_, { dispatch }) => {
    try {
      const satistics = await axiosInstance.get('/expenses/stats/by-type');

      dispatch(setStatistics(satistics?.data || []));
    } catch (error) {
      console.log(error);
    }
  }
);

export const { setExpenses, setStatistics } = expensesSlice.actions;

export default expensesSlice.reducer;
