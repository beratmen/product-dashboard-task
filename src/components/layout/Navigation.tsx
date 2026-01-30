'use client';
import { AppBar, Toolbar, Typography, Container, Box, Button, IconButton, Stack, Badge, Divider } from '@mui/material';
import { ShoppingBag, Person, Search, Favorite, FavoriteBorder } from '@mui/icons-material';
import Link from 'next/link';
import { useAppSelector } from '@/store/hooks';

export default function Navigation() {
  const { favoriteIds } = useAppSelector((state) => state.favorites);
  
  return (
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
            <Link href="/products" style={{ textDecoration: 'none' }}>
              <Button 
                color="inherit" 
                sx={{ 
                  display: { xs: 'none', md: 'flex' },
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    color: 'primary.main',
                    transform: 'translateY(-2px)'
                  }
                }}
              >
                  Products
              </Button>
            </Link>
            
            <Divider 
              orientation="vertical" 
              flexItem 
              sx={{ 
                my: 1, 
                display: { xs: 'none', md: 'flex' },
                opacity: 0.2 
              }} 
            />
            
            <Link href="/products" style={{ textDecoration: 'none' }}>
              <Button 
                color="inherit" 
                sx={{ 
                  display: { xs: 'none', md: 'flex' },
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    color: 'primary.main',
                    transform: 'translateY(-2px)'
                  }
                }}
              >
                  Orders
              </Button>
            </Link>
            
            <IconButton
              sx={{
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'scale(1.1) rotate(10deg)',
                  color: 'primary.main'
                }
              }}
            >
                <Search fontSize="medium" />
            </IconButton>

            {/* Favorites Badge */}
            <Link href="/products" style={{ textDecoration: 'none' }}>
              <IconButton
                sx={{
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'scale(1.1)',
                    color: 'error.main'
                  }
                }}
              >
                <Badge badgeContent={favoriteIds.length} color="error" sx={{ cursor: 'pointer' }}>
                  {favoriteIds.length > 0 ? <Favorite fontSize="medium" /> : <FavoriteBorder fontSize="medium" />}
                </Badge>
              </IconButton>
            </Link>
            
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
  );
}
