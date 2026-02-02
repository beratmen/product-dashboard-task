import { configureStore } from '@reduxjs/toolkit';
import productReducer from '@/features/products/store/productSlice';
import uiReducer from './slices/uiSlice';
import favoritesReducer from '@/features/favorites/store/favoritesSlice';
import cartReducer from '@/features/cart/store/cartSlice';

// 1. makeStore Fonksiyonu
// Neden doğrudan 'store' değil de bir fonksiyon? 
// Çünkü Next.js'te her bir kullanıcı isteğinde (veya sayfa yenilendiğinde) 
// temiz, yeni bir hafıza oluşturmak gerekebilir.
export const makeStore = () => {
  return configureStore({
    // REDUCER: Uygulamanın farklı bölümlerindeki (Ürünler, Sepet vb.) 
    // küçük hafıza parçalarını (slice) tek bir büyük hafızada birleştirir.
    reducer: {
      products: productReducer,   // Ürün listesi ve yükleme durumları
      ui: uiReducer,             // Arama metni, sayfa numarası, sıralama
      favorites: favoritesReducer, // Beğenilen ürün listesi
      cart: cartReducer,          // Sepetteki ürünler ve adetler
    },
  });
};

// 2. TİP TANIMLAMALARI (TypeScript için)
// Bu kısımlar, TypeScript'in "Hafızada tam olarak ne var?" sorusuna otomatik yanıt vermesini sağlar.

// AppStore: Store'un kendi tipi (hafızanın genel yapısı)
export type AppStore = ReturnType<typeof makeStore>;

// RootState: Hafıza'nın içindeki VERİLERİN tipi (State'e baktığımda ne göreceğim?)
export type RootState = ReturnType<AppStore['getState']>;

// AppDispatch: Aksiyon gönderen "dispatch" fonksiyonunun tipi 
// (Hangi fonksiyonları çağırabilirim?)
export type AppDispatch = AppStore['dispatch'];


/**
 * ÖZET:
 * Bu dosya bir orkestra şefi gibidir. 
 * Kendi başlarına çalışan reducer'ları alıp tek bir uyum içinde (Store) toplar 
 * ve tüm uygulamaya bu hafızayı dağıtır.
 */