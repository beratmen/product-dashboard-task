import { configureStore } from '@reduxjs/toolkit';
import productReducer from './slices/productSlice';
import uiReducer from './slices/uiSlice';
import favoritesReducer from './slices/favoritesSlice';
import cartReducer from './slices/cartSlice';

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
