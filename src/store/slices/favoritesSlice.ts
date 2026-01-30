import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getFavorites, saveFavorites } from '@/lib/localStorage';

interface FavoritesState {
  favoriteIds: number[];
  isHydrated: boolean;
}

const initialState: FavoritesState = {
  favoriteIds: [],
  isHydrated: false,
};

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    loadFavorites(state) {
      state.favoriteIds = getFavorites();
      state.isHydrated = true;
    },
    addFavorite(state, action: PayloadAction<number>) {
      if (!state.favoriteIds.includes(action.payload)) {
        state.favoriteIds.push(action.payload);
        saveFavorites(state.favoriteIds);
      }
    },
    removeFavorite(state, action: PayloadAction<number>) {
      state.favoriteIds = state.favoriteIds.filter(id => id !== action.payload);
      saveFavorites(state.favoriteIds);
    },
    toggleFavorite(state, action: PayloadAction<number>) {
      const index = state.favoriteIds.indexOf(action.payload);
      if (index >= 0) {
        state.favoriteIds.splice(index, 1);
      } else {
        state.favoriteIds.push(action.payload);
      }
      saveFavorites(state.favoriteIds);
    },
    clearAllFavorites(state) {
      state.favoriteIds = [];
      saveFavorites([]);
    },
  },
});

export const { 
  loadFavorites, 
  addFavorite, 
  removeFavorite, 
  toggleFavorite,
  clearAllFavorites 
} = favoritesSlice.actions;

export default favoritesSlice.reducer;
