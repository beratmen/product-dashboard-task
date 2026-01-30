'use client';

import { useState } from 'react';
import {
  Container, Grid, Typography, Box, Rating, Chip, Button,
  Paper, Divider, CircularProgress, Alert, Stack, Avatar,
  Table, TableBody, TableCell, TableContainer, TableRow,
  IconButton
} from '@mui/material';
import { Product } from '@/features/products/types';
import { fetchProductById } from '@/features/products/services/productService';
import { 
  Refresh, ArrowBack, ShoppingCart, Favorite, FavoriteBorder,
  LocalShipping
} from '@mui/icons-material';
import Link from 'next/link';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { toggleFavorite } from '@/features/favorites/store/favoritesSlice';
import { addToCart } from '@/features/cart/store/cartSlice';

interface ProductDetailViewProps {
  product: Product;
}

export default function ProductDetailView({ product: initialProduct }: ProductDetailViewProps) {
  const dispatch = useAppDispatch();
  const { favoriteIds } = useAppSelector((state) => state.favorites);
  const [product, setProduct] = useState<Product>(initialProduct);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const isFavorite = favoriteIds.includes(product.id);

  const handleRefresh = async () => {
    setLoading(true);
    try {
      const refreshedProduct = await fetchProductById(String(product.id));
      setProduct(refreshedProduct);
    } catch (err) {
      setError('Failed to refresh data');
    } finally {
      setLoading(false);
    }
  };

  const handleAddToFavorite = () => {
    dispatch(toggleFavorite(product.id));
  };

  const handleAddToCart = () => {
    dispatch(addToCart(product));
  };

  return (
    <Box sx={{ 
      minHeight: '100vh',
      background: 'linear-gradient(to bottom, #f8fafc 0%, #ffffff 100%)',
      pb: 8
    }}>
      <Container maxWidth="lg" sx={{ pt: 6 }}>
        {/* Navigation */}
        <Box sx={{ mb: 4 }}>
          <Button 
            component={Link} 
            href="/products" 
            startIcon={<ArrowBack />} 
            sx={{ 
              color: 'text.secondary',
              textTransform: 'none',
              fontSize: '1rem',
              fontWeight: 600,
              transition: 'all 0.3s ease',
              '&:hover': { 
                color: 'primary.main',
                bgcolor: 'transparent',
                transform: 'translateX(-4px)'
              } 
            }}
          >
            Back to Products
          </Button>
        </Box>

        {error && (
          <Alert 
            severity="error" 
            sx={{ 
              mb: 4, 
              borderRadius: 3,
              backdropFilter: 'blur(10px)',
              background: 'rgba(239, 68, 68, 0.05)',
              border: '1px solid rgba(239, 68, 68, 0.2)'
            }}
          >
            {error}
          </Alert>
        )}

        {/* Main Product Section */}
        <Grid container spacing={4} sx={{ mb: 8 }}>
          {/* Left Column: Images */}
          <Grid size={{ xs: 12, md: 5 }}>
            <Box sx={{ position: 'sticky', top: 100 }}>
              <Paper 
                elevation={0} 
                sx={{ 
                  p: 4, 
                  background: 'linear-gradient(135deg, #f5f7fa 0%, #ffffff 100%)',
                  borderRadius: 4, 
                  border: '1px solid',
                  borderColor: 'rgba(0, 0, 0, 0.06)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  overflow: 'hidden',
                  height: '450px',
                  position: 'relative',
                  transition: 'all 0.4s ease',
                  '&:hover': {
                    boxShadow: '0 20px 40px -12px rgba(102, 126, 234, 0.15)',
                    '& .product-main-image': {
                      transform: 'scale(1.05)',
                    }
                  }
                }}
              >
                <Box
                  className="product-main-image"
                  component="img"
                  src={product.thumbnail}
                  alt={product.title}
                  sx={{ 
                    width: '100%', 
                    height: '100%', 
                    objectFit: 'contain',
                    mixBlendMode: 'multiply',
                    transition: 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                  }}
                />
                {/* Gradient Overlay */}
                <Box
                  sx={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(to bottom, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.02) 100%)',
                    pointerEvents: 'none'
                  }}
                />
              </Paper>
            </Box>
          </Grid>

          {/* Center Column: Product Info */}
          <Grid size={{ xs: 12, md: 4 }}>
            <Box>
              <Chip
                label={product.brand}
                size="small"
                sx={{
                  mb: 2,
                  background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%)',
                  color: '#667eea',
                  fontWeight: 700,
                  fontSize: '0.75rem',
                  textTransform: 'uppercase',
                  letterSpacing: '1px',
                  height: 28,
                  borderRadius: 2,
                  border: '1px solid rgba(102, 126, 234, 0.2)',
                }}
              />
              <Typography 
                variant="h3" 
                component="h1" 
                fontWeight={800} 
                sx={{ 
                  mb: 2, 
                  lineHeight: 1.2,
                  color: '#1e293b',
                  letterSpacing: '-0.02em'
                }}
              >
                {product.title}
              </Typography>
              <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 4 }}>
                <Rating 
                  value={product.rating} 
                  readOnly 
                  precision={0.5} 
                  size="small"
                  sx={{ 
                    color: '#fbbf24',
                    '& .MuiRating-iconEmpty': {
                      color: '#e5e7eb'
                    }
                  }}
                />
                <Typography variant="body2" fontWeight={700} color="text.secondary">
                  {product.rating.toFixed(1)} <Typography component="span" color="text.disabled">({product.reviews?.length || 0} reviews)</Typography>
                </Typography>
              </Stack>

              <Typography 
                variant="body1" 
                paragraph 
                sx={{ 
                  fontSize: '1.05rem', 
                  color: '#64748b', 
                  lineHeight: 1.8
                }}
              >
                {product.description}
              </Typography>
            </Box>
          </Grid>

          {/* Right Column: Buy Box */}
          <Grid size={{ xs: 12, md: 3 }}>
            <Paper 
              elevation={0}
              sx={{ 
                p: 4, 
                borderRadius: 4, 
                position: 'sticky', 
                top: 100,
                background: 'rgba(255, 255, 255, 0.95)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(0, 0, 0, 0.06)',
                boxShadow: '0 8px 32px rgba(102, 126, 234, 0.12)',
                transition: 'all 0.3s ease',
                '&:hover': {
                  boxShadow: '0 12px 40px rgba(102, 126, 234, 0.18)',
                }
              }}
            >
              <Box sx={{ mb: 4 }}>
                <Stack direction="row" alignItems="baseline" spacing={1.5} sx={{ mb: 1 }}>
                  <Typography 
                    variant="h3" 
                    fontWeight={900} 
                    sx={{
                      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                      backgroundClip: 'text',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                    }}
                  >
                    ${product.price}
                  </Typography>
                  {product.discountPercentage > 0 && (
                    <Typography 
                      variant="h6" 
                      sx={{ 
                        textDecoration: 'line-through', 
                        color: '#94a3b8', 
                        fontWeight: 600 
                      }}
                    >
                      ${(product.price / (1 - product.discountPercentage / 100)).toFixed(2)}
                    </Typography>
                  )}
                </Stack>
                {product.discountPercentage > 0 && (
                  <Chip 
                    label={`Save ${Math.round(product.discountPercentage)}%`} 
                    size="small"
                    sx={{
                      background: 'linear-gradient(135deg, #f43f5e 0%, #e11d48 100%)',
                      color: 'white',
                      fontWeight: 800,
                      borderRadius: 2,
                      height: 28,
                      boxShadow: '0 4px 12px rgba(244, 63, 94, 0.3)',
                    }}
                  />
                )}
              </Box>

              <Paper
                elevation={0}
                sx={{
                  mb: 4,
                  p: 2.5,
                  borderRadius: 3,
                  background: product.stock > 5 
                    ? 'linear-gradient(135deg, rgba(34, 197, 94, 0.05) 0%, rgba(22, 163, 74, 0.05) 100%)'
                    : 'linear-gradient(135deg, rgba(251, 146, 60, 0.05) 0%, rgba(249, 115, 22, 0.05) 100%)',
                  border: '1px solid',
                  borderColor: product.stock > 5 ? 'rgba(34, 197, 94, 0.2)' : 'rgba(251, 146, 60, 0.2)',
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1 }}>
                  <Box sx={{ 
                    width: 12, 
                    height: 12, 
                    borderRadius: '50%', 
                    bgcolor: product.stock > 5 ? '#22c55e' : '#fb923c',
                    boxShadow: product.stock > 5 
                      ? '0 0 0 3px rgba(34, 197, 94, 0.2)'
                      : '0 0 0 3px rgba(251, 146, 60, 0.2)',
                  }} />
                  <Typography 
                    variant="body2" 
                    fontWeight={800} 
                    color={product.stock > 5 ? 'success.main' : 'warning.main'}
                  >
                    {product.stock > 5 ? 'In Stock' : 'Low Stock'}
                  </Typography>
                </Box>
                <Typography variant="caption" color="text.secondary" fontWeight={600}>
                  <LocalShipping sx={{ fontSize: 14, mr: 0.5, verticalAlign: 'middle' }} />
                  Ships from Turkey
                </Typography>
              </Paper>

              <Stack spacing={2}>
                <Button 
                  variant="contained" 
                  size="large" 
                  startIcon={<ShoppingCart />} 
                  onClick={handleAddToCart}
                  fullWidth
                  sx={{ 
                    fontWeight: 800, 
                    py: 1.8,
                    fontSize: '1rem',
                    borderRadius: 3,
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    boxShadow: '0 8px 20px rgba(102, 126, 234, 0.4)',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-2px)',
                      boxShadow: '0 12px 28px rgba(102, 126, 234, 0.5)',
                      background: 'linear-gradient(135deg, #5a67d8 0%, #6b46c1 100%)',
                    }
                  }}
                >
                  Add to Cart
                </Button>
                <Button 
                  variant="outlined" 
                  size="large"
                  onClick={handleAddToFavorite}
                  startIcon={isFavorite ? <Favorite /> : <FavoriteBorder />}
                  fullWidth
                  sx={{ 
                    fontWeight: 700,
                    py: 1.8,
                    fontSize: '1rem',
                    borderRadius: 3,
                    borderWidth: 2,
                    borderColor: isFavorite ? '#f43f5e' : 'rgba(0, 0, 0, 0.12)',
                    color: isFavorite ? '#f43f5e' : 'text.primary',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      borderWidth: 2,
                      borderColor: '#f43f5e',
                      color: '#f43f5e',
                      bgcolor: 'rgba(244, 63, 94, 0.05)',
                      transform: 'translateY(-2px)',
                    }
                  }}
                >
                  {isFavorite ? 'Favorited' : 'Add to Favorites'}
                </Button>
              </Stack>
            </Paper>
          </Grid>
        </Grid>

        {/* Bottom Sections: Specifications and Reviews */}
        <Grid container spacing={4}>
          {/* Specifications */}
          <Grid size={{ xs: 12, md: 6 }}>
            <Paper
              elevation={0}
              sx={{
                p: 4,
                borderRadius: 4,
                background: 'rgba(255, 255, 255, 0.95)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(0, 0, 0, 0.06)',
                boxShadow: '0 8px 32px rgba(102, 126, 234, 0.08)',
              }}
            >
              <Typography variant="h5" fontWeight={800} sx={{ mb: 3, color: '#1e293b' }}>
                Specifications
              </Typography>
              <Paper
                elevation={0}
                sx={{
                  borderRadius: 3,
                  overflow: 'hidden',
                  border: '1px solid',
                  borderColor: 'rgba(0, 0, 0, 0.06)',
                  background: 'rgba(255, 255, 255, 0.6)',
                  backdropFilter: 'blur(10px)',
                }}
              >
                <Table>
                  <TableBody>
                    <TableRow sx={{ '&:hover': { bgcolor: 'rgba(102, 126, 234, 0.03)' } }}>
                      <TableCell 
                        component="th" 
                        scope="row" 
                        sx={{ 
                          width: '40%', 
                          fontWeight: 700, 
                          color: '#64748b',
                          borderBottom: '1px solid rgba(0, 0, 0, 0.06)',
                          py: 2.5
                        }}
                      >
                        Brand
                      </TableCell>
                      <TableCell sx={{ fontWeight: 700, borderBottom: '1px solid rgba(0, 0, 0, 0.06)', py: 2.5 }}>
                        {product.brand}
                      </TableCell>
                    </TableRow>
                    <TableRow sx={{ '&:hover': { bgcolor: 'rgba(102, 126, 234, 0.03)' } }}>
                      <TableCell 
                        component="th" 
                        scope="row" 
                        sx={{ 
                          fontWeight: 700, 
                          color: '#64748b',
                          borderBottom: 'none',
                          py: 2.5
                        }}
                      >
                        Category
                      </TableCell>
                      <TableCell sx={{ textTransform: 'capitalize', borderBottom: 'none', py: 2.5 }}>
                        {product.category.replace(/-/g, ' ')}
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </Paper>
            </Paper>
          </Grid>

          {/* Reviews */}
          <Grid size={{ xs: 12, md: 6 }}>
            <Paper
              elevation={0}
              sx={{
                p: 4,
                borderRadius: 4,
                background: 'rgba(255, 255, 255, 0.95)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(0, 0, 0, 0.06)',
                boxShadow: '0 8px 32px rgba(102, 126, 234, 0.08)',
              }}
            >
              <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 3 }}>
                <Typography variant="h5" fontWeight={800} sx={{ color: '#1e293b' }}>
                  Reviews
                </Typography>
                <Button 
                  startIcon={loading ? <CircularProgress size={16} /> : <Refresh />} 
                  onClick={handleRefresh}
                  disabled={loading}
                  size="small"
                  sx={{ 
                    textTransform: 'none',
                    fontWeight: 600,
                    borderRadius: 2,
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-2px)',
                    }
                  }}
                >
                  Refresh
                </Button>
              </Stack>
              
              <Stack spacing={2}>
                {product.reviews && product.reviews.length > 0 ? (
                  product.reviews.map((review, index) => (
                    <Paper 
                      key={index} 
                      elevation={0} 
                      sx={{ 
                        p: 3, 
                        background: 'rgba(255, 255, 255, 0.6)',
                        backdropFilter: 'blur(10px)',
                        borderRadius: 3,
                        border: '1px solid rgba(0, 0, 0, 0.06)',
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          boxShadow: '0 8px 20px rgba(0, 0, 0, 0.06)',
                          transform: 'translateY(-2px)',
                        }
                      }}
                    >
                      <Stack direction="row" alignItems="center" spacing={1.5} sx={{ mb: 1.5 }}>
                        <Avatar 
                          sx={{ 
                            width: 36, 
                            height: 36, 
                            fontSize: '0.9rem', 
                            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                            fontWeight: 700
                          }}
                        >
                          {review.reviewerName[0]}
                        </Avatar>
                        <Box sx={{ flex: 1 }}>
                          <Typography variant="subtitle2" fontWeight={700}>
                            {review.reviewerName}
                          </Typography>
                        </Box>
                        <Rating value={review.rating} size="small" readOnly sx={{ color: '#fbbf24' }} />
                      </Stack>
                      <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.7 }}>
                        "{review.comment}"
                      </Typography>
                    </Paper>
                  ))
                ) : (
                  <Paper
                    elevation={0}
                    sx={{
                      py: 4,
                      textAlign: 'center',
                      background: 'rgba(255, 255, 255, 0.6)',
                      backdropFilter: 'blur(10px)',
                      borderRadius: 3,
                      border: '1px solid rgba(0, 0, 0, 0.06)',
                    }}
                  >
                    <Typography color="text.secondary" fontWeight={600}>
                      No reviews yet
                    </Typography>
                  </Paper>
                )}
              </Stack>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
