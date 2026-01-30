import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product } from '@/types';
import { getCart, saveCart, CartItem } from '@/lib/cart';

interface CartState {
  items: CartItem[];
  isHydrated: boolean;
}

const initialState: CartState = {
  items: [],
  isHydrated: false,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    loadCart(state) {
      state.items = getCart();
      state.isHydrated = true;
    },
    addToCart(state, action: PayloadAction<Product>) {
      const existingItem = state.items.find(
        item => item.product.id === action.payload.id
      );
      
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({
          product: action.payload,
          quantity: 1,
        });
      }
      saveCart(state.items);
    },
    removeFromCart(state, action: PayloadAction<number>) {
      state.items = state.items.filter(
        item => item.product.id !== action.payload
      );
      saveCart(state.items);
    },
    updateQuantity(state, action: PayloadAction<{ productId: number; quantity: number }>) {
      const item = state.items.find(
        item => item.product.id === action.payload.productId
      );
      if (item) {
        item.quantity = action.payload.quantity;
        if (item.quantity <= 0) {
          state.items = state.items.filter(
            i => i.product.id !== action.payload.productId
          );
        }
      }
      saveCart(state.items);
    },
    clearAllCart(state) {
      state.items = [];
      saveCart([]);
    },
  },
});

export const {
  loadCart,
  addToCart,
  removeFromCart,
  updateQuantity,
  clearAllCart,
} = cartSlice.actions;

export default cartSlice.reducer;
