import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';
import { fetchUserById } from '../user/userSlice';

// API base URL - updated to the production URL
const API_URL = 'https://globalgreen-backend-production.up.railway.app/products';

// Define the image type
export interface ProductImage {
  image_id: number;
  product_id: number;
  image_url: string;
  alt_text: string;
  display_order: number;
}

// Updated Product interface based on the backend model
export interface Product {
  product_id: number;
  name: string;
  description: string;
  price: number;
  stock_quantity: number;
  category_id?: number;
  organic?: boolean;
  unit_type?: string;
  discount_id?: number | null;
  user_id: number;
  images?: ProductImage[];
  nutritions?: string;
}

// New ProductSummary interface for the summary endpoint
export interface ProductSummary {
  product_id: number;
  product_name: string;
  sale: number;
  price: number;
  stock: number;
  images: string[];
}

// Filter options interface
export interface FilterOptions {
  search?: string;
  categories?: string[];
  seasonal?: 'all' | 'in-season';
  type?: 'all' | 'organic' | 'conventional';
  minPrice?: number;
  maxPrice?: number;
  inStock?: boolean;
  onSale?: boolean;
  sortBy?: 'price-asc' | 'price-desc' | 'newest' | 'popularity';
}

interface ProductState {
  products: Product[];
  selectedProduct: Product | null;
  productSummaries: ProductSummary[];
  filteredProducts: (Product | ProductSummary)[];
  filters: FilterOptions;
  loading: boolean;
  error: string | null;
  lastFetched: number | null;
}

const initialState: ProductState = {
  products: [],
  selectedProduct: null,
  productSummaries: [],
  filteredProducts: [],
  filters: {
    search: '',
    categories: [],
    seasonal: 'all',
    type: 'all'
  },
  loading: false,
  error: null,
  lastFetched: null,
};

// Async thunk to fetch all products with optional filter parameters
export const fetchAllProducts = createAsyncThunk<
  Product[],
  FilterOptions | void,
  { rejectValue: string }
>(
  'products/fetchAll',
  async (filters, { rejectWithValue, dispatch }) => {
    try {
      // If filters are provided, update the filter state
      if (filters) {
        dispatch(setFilters(filters));
      }
      
      // In a real implementation, you would pass these filters as query parameters
      // For now, we'll just fetch all products and filter them client-side
      const response = await axios.get<Product[]>(API_URL);
      return response.data || []; // Add fallback to empty array
    } catch (error) {
      const err = error as AxiosError<{ message?: string }>;
      console.error("Fetch product error:", err.response?.data || err.message);
      
      if (err.response?.data?.message) {
        return rejectWithValue(err.response.data.message);
      } else {
        return rejectWithValue('Failed to fetch products');
      }
    }
  }
);

// Async thunk to fetch products by user ID (seller)
export const fetchProductsByUserId = createAsyncThunk<
  Product[],
  number,
  { rejectValue: string }
>(
  'products/fetchByUserId',
  async (userId, { rejectWithValue }) => {
    try {
      const response = await axios.get<Product[]>(`${API_URL}/seller/${userId}`);
      return response.data || []; // Add fallback to empty array
    } catch (error) {
      const err = error as AxiosError<{ message?: string }>;
      console.error("Fetch user products error:", err.response?.data || err.message);
      
      if (err.response?.data?.message) {
        return rejectWithValue(err.response.data.message);
      } else {
        return rejectWithValue(`Failed to fetch products with userID: ${userId}`);
      }
    }
  }
);

// Async thunk to fetch a single product by ID
export const fetchProductById = createAsyncThunk<
  Product,
  number,
  { rejectValue: string }
>(
  'products/fetchById',
  async (productId, { rejectWithValue }) => {
    try {
      const response = await axios.get<Product>(`${API_URL}/${productId}`);
      if (!response.data) {
        return rejectWithValue(`Product with ID: ${productId} not found`);
      }
      return response.data;
    } catch (error) {
      const err = error as AxiosError<{ message?: string }>;
      console.error("Fetch product error:", err.response?.data || err.message);
      
      if (err.response?.data?.message) {
        return rejectWithValue(err.response.data.message);
      } else {
        return rejectWithValue(`Failed to fetch product with productID: ${productId}`);
      }
    }
  }
);

// Async thunk to fetch product summaries
export const fetchProductSummaries = createAsyncThunk<
  ProductSummary[],
  void,
  { rejectValue: string }
>(
  'products/fetchSummaries',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get<ProductSummary[]>(`${API_URL}/summary`);
      return response.data || []; // Add fallback to empty array
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data?.message || error.message);
      }
      return rejectWithValue('An unexpected error occurred');
    }
  }
);

// Async thunk to create a new product
export const createProduct = createAsyncThunk<
  Product,
  Partial<Product>,
  { rejectValue: string }
>(
  'products/createProduct',
  async (productData, { rejectWithValue }) => {
    try {
      const response = await axios.post<Product>(API_URL, productData);
      if (!response.data) {
        return rejectWithValue('No data returned from create product request');
      }
      return response.data;
    } catch (error) {
      const err = error as AxiosError<{ error?: string, message?: string }>;
      console.error("Create product error:", err.response?.data || err.message);
      
      const errorMessage = err.response?.data?.error || err.response?.data?.message || 'Failed to create product';
      return rejectWithValue(errorMessage);
    }
  }
);

// Async thunk to update a product
export const updateProduct = createAsyncThunk<
  Product,
  { id: number; data: Partial<Product> },
  { rejectValue: string }
>(
  'products/updateProduct',
  async ({ id, data }, { rejectWithValue, dispatch }) => {
    try {
      const response = await axios.put<Product>(`${API_URL}/${id}`, data);
      if (!response.data) {
        return rejectWithValue(`No data returned from update product request for ID: ${id}`);
      }
      
      // Only dispatch fetchUserById if the user ID is included in the response
      if (response.data.user_id) {
        dispatch(fetchUserById(response.data.user_id));
      }
      return response.data;
    } catch (error) {
      const err = error as AxiosError<{ message?: string }>;
      console.error("Update product error:", err.response?.data || err.message);

      if (err.response?.data?.message) {
        return rejectWithValue(err.response.data.message);
      } else {
        return rejectWithValue(`Failed to update product with ID: ${id}`);
      }
    }
  }
);

// Async thunk to delete a product
export const deleteProduct = createAsyncThunk<
  number,
  number,
  { rejectValue: string }
>(
  'products/deleteProduct',
  async (productId, { rejectWithValue }) => {
    try {
      await axios.delete<{ message: string }>(`${API_URL}/${productId}`);
      return productId; // Return the ID for the reducer to filter it out
    } catch (error) {
      const err = error as AxiosError<{ message?: string }>;
      console.error("Delete product error:", err.response?.data || err.message);
      if (err.response?.data?.message) {
        return rejectWithValue(err.response.data.message);
      } else {
        return rejectWithValue(`Failed to delete product with ID: ${productId}`);
      }
    }
  }
);

// Helper function to apply filters to products with improved error handling
const applyFilters = (
  items: (Product | ProductSummary)[], 
  filters: FilterOptions
): (Product | ProductSummary)[] => {
  // Safety check - if items is undefined or not an array, return an empty array
  if (!items || !Array.isArray(items) || items.length === 0) {
    return [];
  }

  try {
    return items.filter(item => {
      // Safety check for item
      if (!item) return false;
      
      // Check if it's a Product or ProductSummary
      const isProduct = 'name' in item;
      
      // Filter by search term (case insensitive)
      if (filters.search && filters.search.trim() !== '') {
        const searchTerm = filters.search.toLowerCase();
        const nameToCheck = isProduct 
          ? (item as Product).name?.toLowerCase()
          : (item as ProductSummary).product_name?.toLowerCase();
        
        if (!nameToCheck || !nameToCheck.includes(searchTerm)) {
          return false;
        }
      }
      
      // Filter by categories
      if (filters.categories && filters.categories.length > 0) {
        // For demonstration, we'll use a simple mapping of category IDs to category names
        // In a real app, you would have a proper category mapping
        const categoryMapping: Record<string, number> = {
          'fruits': 1,
          'vegetables': 2,
          'exotic': 3,
          'organic': 4
        };
        
        // Check if the product's category matches any of the selected categories
        if (isProduct) {
          const product = item as Product;
          // For 'organic' category, check the organic flag
          if (filters.categories.includes('organic') && !product.organic) {
            return false;
          }
          
          // For other categories, check the category_id
          const otherCategories = filters.categories.filter(cat => cat !== 'organic');
          if (otherCategories.length > 0 && product.category_id) {
            const categoryIds = otherCategories.map(cat => categoryMapping[cat] || 0);
            if (!categoryIds.includes(product.category_id)) {
              return false;
            }
          }
        } else {
          // For ProductSummary, we don't have enough information to filter by category
          // You might want to add additional fields to ProductSummary or extend this logic
        }
      }
      
      // Filter by price range
      if (filters.minPrice !== undefined || filters.maxPrice !== undefined) {
        const price = isProduct ? (item as Product).price : (item as ProductSummary).price;
        
        if (filters.minPrice !== undefined && price < filters.minPrice) {
          return false;
        }
        
        if (filters.maxPrice !== undefined && price > filters.maxPrice) {
          return false;
        }
      }
      
      // Filter by in-stock status
      if (filters.inStock) {
        if (isProduct) {
          if ((item as Product).stock_quantity <= 0) {
            return false;
          }
        } else {
          if ((item as ProductSummary).stock <= 0) {
            return false;
          }
        }
      }
      
      // Filter by on-sale status
      if (filters.onSale) {
        if (isProduct) {
          if (!(item as Product).discount_id) {
            return false;
          }
        } else {
          if ((item as ProductSummary).sale <= 0) {
            return false;
          }
        }
      }
      
      // Filter by seasonal status (in a real app, you would have this information)
      // For now, we'll assume products with stock_quantity > 10 are "in season"
      if (filters.seasonal === 'in-season') {
        if (isProduct) {
          if ((item as Product).stock_quantity <= 10) {
            return false;
          }
        } else {
          if ((item as ProductSummary).stock <= 10) {
            return false;
          }
        }
      }
      
      // Filter by product type (organic vs conventional)
      if (filters.type !== 'all' && filters.type) {
        if (isProduct) {
          const product = item as Product;
          if (filters.type === 'organic' && !product.organic) {
            return false;
          } else if (filters.type === 'conventional' && product.organic) {
            return false;
          }
        } else {
          // For ProductSummary, we don't have organic info
          // You might want to add additional fields to ProductSummary or extend this logic
        }
      }
      
      return true;
    }).sort((a, b) => {
      // Safety check for sortBy
      if (!filters.sortBy) {
        return 0;
      }
      
      // Determine if items are Products or ProductSummaries
      const isProductA = 'name' in a;
      const isProductB = 'name' in b;
      
      const priceA = isProductA ? (a as Product).price : (a as ProductSummary).price;
      const priceB = isProductB ? (b as Product).price : (b as ProductSummary).price;
      
      switch (filters.sortBy) {
        case 'price-asc':
          return priceA - priceB;
        case 'price-desc':
          return priceB - priceA;
        // Add more sorting options implementation
        default:
          return 0;
      }
    });
  } catch (error) {
    console.error('Error applying filters:', error);
    return [];
  }
};

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    clearProducts: (state) => {
      state.products = [];
      state.lastFetched = null;
    },
    setSelectedProduct: (state, action: PayloadAction<Product | null>) => {
      state.selectedProduct = action.payload;
    },
    // Add a new reducer to set filters
    setFilters: (state, action: PayloadAction<FilterOptions>) => {
      state.filters = { ...state.filters, ...action.payload };
      
      // Apply filters to current products with try/catch
      try {
        const allProducts = [
          ...state.products,
          ...state.productSummaries
        ];
        
        state.filteredProducts = applyFilters(allProducts, state.filters);
      } catch (error) {
        console.error('Error in setFilters:', error);
        state.filteredProducts = [];
        state.error = 'Error applying filters';
      }
    },
    // Add a new reducer to clear filters
    clearFilters: (state) => {
      state.filters = {
        search: '',
        categories: [],
        seasonal: 'all',
        type: 'all'
      };
      state.filteredProducts = [];
    },
  },
  extraReducers: (builder) => {
    builder
      // Handle fetchAllProducts
      .addCase(fetchAllProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllProducts.fulfilled, (state, action: PayloadAction<Product[]>) => {
        state.loading = false;
        state.products = action.payload;
        state.lastFetched = Date.now();
        
        // Apply current filters to the fetched products with try/catch
        try {
          const allProducts = [
            ...action.payload,
            ...state.productSummaries
          ];
          state.filteredProducts = applyFilters(allProducts, state.filters);
        } catch (error) {
          console.error('Error applying filters after fetchAllProducts:', error);
          state.filteredProducts = [];
          state.error = 'Error applying filters';
        }
      })
      .addCase(fetchAllProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string || 'Failed to fetch products';
      })
      
      // Handle fetchProductsByUserId
      .addCase(fetchProductsByUserId.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProductsByUserId.fulfilled, (state, action: PayloadAction<Product[]>) => {
        state.loading = false;
        state.products = action.payload;
        state.lastFetched = Date.now();
        
        // Apply current filters to the fetched products with try/catch
        try {
          const allProducts = [
            ...action.payload,
            ...state.productSummaries
          ];
          state.filteredProducts = applyFilters(allProducts, state.filters);
        } catch (error) {
          console.error('Error applying filters after fetchProductsByUserId:', error);
          state.filteredProducts = [];
          state.error = 'Error applying filters';
        }
      })
      .addCase(fetchProductsByUserId.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string || `Failed to fetch products by user ID`;
      })
      
      // Handle fetchProductById
      .addCase(fetchProductById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProductById.fulfilled, (state, action: PayloadAction<Product>) => {
        state.loading = false;
        state.selectedProduct = action.payload;
        // Also update in products array if it exists
        const index = state.products.findIndex(p => p.product_id === action.payload.product_id);
        if (index !== -1) {
          state.products[index] = action.payload;
        } else {
          state.products.push(action.payload);
        }
        
        // Re-apply filters to include the new product with try/catch
        try {
          const allProducts = [
            ...state.products,
            ...state.productSummaries
          ];
          state.filteredProducts = applyFilters(allProducts, state.filters);
        } catch (error) {
          console.error('Error applying filters after fetchProductById:', error);
          state.filteredProducts = [];
          state.error = 'Error applying filters';
        }
      })
      .addCase(fetchProductById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string || 'Failed to fetch product';
      })
      
      // Handle fetchProductSummaries
      .addCase(fetchProductSummaries.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProductSummaries.fulfilled, (state, action: PayloadAction<ProductSummary[]>) => {
        state.loading = false;
        state.productSummaries = action.payload;
        
        // Apply current filters to include the new summaries with try/catch
        try {
          const allProducts = [
            ...state.products,
            ...action.payload
          ];
          state.filteredProducts = applyFilters(allProducts, state.filters);
        } catch (error) {
          console.error('Error applying filters after fetchProductSummaries:', error);
          state.filteredProducts = [];
          state.error = 'Error applying filters';
        }
      })
      .addCase(fetchProductSummaries.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string || 'Failed to fetch product summaries';
      })
      
      // Handle createProduct
      .addCase(createProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createProduct.fulfilled, (state, action: PayloadAction<Product>) => {
        state.loading = false;
        state.products.push(action.payload);
        
        // Re-apply filters to include the new product with try/catch
        try {
          const allProducts = [
            ...state.products,
            ...state.productSummaries
          ];
          state.filteredProducts = applyFilters(allProducts, state.filters);
        } catch (error) {
          console.error('Error applying filters after createProduct:', error);
          state.filteredProducts = [];
          state.error = 'Error applying filters';
        }
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string || 'Failed to create product';
      })
      
      // Handle updateProduct
      .addCase(updateProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProduct.fulfilled, (state, action: PayloadAction<Product>) => {
        state.loading = false;
        const index = state.products.findIndex(p => p.product_id === action.payload.product_id);
        if (index !== -1) {
          // Merge the old product with the new data to prevent losing fields not included in the update
          state.products[index] = { 
            ...state.products[index], 
            ...action.payload 
          };
        }
        // Update selected product if it's the one being edited
        if (state.selectedProduct && state.selectedProduct.product_id === action.payload.product_id) {
          state.selectedProduct = { 
            ...state.selectedProduct, 
            ...action.payload 
          };
        }
        
        // Re-apply filters after the update with try/catch
        try {
          const allProducts = [
            ...state.products,
            ...state.productSummaries
          ];
          state.filteredProducts = applyFilters(allProducts, state.filters);
        } catch (error) {
          console.error('Error applying filters after updateProduct:', error);
          state.filteredProducts = [];
          state.error = 'Error applying filters';
        }
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string || 'Failed to update product';
      })
      
      // Handle deleteProduct
      .addCase(deleteProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteProduct.fulfilled, (state, action: PayloadAction<number>) => {
        state.loading = false;
        state.products = state.products.filter(p => p.product_id !== action.payload);
        // Clear selected product if it's the one being deleted
        if (state.selectedProduct && state.selectedProduct.product_id === action.payload) {
          state.selectedProduct = null;
        }
        // Also remove from summaries if present
        state.productSummaries = state.productSummaries.filter(p => p.product_id !== action.payload);
        
        // Re-apply filters after deletion with try/catch
        try {
          const allProducts = [
            ...state.products,
            ...state.productSummaries
          ];
          state.filteredProducts = applyFilters(allProducts, state.filters);
        } catch (error) {
          console.error('Error applying filters after deleteProduct:', error);
          state.filteredProducts = [];
          state.error = 'Error applying filters';
        }
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string || 'Failed to delete product';
      });
  },
});

export const { clearProducts, setSelectedProduct, setFilters, clearFilters } = productSlice.actions;
export default productSlice.reducer;