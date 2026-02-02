// 1. TİP TANIMI (TypeScript)
// <T extends (...) => void>: Herhangi bir argüman alan ama bir şey döndürmeyen bir fonksiyon tipi bekliyoruz.
export function debounce<T extends (...args: any[]) => void>(func: T, wait: number): (...args: Parameters<T>) => void {
  
  // 2. TİMER (SÜRE ÖLÇER)
  // Devam eden bir bekleme süresi olup olmadığını takip eder.
  let timeout: NodeJS.Timeout;

  // 3. SARICI FONKSİYON
  // Gerçekten çalışacak olan fonksiyon budur.
  return function executedFunction(...args: Parameters<T>) {
    
    // 4. SONRA ÇALIŞTIR
    // Bekleme süresi dolduğunda yapılacak iş.
    const later = () => {
      clearTimeout(timeout); // Temizlik yapar
      func(...args);         // Asıl fonksiyonu (örn: Arama yap) çalıştırır
    };

    // 5. SIFIRLA VE BAŞLAT
    // Her yeni tuş vuruşunda (çağrıda) eski sayacı iptal eder (clearTimeout)
    // ve süreyi (wait ms) baştan başlatır.
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}