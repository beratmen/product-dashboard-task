import { configureStore } from '@reduxjs/toolkit';
import productReducer from './slices/productSlice';
import uiReducer from './slices/uiSlice';
import favoritesReducer from './slices/favoritesSlice';

export const makeStore = () => {
  return configureStore({
    reducer: {
      products: productReducer,
      ui: uiReducer,
      favorites: favoritesReducer,
    },
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
