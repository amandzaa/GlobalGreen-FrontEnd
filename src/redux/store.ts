import { combineReducers, configureStore } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

import authReducer from "./features/auth/authSlice";
import cartReducer from "./features/cart/cartSlice";
import productReducer from "./features/product/productSlice";
import userReducer from "./features/user/userSlice";

import storageSession from "redux-persist/lib/storage/session";


const authPersistConfig = {
  key: "auth",
  storage: storageSession,
  whitelist: ["user", "token"], 
};

const rootReducer = combineReducers({
  auth: persistReducer(authPersistConfig, authReducer), 
  cart: cartReducer,
  products: productReducer,
  users: userReducer,
});
const persistConfig = {
  key: "root",
  storage: storageSession,
  blacklist: [], 
};

// Create persisted root reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure store
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
  devTools: process.env.NODE_ENV !== "production",
});


export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
