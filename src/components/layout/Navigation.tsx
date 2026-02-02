'use client';
import { useState, useEffect } from 'react';
import { AppBar, Toolbar, Typography, Container, Box, IconButton, Stack, Badge } from '@mui/material';
import { ShoppingBag, Person, Favorite, FavoriteBorder, ShoppingCart } from '@mui/icons-material';
import Link from 'next/link';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { loadCart } from '@/features/cart/store/cartSlice';
import { loadFavorites } from '@/features/favorites/store/favoritesSlice';
import CartDrawer from '@/features/cart/components/CartDrawer';
import FavoritesDrawer from '@/features/favorites/components/FavoritesDrawer';

export default function Navigation() {
  const dispatch = useAppDispatch();

  // 1. REDUX'TAN VERİ ÇEKME
  // Favori ID'lerini ve sepet verilerini global hafızadan (Redux) alıyoruz.
  const { items: favoriteItems, isHydrated: isFavoritesHydrated } = useAppSelector((state) => state.favorites);
  const { items, isHydrated: isCartHydrated } = useAppSelector((state) => state.cart);

  // 2. YEREL STATE (Panellerin Açık/Kapalı Durumu)
  const [cartOpen, setCartOpen] = useState(false);
  const [favoritesOpen, setFavoritesOpen] = useState(false);

  // 3. SEPETİ HAFIZADAN YÜKLEME
  // Sayfa ilk yüklendiğinde, eğer sepet henüz yüklenmemişse (LocalStorage'dan) yükle.
  useEffect(() => {
    if (!isCartHydrated) {
      dispatch(loadCart());
    }
    if (!isFavoritesHydrated) {
      dispatch(loadFavorites());
    }
  }, [dispatch, isCartHydrated, isFavoritesHydrated]);

  // 4. TOPLAM ÜRÜN SAYISI HESABI
  // Sepetteki tüm ürünlerin miktarlarını toplayarak toplam adedi bulur.
  const cartItemCount = items.reduce((sum, item) => sum + item.quantity, 0);
  
  return (
    <>
      {/* APPBAR: Üst barın ana kapsayıcısı */}
      <AppBar 
        position="sticky" 
        color="inherit"
        elevation={0}
        sx={{
          backgroundColor: 'rgba(255, 255, 255, 0.8)', // Yarı saydam beyaz
          backdropFilter: 'blur(12px)',               // Cam efekti (Buzlu cam)
          borderBottom: '1px solid rgba(0, 0, 0, 0.06)',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
          transition: 'all 0.3s ease'
        }}
      >
        <Container maxWidth="xl">
          <Toolbar disableGutters sx={{ height: 70, justifyContent: 'space-between' }}>
            
            {/* LOGO BÖLÜMÜ */}
            <Link href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 12 }}>
              {/* Kare Logo Kutusu */}
              <Box
                sx={{
                  width: 48, height: 48,
                  background: 'linear-gradient(135deg, #4338ca 0%, #7c3aed 100%)', // Mor gradyan
                  borderRadius: 2.5,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: 'white',
                  boxShadow: '0 4px 12px rgba(67, 56, 202, 0.3)',
                  '&:hover': { transform: 'translateY(-2px)' } // Üzerine gelince yukarı zıplama
                }}
              >
                  <ShoppingBag fontSize="medium" />
              </Box>
              {/* Logo Metni */}
              <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                <Typography variant="h6" sx={{ fontWeight: 900, letterSpacing: '-0.5px' }}>
                  PROSTORE
                </Typography>
                <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 600 }}>
                  Premium Products
                </Typography>
              </Box>
            </Link>

            {/* SAĞ TARAF: AKSİYON BUTONLARI */}
            <Stack direction="row" spacing={0.5} alignItems="center">
              
              {/* Favoriler Butonu ve Rozeti (Badge) */}
              <IconButton onClick={() => setFavoritesOpen(true)}>
                <Badge badgeContent={favoriteItems.length} color="error">
                  {/* Eğer favori varsa dolu kalp, yoksa boş kalp göster */}
                  {favoriteItems.length > 0 ? <Favorite /> : <FavoriteBorder />}
                </Badge>
              </IconButton>

              {/* Sepet Butonu ve Rozeti */}
              <IconButton onClick={() => setCartOpen(true)}>
                <Badge badgeContent={cartItemCount} color="primary">
                  <ShoppingCart />
                </Badge>
              </IconButton>
              
              {/* Profil Butonu */}
              <Link href="/profile" style={{ textDecoration: 'none', color: 'inherit' }}>
                <IconButton><Person /></IconButton>
              </Link>
            </Stack>

          </Toolbar>
        </Container>
      </AppBar>

      {/* YAN PANELLER (Drawer Components) */}
      {/* Bunlar bileşen çağrıldığında DOM'da hazır bekler, state 'true' olunca yandan kayarak açılır */}
      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
      <FavoritesDrawer open={favoritesOpen} onClose={() => setFavoritesOpen(false)} />
    </>
  );
}