import { configureStore } from '@reduxjs/toolkit';
import productReducer from '@/features/products/store/productSlice';
import uiReducer from './slices/uiSlice';
import favoritesReducer from '@/features/favorites/store/favoritesSlice';
import cartReducer from '@/features/cart/store/cartSlice';

export const makeStore = () => {
  return configureStore({
    reducer: {
      products: productReducer,
      ui: uiReducer,
      favorites: favoritesReducer,
      cart: cartReducer,
    },
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
