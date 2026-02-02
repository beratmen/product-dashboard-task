import axiosInstance from '@/lib/axios';
import { Product, ProductResponse } from '@/features/products/types';

/**
 * 1. MERKEZİ HATA YÖNETİMİ (handleApiError)
 * API'den gelen hataları analiz eder ve kullanıcıya/konsola 
 * anlamlı mesajlar fırlatır.
 */
const handleApiError = (error: any, context: string) => {
  const errorMessage = error.response?.data?.message || error.message || 'An error occurred';
  const status = error.response?.status || 500;
  
  // Hata detayını geliştirici için konsola yazdırır.
  console.error(`[${context}] Error:`, { status, message: errorMessage });
  
  // HTTP durum kodlarına göre özel hata mesajları fırlatır.
  if (status === 404) {
    throw new Error(`${context}: Resource not found`);
  }
  if (status === 500) {
    throw new Error(`${context}: Server error. Please try again later.`);
  }
  if (status === 503) {
    throw new Error(`${context}: Service currently unavailable. Please try again later.`);
  }
  
  throw new Error(errorMessage);
};

/**
 * 2. ÜRÜNLERİ LİSTELEME (fetchProducts)
 * Bu fonksiyon; arama, kategori filtreleme ve sayfalama yaparak ürünleri çeker.
 */
export const fetchProducts = async (
  limit: number = 20,           // Bir kerede kaç ürün gelsin?
  skip: number = 0,            // Kaç ürün atlansın? (Sayfalama için)
  q: string = '',              // Arama kelimesi
  category: string | null = null // Seçili kategori
): Promise<ProductResponse> => {
  try {
    let endpoint: string;
    
    // Uygulanan filtreye göre farklı URL uçları (endpoints) belirlenir:
    if (category) {
      // Eğer bir kategori seçilmişse o kategoriye ait ürünler istenir.
      endpoint = `/products/category/${encodeURIComponent(category)}?limit=${limit}&skip=${skip}`;
    } else if (q) {
      // Eğer bir arama kelimesi girilmişse arama sonuçları istenir.
      endpoint = `/products/search?q=${encodeURIComponent(q)}&limit=${limit}&skip=${skip}`;
    } else {
      // Hiçbir filtre yoksa tüm ürünler liste halinde istenir.
      endpoint = `/products?limit=${limit}&skip=${skip}`;
    }
    
    const response = await axiosInstance.get<ProductResponse>(endpoint);
    
    // Gelen verinin doğruluğunu kontrol et
    if (!response.data || !response.data.products) {
      throw new Error('Invalid data format received');
    }
    
    return response.data;
  } catch (error) {
    handleApiError(error, 'fetchProducts');
    throw error;
  }
};

/**
 * 3. TEK BİR ÜRÜN ÇEKME (fetchProductById)
 * ID numarasını kullanarak tek bir ürünün detaylarını getirir.
 */
export const fetchProductById = async (id: string): Promise<Product> => {
  try {
    // ID boş gelirse hata fırlat
    if (!id || id.trim() === '') {
      throw new Error('Product ID is required');
    }
    
    const response = await axiosInstance.get<Product>(`/products/${encodeURIComponent(id)}`);
    
    if (!response.data || !response.data.id) {
      throw new Error('Invalid product data');
    }
    
    return response.data;
  } catch (error) {
    handleApiError(error, 'fetchProductById');
    throw error;
  }
};

/**
 * 4. KATEGORİLERİ ÇEKME (fetchCategories)
 * Mağazadaki tüm ürün kategorilerinin listesini getirir.
 */
export const fetchCategories = async (): Promise<string[]> => {
  try {
    const response = await axiosInstance.get<any>('/products/categories');
    
    // DummyJSON API'si bazen obje dizisi döner. 
    // Biz sadece kategori isimlerini (slug) dize (string) olarak ayıklıyoruz.
    if (Array.isArray(response.data)) {
      return response.data.map((cat: any) => {
        if (typeof cat === 'string') return cat;
        return cat.slug || cat.name || String(cat);
      });
    }
    
    return [];
  } catch (error) {
    handleApiError(error, 'fetchCategories');
    // Hata durumunda uygulamanın çökmemesi için boş dizi döner.
    return [];
  }
};