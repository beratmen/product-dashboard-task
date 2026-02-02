'use client';
import { Drawer, Box, Typography, IconButton, Stack, Divider, Button} from '@mui/material';
import { Close, FavoriteBorder, Delete, ShoppingCart } from '@mui/icons-material';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { removeFavoriteById } from '@/features/favorites/store/favoritesSlice';
import { addToCart } from '@/features/cart/store/cartSlice';
import Link from 'next/link';
import { Product } from '@/features/products/types';

interface FavoritesDrawerProps {
  open: boolean;
  onClose: () => void;
}

export default function FavoritesDrawer({ open, onClose }: FavoritesDrawerProps) {
  const dispatch = useAppDispatch();
  const { items: favoriteProducts } = useAppSelector((state) => state.favorites);

  const handleRemoveFavorite = (productId: number) => {
    dispatch(removeFavoriteById(productId));
  };

  const handleAddToCart = (product: Product) => {
    dispatch(addToCart(product));
  };

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      sx={{
        '& .MuiDrawer-paper': {
          width: { xs: '100%', sm: 420 },
          background: 'linear-gradient(to bottom, #f8fafc 0%, #ffffff 100%)',
        },
      }}
    >
      <Box sx={{ p: 3, height: '100%', display: 'flex', flexDirection: 'column' }}>
        {/* Header */}
        <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 3 }}>
          <Typography variant="h5" fontWeight={900} sx={{
            background: 'linear-gradient(135deg, #f43f5e 0%, #e11d48 100%)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}>
            Favorites
          </Typography>
          <IconButton onClick={onClose} size="small">
            <Close />
          </IconButton>
        </Stack>

        <Divider sx={{ mb: 3 }} />

        {/* Favorites Items */}
        <Box sx={{ flex: 1, overflow: 'auto' }}>
          {favoriteProducts.length === 0 ? (
            <Box sx={{ textAlign: 'center', py: 8 }}>
              <FavoriteBorder sx={{ fontSize: 80, color: 'text.disabled', mb: 2 }} />
              <Typography variant="h6" color="text.secondary" fontWeight={600}>
                No favorites yet
              </Typography>
              <Typography variant="body2" color="text.disabled" sx={{ mt: 1 }}>
                Add products to your favorites!
              </Typography>
            </Box>
          ) : (
            <Stack spacing={2}>
              {favoriteProducts.map((product) => (
                <Box
                  key={product.id}
                  sx={{
                    p: 2,
                    borderRadius: 3,
                    background: 'rgba(255, 255, 255, 0.8)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(0, 0, 0, 0.06)',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
                    },
                  }}
                >
                  <Stack direction="row" spacing={2}>
                    <Link href={`/products/${product.id}`} style={{ textDecoration: 'none' }}>
                      <Box
                        component="img"
                        src={product.thumbnail}
                        alt={product.title}
                        sx={{
                          width: 80,
                          height: 80,
                          objectFit: 'contain',
                          borderRadius: 2,
                          background: '#f5f7fa',
                          cursor: 'pointer',
                        }}
                      />
                    </Link>
                    <Box sx={{ flex: 1 }}>
                      <Link href={`/products/${product.id}`} style={{ textDecoration: 'none' }}>
                        <Typography
                          variant="body2"
                          fontWeight={700}
                          sx={{
                            mb: 0.5,
                            color: '#1e293b',
                            cursor: 'pointer',
                            lineHeight: 1.4,
                            '&:hover': { color: '#f43f5e' },
                          }}
                        >
                          {product.title}
                        </Typography>
                      </Link>
                      <Typography variant="h6" fontWeight={900} sx={{
                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                        backgroundClip: 'text',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        mb: 1.5,
                      }}>
                        ${product.price}
                      </Typography>
                      <Stack direction="row" spacing={1}>
                        <Button
                          size="small"
                          variant="contained"
                          startIcon={<ShoppingCart />}
                          onClick={() => handleAddToCart(product)}
                          sx={{
                            flex: 1,
                            fontSize: '0.75rem',
                            py: 0.75,
                            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                            '&:hover': {
                              background: 'linear-gradient(135deg, #5a67d8 0%, #6b46c1 100%)',
                            },
                          }}
                        >
                          Add to Cart
                        </Button>
                        <IconButton
                          size="small"
                          onClick={() => handleRemoveFavorite(product.id)}
                          sx={{
                            color: 'error.main',
                            '&:hover': { bgcolor: 'rgba(244, 63, 94, 0.1)' },
                          }}
                        >
                          <Delete fontSize="small" />
                        </IconButton>
                      </Stack>
                    </Box>
                  </Stack>
                </Box>
              ))}
            </Stack>
          )}
        </Box>
      </Box>
    </Drawer>
  );
}
