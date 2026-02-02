import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Product, ProductResponse } from '@/features/products/types';
import { fetchProducts, fetchProductById } from '@/features/products/services/productService';

// 1. ÜRÜN HAFIZA YAPISI (Interface)
interface ProductState {
  items: Product[];            // Ürünlerin listesi
  total: number;               // API'den gelen toplam ürün sayısı (Sayfalama için)
  currentProduct: Product | null; // Detay sayfasında bakılan mevcut ürün
  loading: boolean;            // Veri yükleniyor mu? (Spinner göstermek için)
  error: string | null;        // Bir hata oluştuysa hata mesajı
}

const initialState: ProductState = {
  items: [],
  total: 0,
  currentProduct: null,
  loading: false,
  error: null,
};

/**
 * 2. ASENKRON İŞLEMLER (Async Thunks)
 * API'den veri çeken fonksiyonlar. Redux Toolkit'te 'createAsyncThunk' kullanılır.
 */

// Tüm ürünleri çekmek için 'fetchProductsAsync'
export const fetchProductsAsync = createAsyncThunk(
  'products/fetchAll',
  async ({ limit, skip, q, category }: { limit: number; skip: number; q?: string; category?: string | null }, { rejectWithValue }) => {
    try {
      // productService'deki gerçek API çağrısını yapar
      return await fetchProducts(limit, skip, q, category);
    } catch (err: any) {
      // Hata olursa hata mesajını geri fırlatır
      return rejectWithValue(err.message);
    }
  }
);

// Tek bir ürünün detayını çekmek için 'fetchProductDetailAsync'
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

// 3. SLICE TANIMI
const productSlice = createSlice({
  name: 'products',
  initialState,
  
  // Normal (Senkron) Reducerlar: API ile işi olmayan, doğrudan veri atayanlar.
  reducers: {
    setProducts(state, action: PayloadAction<ProductResponse>) {
      state.items = action.payload.products;
      state.total = action.payload.total;
    },
    setCurrentProduct(state, action: PayloadAction<Product>) {
      state.currentProduct = action.payload;
    },
  },

  /**
   * extraReducers: Asenkron işlemlerin (Thunk) sonuçlarını takip eder.
   * Her Thunk'ın 3 durumu vardır: pending (bekliyor), fulfilled (başarılı), rejected (hata).
   */
  extraReducers: (builder) => {
    builder
      // Ürün listesi çekme işlemi başlarken
      .addCase(fetchProductsAsync.pending, (state) => {
        state.loading = true; // Yükleme animasyonunu aç
        state.error = null;
      })
      // Ürün listesi başarıyla gelince
      .addCase(fetchProductsAsync.fulfilled, (state, action) => {
        state.loading = false; // Yüklemeyi kapat
        state.items = action.payload.products; // Ürünleri hafızaya yaz
        state.total = action.payload.total;   // Toplam sayıyı kaydet
      })
      // Ürün listesi çekilirken hata oluşursa
      .addCase(fetchProductsAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string; // Hatayı hafızaya yaz
      })

      // Tekil ürün detayı çekme işlemleri
      .addCase(fetchProductDetailAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProductDetailAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.currentProduct = action.payload; // Detay verisini hafızaya yaz
      })
      .addCase(fetchProductDetailAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setProducts, setCurrentProduct } = productSlice.actions;
export default productSlice.reducer;