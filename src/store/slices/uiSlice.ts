import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UiState {
  searchQuery: string;
  currentPage: number;
  itemsPerPage: number;
  sortBy: 'price' | 'rating' | 'none';
  selectedCategory: string | null;
}

const initialState: UiState = {
  searchQuery: '',
  currentPage: 1,
  itemsPerPage: 20,
  sortBy: 'none',
  selectedCategory: null,
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setSearchQuery(state, action: PayloadAction<string>) {
      state.searchQuery = action.payload;
      state.currentPage = 1; // Reset page on search
    },
    setPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload;
    },
    setSortBy(state, action: PayloadAction<'price' | 'rating' | 'none'>) {
      state.sortBy = action.payload;
    },
    setCategory(state, action: PayloadAction<string | null>) {
      state.selectedCategory = action.payload;
      state.currentPage = 1; // Reset page on category change
    },
  },
});

export const { setSearchQuery, setPage, setSortBy, setCategory } = uiSlice.actions;
export default uiSlice.reducer;
