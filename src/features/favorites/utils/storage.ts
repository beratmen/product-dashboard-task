import { Product } from '@/features/products/types';

// 1. ANAHTAR KELİME (Key)
const FAVORITES_KEY = 'product-dashboard-favorites-v2';

/**
 * 2. FAVORİLERİ GETİR (getFavorites)
 */
export const getFavorites = (): Product[] => {
  if (typeof window === 'undefined') return [];
  
  try {
    const stored = localStorage.getItem(FAVORITES_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error('LocalStorage read error:', error);
    return [];
  }
};

/**
 * 3. FAVORİLERİ KAYDET (saveFavorites)
 */
export const saveFavorites = (products: Product[]): void => {
  if (typeof window === 'undefined') return;
      // Nesne dizisini komple JSON string'e çevirip LocalStorage'a yazıyoruz
  try {
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(products));
  } catch (error) {
    console.error('LocalStorage save error:', error);
  }
};

/**
 * 4. FAVORİLERİ TEMİZLE (clearFavorites)
 * Tarayıcıdaki tüm favori verisini siler.
 */
export const clearFavorites = (): void => {
  if (typeof window === 'undefined') return;
  
  try {
    localStorage.removeItem(FAVORITES_KEY);
  } catch (error) {
    console.error('LocalStorage clear error:', error);
  }
};