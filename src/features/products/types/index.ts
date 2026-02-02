// 1. ÜRÜN ŞABLONU (Product)
// Tek bir ürünün sahip olması gereken tüm özellikleri tanımlar.
export interface Product {
  id: number;           // Ürünün benzersiz numarası
  title: string;        // Ürün adı
  description: string;  // Ürün açıklaması
  price: number;        // Ürün fiyatı
  discountPercentage: number; // İndirim oranı
  rating: number;       // Ürün puanı
  stock: number;        // Stok adedi
  brand: string;        // Marka adı
  category: string;     // Kategori adı
  thumbnail: string;    // Küçük kapak resmi URL'i
  images: string[];     // Ürünün tüm resimlerini içeren liste
  reviews?: Review[];   // Ürün yorumları (İsteğe bağlı - soru işareti bu yüzden var)
}

// 2. YORUM ŞABLONU (Review)
// Kullanıcıların ürünlere yaptığı yorumların formatı.
export interface Review {
  rating: number;       // Verilen puan
  comment: string;      // Yorum metni
  date: string;         // Tarih
  reviewerName: string; // Yorumu yapanın adı
  reviewerEmail: string;// Yorumu yapanın e-postası
}

// 3. API CEVAP ŞABLONU (ProductResponse)
// DummyJSON API'sinden bir liste istediğimizde bize gelen paketin yapısı.
export interface ProductResponse {
  products: Product[]; // Gelen ürünlerin olduğu ana liste
  total: number;       // Veritabanındaki toplam ürün sayısı (Sayfalama için lazım)
  skip: number;        // Kaç ürün atlandığı
  limit: number;       // Bir sayfada kaç ürün istendiği
}

// 4. BİLEŞEN PROPSLARI (Component Props)
// React bileşenlerine gönderdiğimiz veri paketlerinin tipleri.

// Ürün Detay ekranı bir tane 'product' (Ürün) bekler.
export interface ProductDetailViewProps {
  product: Product;
}

// Ürünler Genel ekranı API'den gelen cevap paketini (initialData) bekler.
export interface ProductsViewProps {
  initialData: ProductResponse;
}