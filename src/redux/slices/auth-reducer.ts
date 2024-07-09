import axiosInstance from '../../../axiosConfig';
import { createSlice } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { isAxiosError } from 'axios';

interface SignInData {
  email: string;
  password: string;
}

interface SignUpData {
  name: string;
  email: string;
  password: string;
}

interface InitialUserDetails {
  name: string;
  id: string;
  email: string;
}

interface AuthState {
  userDetails: InitialUserDetails;
  errorMessage: string | null;
  alert: {
    show: boolean;
    type: string;
    message: string;
  };
}

const initialUserDetails = {
  name: '',
  id: '',
  email: '',
};

const initialState: AuthState = {
  userDetails: initialUserDetails,
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
    setUserDetails: (state, action) => {
      state.userDetails = action.payload;
    },
    setAlertData: (state, action) => {
      state.alert = action.payload;
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
  async (
    { name, email, password }: SignUpData,
    { dispatch, rejectWithValue }
  ) => {
    try {
      const response = await axiosInstance.post('auth/signup', {
        name,
        email,
        password,
      });

      dispatch(setUserDetails(response.data.userDetails));

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
  async ({ email, password }: SignInData, { dispatch, rejectWithValue }) => {
    try {
      const response = await axiosInstance.post('auth/login', {
        email,
        password,
      });

      dispatch(setUserDetails(response.data.userDetails));

      localStorage.setItem('jwt', response.data.token);
      localStorage.setItem('name', response.data.userDetails.name);
      localStorage.setItem('email', response.data.userDetails.email);
      localStorage.setItem('id', response.data.userDetails.id);

      return response.data;
    } catch (error) {
      if (isAxiosError(error) && error.response) {
        let message = 'Failed to sign in';
        // Check if the message is in an array and join them if it is
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

      dispatch(setUserDetails(initialUserDetails));
      dispatch(setAlertData(alert))
    } catch (error) {
      console.log(error);
    }
  }
);

export const { setUserDetails, setAlertData } = authSlice.actions;

export default authSlice.reducer;
