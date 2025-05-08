import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';

// Define types for User
interface User {
  id: number;
  email: string;
  first_name?: string;
  last_name?: string;
  phone?: string;
  image_url?: string;
  role?: string;
}

// Define input data types for creating/updating a user
export interface UserInputData {
  email: string;
  password: string;
  first_name?: string;
  last_name?: string;
  phone?: string;
  image_url?: string;
  role?: string;
}

// Define state type for the user slice
interface UserState {
  users: User[];
  selectedUser: User | null;
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
  errorMessage: string;
}

// Initialize state
const initialState: UserState = {
  users: [],
  selectedUser: null,
  isLoading: false,
  isSuccess: false,
  isError: false,
  errorMessage: '',
};

// API base URL - updated to the production URL
const API_URL = 'https://globalgreen-backend-production.up.railway.app/users';

// Create async thunk for fetching all users
export const fetchUsers = createAsyncThunk<
  User[],
  void,
  { rejectValue: string }
>(
  'user/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get<User[]>(API_URL);
      return response.data;
    } catch (error) {
      const err = error as AxiosError<{ message?: string }>;
      console.error("Fetch users error:", err.response?.data || err.message);
      
      if (err.response?.data?.message) {
        return rejectWithValue(err.response.data.message);
      } else {
        return rejectWithValue('Failed to fetch users');
      }
    }
  }
);

// Create async thunk for fetching a single user
export const fetchUserById = createAsyncThunk<
  User,
  number,
  { rejectValue: string }
>(
  'user/fetchById',
  async (userId, { rejectWithValue }) => {
    try {
      const response = await axios.get<User>(`${API_URL}/${userId}`);
      return response.data;
    } catch (error) {
      const err = error as AxiosError<{ message?: string }>;
      console.error("Fetch user error:", err.response?.data || err.message);
      
      if (err.response?.data?.message) {
        return rejectWithValue(err.response.data.message);
      } else {
        return rejectWithValue(`Failed to fetch user with ID: ${userId}`);
      }
    }
  }
);

// Create async thunk for creating a new user
export const createUser = createAsyncThunk<
  { message: string },
  UserInputData,
  { rejectValue: string }
>(
  'user/create',
  async (userData, { rejectWithValue, dispatch }) => {
    try {
      const response = await axios.post<{ message: string }>(API_URL, userData);
      // After successful creation, refresh the users list
      dispatch(fetchUsers());
      return response.data;
    } catch (error) {
      const err = error as AxiosError<{ error?: string, message?: string }>;
      console.error("Create user error:", err.response?.data || err.message);
      
      const errorMessage = err.response?.data?.error || err.response?.data?.message || 'Failed to create user';
      return rejectWithValue(errorMessage);
    }
  }
);

// Create async thunk for updating a user
export const updateUser = createAsyncThunk<
  { message: string },
  { id: number; data: Partial<UserInputData> },
  { rejectValue: string }
>(
  'user/update',
  async ({ id, data }, { rejectWithValue, dispatch }) => {
    try {
      const response = await axios.put<{ message: string }>(`${API_URL}/${id}`, data);
      dispatch(fetchUsers());
      return response.data;
    } catch (error) {
      const err = error as AxiosError<{ message?: string }>;
      console.error("Update user error:", err.response?.data || err.message);

      if (err.response?.data?.message) {
        return rejectWithValue(err.response.data.message);
      } else {
        return rejectWithValue(`Failed to update user with ID: ${id}`);
      }
    }
  }
);

// Create async thunk for deleting a user
export const deleteUser = createAsyncThunk<
  { message: string },
  number,
  { rejectValue: string }
>(
  'user/delete',
  async (userId, { rejectWithValue, dispatch }) => {
    try {
      const response = await axios.delete<{ message: string }>(`${API_URL}/${userId}`);
      dispatch(fetchUsers());
      return response.data;
    } catch (error) {
      const err = error as AxiosError<{ message?: string }>;
      console.error("Delete user error:", err.response?.data || err.message);
      if (err.response?.data?.message) {
        return rejectWithValue(err.response.data.message);
      } else {
        return rejectWithValue(`Failed to delete user with ID: ${userId}`);
      }
    }
  }
);


// Create the user slice
export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    // Reset the state flags
    resetUserState: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.errorMessage = '';
    },
    // Clear the selected user
    clearSelectedUser: (state) => {
      state.selectedUser = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Handle fetchUsers states
      .addCase(fetchUsers.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.isError = false;
        state.errorMessage = '';
      })
      .addCase(fetchUsers.fulfilled, (state, action: PayloadAction<User[]>) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.errorMessage = action.payload ?? 'Failed to fetch users';
      })
      
      // Handle fetchUserById states
      .addCase(fetchUserById.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.isError = false;
        state.errorMessage = '';
      })
      .addCase(fetchUserById.fulfilled, (state, action: PayloadAction<User>) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.selectedUser = action.payload;
      })
      .addCase(fetchUserById.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.errorMessage = action.payload ?? 'Failed to fetch user';
        state.selectedUser = null;
      })
      
      // Handle createUser states
      .addCase(createUser.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.isError = false;
        state.errorMessage = '';
      })
      .addCase(createUser.fulfilled, (state) => {
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(createUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.errorMessage = action.payload ?? 'Failed to create user';
      })
      
      // Handle updateUser states
      .addCase(updateUser.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.isError = false;
        state.errorMessage = '';
      })
      .addCase(updateUser.fulfilled, (state) => {
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.errorMessage = action.payload ?? 'Failed to update user';
      })
      
      // Handle deleteUser states
      .addCase(deleteUser.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.isError = false;
        state.errorMessage = '';
      })
      .addCase(deleteUser.fulfilled, (state) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.selectedUser = null;
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.errorMessage = action.payload ?? 'Failed to delete user';
      })
      
  },
});

// Export actions and reducer
export const { resetUserState, clearSelectedUser } = userSlice.actions;
export default userSlice.reducer;