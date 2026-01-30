import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Product, ProductResponse } from '@/features/products/types';
import { fetchProducts, fetchProductById } from '@/features/products/services/productService';

interface ProductState {
  items: Product[];
  total: number;
  currentProduct: Product | null;
  loading: boolean;
  error: string | null;
}

const initialState: ProductState = {
  items: [],
  total: 0,
  currentProduct: null,
  loading: false,
  error: null,
};

// Async Thunks
export const fetchProductsAsync = createAsyncThunk(
  'products/fetchAll',
  async ({ limit, skip, q, category }: { limit: number; skip: number; q?: string; category?: string | null }, { rejectWithValue }) => {
    try {

      return await fetchProducts(limit, skip, q, category);
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);

export const fetchProductDetailAsync = createAsyncThunk(
  'products/fetchDetail',
  async (id: string, { rejectWithValue }) => {
    try {
      return await fetchProductById(id);
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setProducts(state, action: PayloadAction<ProductResponse>) {
      state.items = action.payload.products;
      state.total = action.payload.total;
    },
    setCurrentProduct(state, action: PayloadAction<Product>) {
      state.currentProduct = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductsAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProductsAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload.products;
        state.total = action.payload.total;
      })
      .addCase(fetchProductsAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchProductDetailAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProductDetailAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.currentProduct = action.payload;
      })
      .addCase(fetchProductDetailAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setProducts, setCurrentProduct } = productSlice.actions;
export default productSlice.reducer;
