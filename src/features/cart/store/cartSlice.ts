import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product } from '@/features/products/types';
import { getCart, saveCart, CartItem } from '@/features/cart/utils/storage';

// 1. SEPET HAFIZA YAPISI (Interface)
interface CartState {
  items: CartItem[];  // Sepetteki ürünlerin ve adetlerinin tutulduğu liste
  isHydrated: boolean; // Tarayıcı hafızasından (LocalStorage) veriler yüklendi mi?
}

const initialState: CartState = {
  items: [],          // Başlangıçta sepet boş
  isHydrated: false,  // Henüz yükleme yapılmadı
};

// 2. SEPET SLICE TANIMI
const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    
    // Uygulama açıldığında kayıtlı sepet verilerini LocalStorage'dan çeker
    loadCart(state) {
      state.items = getCart();
      state.isHydrated = true;
    },

    // Sepete Ürün Ekleme Mantığı
    addToCart(state, action: PayloadAction<Product>) {
      // Önce: Bu ürün zaten sepette var mı diye kontrol et
      const existingItem = state.items.find(
        item => item.product.id === action.payload.id
      );
      
      if (existingItem) {
        // Varsa: Sadece adedini 1 artır
        existingItem.quantity += 1;
      } else {
        // Yoksa: Ürünü listeye yeni bir eleman olarak ekle (Adedi 1 yaparak)
        state.items.push({
          product: action.payload,
          quantity: 1,
        });
      }
      saveCart(state.items); // Güncel sepeti kalıcı hafızaya (LocalStorage) yaz
    },

    // Bir ürünü sepetten tamamen çıkarır
    removeFromCart(state, action: PayloadAction<number>) {
      // ID'si gelen değerle eşleşmeyenleri tut, eşleşeni listeden at
      state.items = state.items.filter(
        item => item.product.id !== action.payload
      );
      saveCart(state.items);
    },

    // Ürün miktarını (adet) manuel güncelleme
    updateQuantity(state, action: PayloadAction<{ productId: number; quantity: number }>) {
      const item = state.items.find(
        item => item.product.id === action.payload.productId
      );
      
      if (item) {
        // Gelen yeni adedi ata
        item.quantity = action.payload.quantity;
        
        // Eğer adet 0 veya altına düşerse, ürünü sepetten otomatik sil
        if (item.quantity <= 0) {
          state.items = state.items.filter(
            i => i.product.id !== action.payload.productId
          );
        }
      }
      saveCart(state.items);
    },

    // Tüm sepeti tek bir komutla boşaltır
    clearAllCart(state) {
      state.items = [];
      saveCart([]); // LocalStorage'ı da temizle
    },
  },
});

// 3. DIŞA AKTARMA (Actions)
export const {
  loadCart,
  addToCart,
  removeFromCart,
  updateQuantity,
  clearAllCart,
} = cartSlice.actions;

export default cartSlice.reducer;