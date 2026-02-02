import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getFavorites, saveFavorites } from '@/features/favorites/utils/storage';
import { Product } from '@/features/products/types';

// 1. FAVORİ HAFIZA YAPISI (Interface)
interface FavoritesState {
  items: Product[];  // Beğenilen ürünlerin tamamını tutan liste
  isHydrated: boolean;  // LocalStorage'dan veriler yüklendi mi?
}

const initialState: FavoritesState = {
  items: [],      // Başlangıçta liste boş
  isHydrated: false,    // Henüz yükleme yapılmadı
};

// 2. FAVORİ SLICE TANIMI
const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    
    // Tarayıcı hafızasından (LocalStorage) favorileri çekip Redux'a yükler
    loadFavorites(state) {
      state.items = getFavorites();
      state.isHydrated = true;
    },

    // TERSİNE ÇEVİR (Toggle): Ürün varsa çıkarır, yoksa ekler.
    toggleFavorite(state, action: PayloadAction<Product>) {
      const product = action.payload;
      const index = state.items.findIndex(item => item.id === product.id);
      
      if (index >= 0) {
        // Ürün zaten varsa; onu listeden sil
        state.items.splice(index, 1);
      } else {
        // Ürün yoksa; listeye ekle
        state.items.push(product);
      }
      saveFavorites(state.items); // Kaydet
    },

    // Bir ürünü ID üzerinden kaldırır (Drawer gibi yerlerde kolaylık için)
    removeFavoriteById(state, action: PayloadAction<number>) {
      state.items = state.items.filter(item => item.id !== action.payload);
      saveFavorites(state.items);
    },

    // Tüm favori listesini bir kerede sıfırlar
    clearAllFavorites(state) {
      state.items = [];
      saveFavorites([]); // LocalStorage'ı da temizle
    },
  },
});

// 3. DIŞA AKTARMA (Exports)
export const { 
  loadFavorites, 
  toggleFavorite,
  removeFavoriteById,
  clearAllFavorites 
} = favoritesSlice.actions;

export default favoritesSlice.reducer;