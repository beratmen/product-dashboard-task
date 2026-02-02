'use client'; // Hata yakalama bileşenleri mutlaka Client Component olmalıdır.

import { useEffect } from 'react';
import { Box, Container, Typography, Button, Paper } from '@mui/material';
import { Refresh, Home } from '@mui/icons-material';
import { useRouter } from 'next/navigation';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }; // Oluşan hatanın detaylarını içeren nesne
  reset: () => void;                 // Sayfayı/Bölümü yeniden denemek için kullanılan fonksiyon
}) {
  const router = useRouter();
  
  // 1. HATA GÜNLÜĞÜ (Logging)
  // Hata oluştuğunda bu bilgiyi konsola veya bir hata takip servisine (Sentry vb.) gönderir.
  useEffect(() => {
    console.error('Uygulama Hatası:', error);
  }, [error]);

  return (
    // 2. ANA KAPSAYICI
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: '#f8fafc',
        p: 2,
      }}
    >
      <Container maxWidth="sm">
        <Paper
          elevation={0}
          sx={{
            p: 5,
            textAlign: 'center',
            borderRadius: 4,
            border: '1px solid',
            borderColor: 'divider',
            bgcolor: 'white',
            boxShadow: '0 4px 24px rgba(0,0,0,0.05)',
          }}
        >
          {/* 3. KRİTİK HATA BAŞLIĞI 
              Kırmızı gradyan kullanılarak durumun ciddiyeti vurgulanmış. */}
          <Typography
            variant="h1"
            sx={{
              fontSize: '4rem',
              fontWeight: 800,
              background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              mb: 2,
            }}
          >
            Oops!
          </Typography>
          
          <Typography variant="h5" fontWeight={700} sx={{ mb: 2, color: '#1e293b' }}>
            Something went wrong
          </Typography>

          <Typography color="text.secondary" sx={{ mb: 4, lineHeight: 1.6 }}>
            We encountered an unexpected error. Please try refreshing the page or contact support if the problem persists.
          </Typography>

          {/* 4. GELİŞTİRİCİ NOTU (Development Mode Only)
              Sadece yazılım geliştirme aşamasındaysanız hatanın teknik detayını gösterir. 
              Canlı sisteme (production) geçtiğinizde bu kutu gizlenir. */}
          {process.env.NODE_ENV === 'development' && (
            <Paper
              variant="outlined"
              sx={{
                p: 2,
                mb: 4,
                bgcolor: '#fef2f2',
                borderColor: '#fee2e2',
                textAlign: 'left',
                maxHeight: 200,
                overflow: 'auto',
              }}
            >
              <Typography variant="caption" fontFamily="monospace" color="error.main">
                Error Message: {error.message}
              </Typography>
            </Paper>
          )}

          {/* 5. AKSİYON BUTONLARI */}
          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
            {/* Tekrar Dene Butonu: Hatayı temizleyip sayfayı yeniden render etmeye çalışır. */}
            <Button
              variant="contained"
              size="large"
              startIcon={<Refresh />}
              onClick={reset}
              sx={{
                borderRadius: 2,
                textTransform: 'none',
                fontWeight: 600,
                background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
                boxShadow: '0 4px 12px rgba(239, 68, 68, 0.2)',
              }}
            >
              Try Again
            </Button>
            
            {/* Anasayfa Butonu: Kullanıcıyı kilitlendiği yerden ana sayfaya kurtarır. */}
            <Button
              variant="outlined"
              size="large"
              startIcon={<Home />}
              onClick={() => router.push('/')}
              sx={{
                borderRadius: 2,
                textTransform: 'none',
                fontWeight: 600,
                color: 'text.secondary',
                borderColor: 'divider',
              }}
            >
              Go to Home
            </Button>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}