import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

import authReducer from './features/auth/authSlice';
import cartReducer from './features/cart/cartSlice';

// Dynamic import for storage to handle SSR
const createNoopStorage = () => {
  return {
    getItem(_key: string) {
      return Promise.resolve(null);
    },
    setItem(_key: string, value: any) {
      return Promise.resolve(value);
    },
    removeItem(_key: string) {
      return Promise.resolve();
    }
  };
};

// Use proper storage based on environment
const storage = typeof window !== 'undefined' 
  ? require('redux-persist/lib/storage').default 
  : createNoopStorage();

// Configure Redux Persist
const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth', 'cart'], // persist both auth and cart
};

// Combine all reducers
const rootReducer = combineReducers({
  auth: authReducer,
  cart: cartReducer,
  // Add other reducers here as your application grows
});

// Create persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure the store with our persisted reducer
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Use constants instead of string literals for better type safety
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
  devTools: process.env.NODE_ENV !== 'production',
});

// Create the persistor
export const persistor = persistStore(store);

// Export types for TypeScript support
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Create typed hooks for better TypeScript integration
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;