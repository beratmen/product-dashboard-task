import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// 1. HAFIZA ŞABLONU (Interface)
// Bu kısım, UI hafızasında nelerin saklanacağını "kural" olarak belirler.
interface UiState {
  searchQuery: string;       // Arama çubuğuna yazılan metin
  currentPage: number;       // Şu an kaçıncı sayfadayız?
  itemsPerPage: number;      // Bir sayfada kaç ürün gösterilecek?
  sortBy: 'price' | 'rating' | 'none'; // Sıralama ölçütü (Fiyat, Puan veya Yok)
  selectedCategory: string | null;     // Seçili olan kategori (Hiçbiri seçilmemişse null)
}

// 2. BAŞLANGIÇ DURUMU (initialState)
// Uygulama ilk açıldığında bu değerler ne olsun?
const initialState: UiState = {
  searchQuery: '',           // Arama kutusu boş başlasın
  currentPage: 1,            // 1. sayfadan başlansın
  itemsPerPage: 20,          // Sayfa başına 20 ürün gelsin
  sortBy: 'none',            // Sıralama olmasın
  selectedCategory: null,    // Kategori seçili olmasın
};

// 3. SLICE (Dilim) OLUŞTURMA
// Burası hem veriyi (state) hem de o veriyi değiştirecek fonksiyonları (reducers) tek paket yapar.
const uiSlice = createSlice({
  name: 'ui',                // Bu hafıza diliminin Redux içindeki adı
  initialState,              // Yukarıda tanımladığımız başlangıç değerlerini buraya veriyoruz
  
  // REDUCERS: Hafızayı değiştiren "Akıllı Fonksiyonlar"
  reducers: {
    
    // Arama metni değiştiğinde çalışır
    setSearchQuery(state, action: PayloadAction<string>) {
      state.searchQuery = action.payload; // Gelen metni hafızaya kaydet
      state.currentPage = 1;              // ÖNEMLİ: Yeni bir şey arandığında sayfayı otomatik 1'e çek
    },

    // Sayfa numarası değiştiğinde çalışır (Örn: 2. sayfaya basıldığında)
    setPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload; // Gelen sayfa numarasını hafızada güncelle
    },

    // Sıralama değiştiğinde çalışır (Fiyata göre artan/azalan vb.)
    setSortBy(state, action: PayloadAction<'price' | 'rating' | 'none'>) {
      state.sortBy = action.payload;
    },

    // Kategori seçildiğinde çalışır
    setCategory(state, action: PayloadAction<string | null>) {
      state.selectedCategory = action.payload; // Kategori ismini kaydet
      state.currentPage = 1;                   // Kategori değişince de sayfayı 1'e sıfırla
    },
  },
});

// 4. DIŞA AKTARMA (Exports)

// Fonksiyonları (Actions) ihraç ediyoruz ki bileşenlerden (components) çağırabilelim.
// Örn: dispatch(setPage(2)) diyerek sayfayı değiştirebileceğiz.
export const { setSearchQuery, setPage, setSortBy, setCategory } = uiSlice.actions;

// Reducer'ı ihraç ediyoruz ki ana store.ts dosyasına kaydedebilelim.
export default uiSlice.reducer;