import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ProductType } from '@/utils/productsType';
import { RootState } from '@/redux/store';

// Define the cart item interface
export interface CartItem {
  product: ProductType;
  selectedSize: string;
  selectedExtras: string[];
  quantity: number;
  totalPrice: number;
}

interface CartState {
  items: CartItem[];
}

const initialState: CartState = {
  items: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      const existingItemIndex = state.items.findIndex(
        (item) => 
          item.product.id === action.payload.product.id &&
          item.selectedSize === action.payload.selectedSize &&
          JSON.stringify(item.selectedExtras) === JSON.stringify(action.payload.selectedExtras)
      );

      if (existingItemIndex >= 0) {
        // If item already exists, update quantity
        state.items[existingItemIndex].quantity += action.payload.quantity;
        state.items[existingItemIndex].totalPrice += action.payload.totalPrice;
      } else {
        // If item doesn't exist, add new item
        state.items.push(action.payload);
      }
    },
    removeFromCart: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter((_, index) => index !== action.payload);
    },
    updateQuantity: (state, action: PayloadAction<{ index: number; quantity: number }>) => {
      const { index, quantity } = action.payload;
      if (state.items[index]) {
        const item = state.items[index];
        const pricePerItem = item.totalPrice / item.quantity;
        item.quantity = quantity;
        item.totalPrice = pricePerItem * quantity;
      }
    },
    clearCart: (state) => {
      state.items = [];
    },
  },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions;

export default cartSlice.reducer;

export const selectCartItems = (state: RootState) => state.cart.items;
export const selectCartTotal = (state: RootState) => 
  state.cart.items.reduce((total, item) => total + item.totalPrice, 0);