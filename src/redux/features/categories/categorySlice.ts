import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';

// API base URL - updated to the production URL
const API_URL = 'https://globalgreen-backend-production.up.railway.app/categories';

// Define the Category interface
export interface Category {
  category_id: number;
  name: string;
  description: string;
  parent_id?: number | null;
  image_url?: string;
  created_at?: string;
  updated_at?: string;
}

interface CategoryState {
  categories: Category[];
  selectedCategory: Category | null;
  loading: boolean;
  error: string | null;
  lastFetched: number | null;
}

const initialState: CategoryState = {
  categories: [],
  selectedCategory: null,
  loading: false,
  error: null,
  lastFetched: null,
};

// Async thunk to fetch all categories
export const fetchAllCategories = createAsyncThunk<
  Category[],
  void,
  { rejectValue: string }
>(
  'categories/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get<Category[]>(API_URL);
      return response.data;
    } catch (error) {
      const err = error as AxiosError<{ message?: string }>;
      console.error("Fetch categories error:", err.response?.data || err.message);
      
      if (err.response?.data?.message) {
        return rejectWithValue(err.response.data.message);
      } else {
        return rejectWithValue('Failed to fetch categories');
      }
    }
  }
);

// Async thunk to fetch a single category by ID
export const fetchCategoryById = createAsyncThunk<
  Category,
  number,
  { rejectValue: string }
>(
  'categories/fetchById',
  async (categoryId, { rejectWithValue }) => {
    try {
      const response = await axios.get<Category>(`${API_URL}/${categoryId}`);
      return response.data;
    } catch (error) {
      const err = error as AxiosError<{ message?: string }>;
      console.error("Fetch category error:", err.response?.data || err.message);
      
      if (err.response?.data?.message) {
        return rejectWithValue(err.response.data.message);
      } else {
        return rejectWithValue(`Failed to fetch category with categoryID: ${categoryId}`);
      }
    }
  }
);

// Async thunk to create a new category
export const createCategory = createAsyncThunk<
  Category,
  Partial<Category>,
  { rejectValue: string }
>(
  'categories/createCategory',
  async (categoryData, { rejectWithValue }) => {
    try {
      const response = await axios.post<Category>(API_URL, categoryData);
      return response.data;
    } catch (error) {
      const err = error as AxiosError<{ error?: string, message?: string }>;
      console.error("Create category error:", err.response?.data || err.message);
      
      const errorMessage = err.response?.data?.error || err.response?.data?.message || 'Failed to create category';
      return rejectWithValue(errorMessage);
    }
  }
);

// Async thunk to update a category
export const updateCategory = createAsyncThunk<
  Category,
  { id: number; data: Partial<Category> },
  { rejectValue: string }
>(
  'categories/updateCategory',
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await axios.put<Category>(`${API_URL}/${id}`, data);
      return response.data;
    } catch (error) {
      const err = error as AxiosError<{ message?: string }>;
      console.error("Update category error:", err.response?.data || err.message);

      if (err.response?.data?.message) {
        return rejectWithValue(err.response.data.message);
      } else {
        return rejectWithValue(`Failed to update category with ID: ${id}`);
      }
    }
  }
);

// Async thunk to delete a category
export const deleteCategory = createAsyncThunk<
  number,
  number,
  { rejectValue: string }
>(
  'categories/deleteCategory',
  async (categoryId, { rejectWithValue }) => {
    try {
      await axios.delete<{ message: string }>(`${API_URL}/${categoryId}`);
      return categoryId; // Return the ID for the reducer to filter it out
    } catch (error) {
      const err = error as AxiosError<{ message?: string }>;
      console.error("Delete category error:", err.response?.data || err.message);
      if (err.response?.data?.message) {
        return rejectWithValue(err.response.data.message);
      } else {
        return rejectWithValue(`Failed to delete category with ID: ${categoryId}`);
      }
    }
  }
);

// Optional: Fetch categories by parent ID if your API supports this
export const fetchCategoriesByParentId = createAsyncThunk<
  Category[],
  number,
  { rejectValue: string }
>(
  'categories/fetchByParentId',
  async (parentId, { rejectWithValue }) => {
    try {
      const response = await axios.get<Category[]>(`${API_URL}/parent/${parentId}`);
      return response.data;
    } catch (error) {
      const err = error as AxiosError<{ message?: string }>;
      console.error("Fetch subcategories error:", err.response?.data || err.message);
      
      if (err.response?.data?.message) {
        return rejectWithValue(err.response.data.message);
      } else {
        return rejectWithValue(`Failed to fetch subcategories for parent ID: ${parentId}`);
      }
    }
  }
);

const categorySlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    clearCategories: (state) => {
      state.categories = [];
      state.lastFetched = null;
    },
    setSelectedCategory: (state, action: PayloadAction<Category | null>) => {
      state.selectedCategory = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Handle fetchAllCategories
      .addCase(fetchAllCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllCategories.fulfilled, (state, action: PayloadAction<Category[]>) => {
        state.loading = false;
        state.categories = action.payload;
        state.lastFetched = Date.now();
      })
      .addCase(fetchAllCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      
      // Handle fetchCategoryById
      .addCase(fetchCategoryById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCategoryById.fulfilled, (state, action: PayloadAction<Category>) => {
        state.loading = false;
        state.selectedCategory = action.payload;
        // Also update in categories array if it exists
        const index = state.categories.findIndex(c => c.category_id === action.payload.category_id);
        if (index !== -1) {
          state.categories[index] = action.payload;
        } else {
          state.categories.push(action.payload);
        }
      })
      .addCase(fetchCategoryById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      
      // Handle fetchCategoriesByParentId
      .addCase(fetchCategoriesByParentId.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCategoriesByParentId.fulfilled, (state, action: PayloadAction<Category[]>) => {
        state.loading = false;
        // Merge with existing categories - add new ones and update existing ones
        action.payload.forEach(newCategory => {
          const index = state.categories.findIndex(c => c.category_id === newCategory.category_id);
          if (index !== -1) {
            state.categories[index] = newCategory;
          } else {
            state.categories.push(newCategory);
          }
        });
      })
      .addCase(fetchCategoriesByParentId.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      
      // Handle createCategory
      .addCase(createCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createCategory.fulfilled, (state, action: PayloadAction<Category>) => {
        state.loading = false;
        state.categories.push(action.payload);
      })
      .addCase(createCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      
      // Handle updateCategory
      .addCase(updateCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateCategory.fulfilled, (state, action: PayloadAction<Category>) => {
        state.loading = false;
        const index = state.categories.findIndex(c => c.category_id === action.payload.category_id);
        if (index !== -1) {
          // Merge the old category with the new data to prevent losing fields not included in the update
          state.categories[index] = { 
            ...state.categories[index], 
            ...action.payload 
          };
        }
        // Update selected category if it's the one being edited
        if (state.selectedCategory && state.selectedCategory.category_id === action.payload.category_id) {
          state.selectedCategory = { 
            ...state.selectedCategory, 
            ...action.payload 
          };
        }
      })
      .addCase(updateCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      
      // Handle deleteCategory
      .addCase(deleteCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteCategory.fulfilled, (state, action: PayloadAction<number>) => {
        state.loading = false;
        state.categories = state.categories.filter(c => c.category_id !== action.payload);
        // Clear selected category if it's the one being deleted
        if (state.selectedCategory && state.selectedCategory.category_id === action.payload) {
          state.selectedCategory = null;
        }
      })
      .addCase(deleteCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearCategories, setSelectedCategory } = categorySlice.actions;
export default categorySlice.reducer;