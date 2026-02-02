import axios, { AxiosError } from 'axios';

// 1. AXIOS ÖZEL KOPYASI (Instance) OLUŞTURMA
// Tüm API isteklerinde geçerli olacak varsayılan ayarları burada yapıyoruz.
const axiosInstance = axios.create({
  baseURL: 'https://dummyjson.com', // İsteklerin başına otomatik eklenecek ana adres
  timeout: 15000,                  // 15 saniye içinde cevap gelmezse isteği iptal et
  headers: {
    'Content-Type': 'application/json', // Gönderilen verinin JSON olduğunu belirtir
  },
});

export default axiosInstance;