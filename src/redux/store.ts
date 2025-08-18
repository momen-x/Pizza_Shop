import { configureStore } from "@reduxjs/toolkit";
import cartReducer from './features/cart/cartSlice';

export const store = configureStore({
  reducer: {
    cart: cartReducer, // Add the cart reducer here
  },
  devTools: process.env.NODE_ENV === "development",
});

export type RootState = ReturnType<typeof store.getState>; // Fixed typo: was "RooteState"
export type AppDispatch = typeof store.dispatch;