import { Product } from '@/features/products/types';

// 1. ANAHTAR KELİME (Key)
// Tarayıcı hafızasında bu verinin hangi isimle (dosya adı gibi) saklanacağını belirler.
const CART_KEY = 'product-dashboard-cart';

// 2. SEPET ELEMANI ŞABLONU (CartItem)
// Sepetteki her bir satırın yapısını belirler: Ürünün kendisi ve kaç adet olduğu.
export interface CartItem {
  product: Product;  // Ürün bilgilerinin tamamı
  quantity: number;  // Bu üründen kaç tane alındığı
}

/**
 * 3. SEPETİ GETİR (getCart)
 * Tarayıcıdan kayıtlı sepet listesini okur.
 */
export const getCart = (): CartItem[] => {
  // Next.js Kontrolü: Sunucu tarafında (Server-side) localStorage çalışmaz, 
  // bu yüzden sunucudaysak boş bir liste dönüyoruz.
  if (typeof window === 'undefined') return [];
  
  try {
    const stored = localStorage.getItem(CART_KEY);
    // Veri varsa; metni (string) tekrar gerçek bir listeye çevir (JSON.parse).
    // Veri yoksa; boş bir sepet [] dön.
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error('LocalStorage cart read error:', error);
    return [];
  }
};

/**
 * 4. SEPETİ KAYDET (saveCart)
 * Sepetteki güncel ürün listesini tarayıcı hafızasına yazar.
 */
export const saveCart = (items: CartItem[]): void => {
  if (typeof window === 'undefined') return;
  
  try {
    // Listeyi tarayıcının saklayabileceği düz metin (string) formatına çevirip kaydeder.
    localStorage.setItem(CART_KEY, JSON.stringify(items));
  } catch (error) {
    console.error('LocalStorage cart save error:', error);
  }
};

/**
 * 5. SEPETİ TEMİZLE (clearCart)
 * Tarayıcıdaki sepet verisini tamamen siler (Sipariş tamamlandığında kullanılır).
 */
export const clearCart = (): void => {
  if (typeof window === 'undefined') return;
  
  try {
    localStorage.removeItem(CART_KEY);
  } catch (error) {
    console.error('LocalStorage cart clear error:', error);
  }
};