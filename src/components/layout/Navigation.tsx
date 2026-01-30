'use client';
import { useState } from 'react';
import { AppBar, Toolbar, Typography, Container, Box, IconButton, Stack, Badge, Divider } from '@mui/material';
import { ShoppingBag, Person, Search, Favorite, FavoriteBorder, ShoppingCart } from '@mui/icons-material';
import Link from 'next/link';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { loadCart } from '@/features/cart/store/cartSlice';
import { useEffect } from 'react';
import CartDrawer from '@/features/cart/components/CartDrawer';
import FavoritesDrawer from '@/features/favorites/components/FavoritesDrawer';

export default function Navigation() {
  const dispatch = useAppDispatch();
  const { favoriteIds } = useAppSelector((state) => state.favorites);
  const { items, isHydrated } = useAppSelector((state) => state.cart);
  const [cartOpen, setCartOpen] = useState(false);
  const [favoritesOpen, setFavoritesOpen] = useState(false);

  useEffect(() => {
    if (!isHydrated) {
      dispatch(loadCart());
    }
  }, [dispatch, isHydrated]);

  const cartItemCount = items.reduce((sum, item) => sum + item.quantity, 0);
  
  return (
    <>
      <AppBar 
        position="sticky" 
        color="inherit"
        elevation={0}
        sx={{
          backgroundColor: 'rgba(255, 255, 255, 0.8)',
          backdropFilter: 'blur(12px)',
          borderBottom: '1px solid rgba(0, 0, 0, 0.06)',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
          transition: 'all 0.3s ease'
        }}
      >
        <Container maxWidth="xl">
          <Toolbar disableGutters sx={{ height: 70, justifyContent: 'space-between' }}>
            {/* Logo */}
            <Link href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 12 }}>
              <Box
                sx={{
                  width: 48,
                  height: 48,
                  background: 'linear-gradient(135deg, #4338ca 0%, #7c3aed 100%)',
                  borderRadius: 2.5,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  boxShadow: '0 4px 12px rgba(67, 56, 202, 0.3)',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-2px)',
                    boxShadow: '0 6px 20px rgba(67, 56, 202, 0.4)'
                  }
                }}
              >
                  <ShoppingBag fontSize="medium" />
              </Box>
              <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 900,
                    background: 'linear-gradient(135deg, #4338ca 0%, #7c3aed 100%)',
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    letterSpacing: '-0.5px',
                    fontSize: { xs: '1rem', md: '1.3rem' }
                  }}
                >
                  PROSTORE
                </Typography>
                <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 600, letterSpacing: 0.5, display: { xs: 'none', md: 'block' } }}>
                  Premium Products
                </Typography>
              </Box>
            </Link>

            <Box sx={{ flexGrow: 1 }} />

            {/* Actions */}
            <Stack direction="row" spacing={0.5} alignItems="center">
              {/* Favorites Badge */}
              <IconButton
                onClick={() => setFavoritesOpen(true)}
                sx={{
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'scale(1.1)',
                    color: 'error.main'
                  }
                }}
              >
                <Badge badgeContent={favoriteIds.length} color="error">
                  {favoriteIds.length > 0 ? <Favorite fontSize="medium" /> : <FavoriteBorder fontSize="medium" />}
                </Badge>
              </IconButton>

              {/* Cart Badge */}
              <IconButton
                onClick={() => setCartOpen(true)}
                sx={{
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'scale(1.1)',
                    color: 'primary.main'
                  }
                }}
              >
                <Badge badgeContent={cartItemCount} color="primary">
                  <ShoppingCart fontSize="medium" />
                </Badge>
              </IconButton>
              
              <IconButton
                sx={{
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'scale(1.1)',
                    color: 'primary.main'
                  }
                }}
              >
                  <Person fontSize="medium" />
              </IconButton>
            </Stack>

          </Toolbar>
        </Container>
      </AppBar>

      {/* Cart Drawer */}
      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
      
      {/* Favorites Drawer */}
      <FavoritesDrawer open={favoritesOpen} onClose={() => setFavoritesOpen(false)} />
    </>
  );
}
