import { fetchProductById } from '@/features/products/services/productService';
import ProductDetailView from '@/features/products/components/ProductDetailView';

// 1. DİNAMİK PARAMETRE ALIMI
// Next.js [id] klasör yapısı sayesinde URL'deki 'id' kısmını 'params' üzerinden bize verir.
// Yeni Next.js versiyonlarında 'params' bir Promise (beklenmesi gereken değer) olarak gelir.
export default async function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  
  // 2. ID DEĞERİNİ ÇÖZME
  // URL'den gelen ID'yi (örneğin products/15 ise '15') 'await' diyerek alıyoruz.
  const { id } = await params;

  // 3. SUNUCU TARAFLI TEKİL VERİ ÇEKME
  // Belirlenen ID'ye sahip ürünün tüm detaylarını daha sayfa açılmadan sunucuda çekiyoruz.
  // Bu, tek bir ürünün detaylarının Google gibi arama motorları tarafından tam taranmasını sağlar.
  const product = await fetchProductById(id);

  // 4. GÖRÜNÜMÜ OLUŞTURMA
  // Çekilen ürün verisini, tasarımı yapan 'ProductDetailView' bileşenine gönderiyoruz.
  return <ProductDetailView product={product} />;
}