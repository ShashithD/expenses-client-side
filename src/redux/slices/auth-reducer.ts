import { createSlice } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { isAxiosError } from 'axios';
import axiosInstance from '../../../axiosConfig';

interface SignInData {
  email: string;
  password: string;
}

interface SignUpData {
  name: string;
  email: string;
  password: string;
}

interface AuthState {
  errorMessage: string | null;
  alert: {
    show: boolean;
    type: string;
    message: string;
  };
}

const initialState: AuthState = {
  errorMessage: null,
  alert: {
    show: false,
    type: 'success',
    message: '',
  },
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAlertData: (state, action) => {
      state.alert = action.payload;
    },
    resetAlert: (state) => {
      state.alert = { ...initialState.alert };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signUp.rejected, (state, action) => {
        state.alert = {
          show: true,
          type: 'error',
          message: `${action.payload}` || 'Failed to sign up',
        };
      })
      .addCase(signIn.rejected, (state, action) => {
        state.alert = {
          show: true,
          type: 'error',
          message: `${action.payload}` || 'Failed to sign in',
        };
      });
  },
});

export const signUp = createAsyncThunk(
  'auth/signup',
  async ({ name, email, password }: SignUpData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post('auth/signup', {
        name,
        email,
        password,
      });

      localStorage.setItem('jwt', response.data.token);
      localStorage.setItem('name', response.data.userDetails.name);
      localStorage.setItem('email', response.data.userDetails.email);
      localStorage.setItem('id', response.data.userDetails.id);

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

export const signIn = createAsyncThunk(
  'auth/signin',
  async ({ email, password }: SignInData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post('auth/login', {
        email,
        password,
      });

      localStorage.setItem('jwt', response.data.token);
      localStorage.setItem('name', response.data.userDetails.name);
      localStorage.setItem('email', response.data.userDetails.email);
      localStorage.setItem('id', response.data.userDetails.id);

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

export const signOut = createAsyncThunk(
  'auth/signOut',
  async (_, { dispatch }) => {
    try {
      localStorage.removeItem('jwt');

      const alert = {
        show: true,
        type: 'success',
        message: 'Sign-out successful!',
      };

      dispatch(setAlertData(alert));
    } catch (error) {
      console.log(error);
    }
  }
);

export const { setAlertData, resetAlert } = authSlice.actions;

export default authSlice.reducer;
