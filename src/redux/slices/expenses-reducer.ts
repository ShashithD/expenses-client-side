import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { isAxiosError } from 'axios';
import axiosInstance from '../../../axiosConfig';
import { Expense, ExpenseFormType } from '@/helpers/types';

interface getExpensesParams {
  startDate?: string;
  endDate?: string;
}

interface ExpensesState {
  expenses: Expense[];
  loading: boolean;
  expensesLoading: boolean;
  chartLoading: boolean;
  statistics: [];
  monthlyTotal: number;
  alert: {
    show: boolean;
    type: string;
    message: string;
  };
}

const initialState: ExpensesState = {
  expenses: [],
  loading: true,
  expensesLoading: true,
  chartLoading: true,
  statistics: [],
  monthlyTotal: 0,
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
    setMonthlyTotal: (state, action) => {
      state.monthlyTotal = action.payload;
    },
    setStatistics: (state, action) => {
      state.statistics = action.payload;
    },
    resetAlert: (state) => {
      state.alert = { ...initialState.alert };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getTotalExpensesForCurrentMonth.pending, (state) => {
        state.loading = true;
      })
      .addCase(getTotalExpensesForCurrentMonth.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(getExpenses.pending, (state) => {
        state.expensesLoading = true;
      })
      .addCase(getExpenses.fulfilled, (state) => {
        state.expensesLoading = false;
      })
      .addCase(getChartData.pending, (state) => {
        state.chartLoading = true;
      })
      .addCase(getChartData.fulfilled, (state) => {
        state.chartLoading = false;
      })
      .addCase(createExpense.pending, (state) => {
        state.expensesLoading = true;
      })
      .addCase(createExpense.fulfilled, (state, action) => {
        state.expenses.push(action.payload);
        state.expensesLoading = false;
        state.alert = {
          show: true,
          type: 'success',
          message: 'Expense created successfully!',
        };
      })
      .addCase(createExpense.rejected, (state, action) => {
        state.expensesLoading = false;
        state.alert = {
          show: true,
          type: 'error',
          message: `Failed to create expense: ${action?.payload}`,
        };
      })
      .addCase(updateExpense.pending, (state) => {
        state.expensesLoading = true;
      })
      .addCase(updateExpense.fulfilled, (state, action) => {
        state.expenses.push(action.payload);
        state.expensesLoading = false;
        state.alert = {
          show: true,
          type: 'success',
          message: 'Expense updated successfully!',
        };
      })
      .addCase(updateExpense.rejected, (state, action) => {
        state.expensesLoading = false;
        state.alert = {
          show: true,
          type: 'error',
          message: `Failed to update expense: ${action?.payload}`,
        };
      })
      .addCase(deleteExpense.pending, (state) => {
        state.expensesLoading = true;
      })
      .addCase(deleteExpense.fulfilled, (state, action) => {
        state.expenses.push(action.payload);
        state.expensesLoading = false;
        state.alert = {
          show: true,
          type: 'success',
          message: 'Expense deleted successfully!',
        };
      })
      .addCase(deleteExpense.rejected, (state, action) => {
        state.expensesLoading = false;
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
  async ({ startDate, endDate }: getExpensesParams, { dispatch }) => {
    try {
      const params: getExpensesParams = {};
      if (startDate) params.startDate = startDate;
      if (endDate) params.endDate = endDate;

      const expenses = await axiosInstance.get('/expenses', { params });

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
  'expenses/chartData',
  async (_, { dispatch }) => {
    try {
      const satistics = await axiosInstance.get('/expenses/stats/by-type');

      dispatch(setStatistics(satistics?.data || []));
    } catch (error) {
      console.log(error);
    }
  }
);

export const getTotalExpensesForCurrentMonth = createAsyncThunk(
  'expenses/fetchTotalCurrentMonth',
  async (_, { dispatch }) => {
    try {
      const response = await axiosInstance.get('/expenses/total-current-month');

      dispatch(setMonthlyTotal(response.data.total));
    } catch (error) {
      console.log(error);
    }
  }
);

export const { setExpenses, setStatistics, setMonthlyTotal, resetAlert } =
  expensesSlice.actions;

export default expensesSlice.reducer;
