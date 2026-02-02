'use client'; // MUI bileşenleri ve stil sisteminin doğru çalışması için Client Component olarak tanımlandı.

import { Box, Container, Typography, Button, Paper } from '@mui/material';
import { Home } from '@mui/icons-material';
import Link from 'next/link';

export default function NotFound() {
  return (
    // 1. ANA KAPSAYICI (Box)
    // Tüm ekranı kaplayan, içeriği dikey ve yatayda ortalayan gri fonlu alan.
    <Box
      sx={{
        minHeight: '100vh',        // Ekran boyu kadar yükseklik
        display: 'flex',
        alignItems: 'center',      // Dikeyde ortala
        justifyContent: 'center',  // Yatayda ortala
        bgcolor: '#f8fafc',        // Çok açık gri/mavi arka plan
        p: 2,
      }}
    >
      <Container maxWidth="sm">
        {/* 2. BEYAZ KART (Paper) 
            Hata mesajının içinde durduğu gölgeli, beyaz kutu. */}
        <Paper
          elevation={0}
          sx={{
            p: 5,
            textAlign: 'center',
            borderRadius: 4,          // Yuvarlatılmış köşeler
            border: '1px solid',
            borderColor: 'divider',   // İnce çizgi
            bgcolor: 'white',
            boxShadow: '0 4px 24px rgba(0,0,0,0.05)', // Hafif modern gölge
          }}
        >
          {/* 3. BÜYÜK 404 METNİ */}
          <Typography
            variant="h1"
            sx={{
              fontSize: '6rem',
              fontWeight: 800,
              // Gradyan Renk: Mordan maviye geçiş efekti
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              WebkitBackgroundClip: 'text',     // Rengi metnin içine hapseder
              WebkitTextFillColor: 'transparent', // Metnin orijinal rengini siler
              mb: 2,
              lineHeight: 1,
            }}
          >
            404
          </Typography>
          
          <Typography variant="h5" fontWeight={700} sx={{ mb: 2, color: '#1e293b' }}>
            Page Not Found
          </Typography>

          <Typography color="text.secondary" sx={{ mb: 4, lineHeight: 1.6 }}>
            The page you are looking for does not exist or might have been moved.
          </Typography>

          {/* 4. ANA SAYFAYA DÖNÜŞ BUTONU */}
          <Button
            component={Link} // SPA mantığıyla (sayfa yenilenmeden) gitmesi için Link'e dönüştürüldü
            href="/"
            variant="contained"
            size="large"
            startIcon={<Home />} // Ev ikonu
            sx={{
              borderRadius: 2,
              textTransform: 'none', // Harflerin hepsini büyük yapma
              fontWeight: 600,
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', // Buton da gradyanlı
              boxShadow: '0 8px 16px rgba(102, 126, 234, 0.24)',
            }}
          >
            Back to Home
          </Button>
        </Paper>
      </Container>
    </Box>
  );
}