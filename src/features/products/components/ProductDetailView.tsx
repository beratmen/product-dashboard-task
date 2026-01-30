'use client';

import { useState, useEffect } from 'react';
import {
  Container, Grid, Typography, Box, Rating, Chip, Button,
  Paper, IconButton, CircularProgress, Alert, Stack, Avatar,
  Table, TableBody, TableCell, TableRow
} from '@mui/material';
import { Product, Review } from '@/features/products/types';
import { fetchProductById } from '@/features/products/services/productService';
import { 
  Refresh, ArrowBack, ShoppingCart, Favorite, FavoriteBorder,
  LocalShipping, Verified, Star
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
  const [selectedImage, setSelectedImage] = useState(product.images?.[0] || product.thumbnail);

  
  const isFavorite = favoriteIds.includes(product.id);

  // Update selected image if product changes
  useEffect(() => {
    setProduct(initialProduct);
    setSelectedImage(initialProduct.images?.[0] || initialProduct.thumbnail);
  }, [initialProduct]);

  const handleRefresh = async () => {
    setLoading(true);
    try {
      const refreshedProduct = await fetchProductById(String(product.id));
      setProduct(refreshedProduct);
      setSelectedImage(refreshedProduct.images?.[0] || refreshedProduct.thumbnail);
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
      bgcolor: '#f8fafc',
      pb: 8
    }}>
      {/* Navigation Bar */}
      <Box sx={{ bgcolor: 'white', borderBottom: '1px solid', borderColor: 'divider', py: 2 }}>
        <Container maxWidth="xl">
          <Button 
            component={Link} 
            href="/products" 
            startIcon={<ArrowBack />} 
            sx={{ 
              color: 'text.primary',
              textTransform: 'none',
              fontWeight: 600,
              '&:hover': { bgcolor: 'rgba(0,0,0,0.04)' }
            }}
          >
            Back to Products
          </Button>
        </Container>
      </Box>

      <Container maxWidth="xl" sx={{ pt: 4 }}>
        {error && (
          <Alert severity="error" sx={{ mb: 4, borderRadius: 2 }}>
            {error}
          </Alert>
        )}

        <Grid container spacing={6}>
          {/* Left Column: Image Gallery */}
          <Grid size={{ xs: 12, md: 7 }}>
            <Stack spacing={2}>
              {/* Main Image */}
              <Paper 
                elevation={0}
                sx={{ 
                  height: { xs: 300, sm: 400, md: 500 },
                  bgcolor: 'white',
                  borderRadius: 4,
                  overflow: 'hidden',
                  position: 'relative',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: '1px solid',
                  borderColor: 'divider'
                }}
              >
                <Box
                  component="img"
                  src={selectedImage}
                  alt={product.title}
                  sx={{ 
                    maxWidth: '100%', 
                    maxHeight: '100%', 
                    objectFit: 'contain',
                    p: 4
                  }}
                />
                
                {product.discountPercentage > 0 && (
                  <Chip
                    label={`-${Math.round(product.discountPercentage)}%`}
                    color="error"
                    sx={{
                      position: 'absolute',
                      top: 24,
                      left: 24,
                      fontWeight: 700,
                      height: 32,
                      px: 1
                    }}
                  />
                )}
              </Paper>

              {/* Thumbnails */}
              {product.images && product.images.length > 1 && (
                <Stack direction="row" spacing={2} sx={{ overflowX: 'auto', py: 1, px: 1 }}>
                  {product.images.map((img, index) => (
                    <Paper
                      key={index}
                      elevation={0}
                      onClick={() => setSelectedImage(img)}
                      sx={{
                        width: 80,
                        height: 80,
                        minWidth: 80,
                        borderRadius: 2,
                        cursor: 'pointer',
                        border: '2px solid',
                        borderColor: selectedImage === img ? 'primary.main' : 'transparent',
                        overflow: 'hidden',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        bgcolor: 'white',
                        transition: 'all 0.2s ease',
                        '&:hover': {
                          transform: 'translateY(-2px)',
                          boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                        }
                      }}
                    >
                      <Box
                        component="img"
                        src={img}
                        alt={`Thumbnail ${index + 1}`}
                        sx={{ width: '100%', height: '100%', objectFit: 'contain', p: 1 }}
                      />
                    </Paper>
                  ))}
                </Stack>
              )}
            </Stack>
          </Grid>

          {/* Right Column: Product Info */}
          <Grid size={{ xs: 12, md: 5 }}>
            <Box sx={{ position: { md: 'sticky' }, top: 100 }}>
              <Stack spacing={3}>
                <Box>
                  <Typography variant="overline" color="text.secondary" fontWeight={700} sx={{ letterSpacing: 1 }}>
                    {product.brand} • {product.category.toUpperCase()}
                  </Typography>
                  <Typography variant="h3" component="h1" fontWeight={800} sx={{ mt: 1, mb: 1, color: '#1a1a1a' }}>
                    {product.title}
                  </Typography>
                  
                  <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 2 }}>
                    <Rating value={product.rating} precision={0.5} readOnly size="small" />
                    <Typography variant="body2" fontWeight={600} color="text.secondary">
                      {product.rating.toFixed(1)} ({product.reviews?.length || 0} reviews)
                    </Typography>
                  </Stack>
                </Box>

                <Box sx={{ py: 2, borderTop: '1px solid', borderBottom: '1px solid', borderColor: 'divider' }}>
                  <Stack direction="row" alignItems="baseline" spacing={2}>
                    <Typography variant="h3" fontWeight={700} color="primary.main">
                      ${product.price}
                    </Typography>
                    {product.discountPercentage > 0 && (
                      <Typography variant="h5" color="text.secondary" sx={{ textDecoration: 'line-through' }}>
                        ${(product.price / (1 - product.discountPercentage / 100)).toFixed(2)}
                      </Typography>
                    )}
                  </Stack>
                  <Stack direction="row" alignItems="center" spacing={1} sx={{ mt: 1 }}>
                    <Box sx={{ 
                      width: 8, height: 8, borderRadius: '50%', 
                      bgcolor: product.stock > 5 ? 'success.main' : 'warning.main'
                    }} />
                    <Typography variant="body2" color={product.stock > 5 ? 'success.main' : 'warning.main'} fontWeight={600}>
                      {product.stock > 5 ? 'In Stock' : 'Low Stock'} • Ships from Turkey
                    </Typography>
                  </Stack>
                </Box>

                <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.8 }}>
                  {product.description}
                </Typography>

                <Stack direction="row" spacing={2} sx={{ mt: 4 }}>
                  <Button
                    variant="contained"
                    size="large"
                    fullWidth
                    startIcon={<ShoppingCart />}
                    onClick={handleAddToCart}
                    sx={{
                      py: 1.5,
                      borderRadius: 3,
                      fontSize: '1.1rem',
                      fontWeight: 700,
                      textTransform: 'none',
                      boxShadow: '0 8px 16px rgba(102, 126, 234, 0.24)',
                      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                      '&:hover': {
                         background: 'linear-gradient(135deg, #5a67d8 0%, #6b46c1 100%)',
                      }
                    }}
                  >
                    Add to Cart
                  </Button>
                  <IconButton
                    onClick={handleAddToFavorite}
                    sx={{
                      width: 56,
                      height: 56,
                      border: '2px solid',
                      borderColor: isFavorite ? 'error.main' : 'divider',
                      color: isFavorite ? 'error.main' : 'text.secondary',
                      borderRadius: 3,
                      '&:hover': {
                        bgcolor: 'error.lighter',
                        borderColor: 'error.main',
                        color: 'error.main'
                      }
                    }}
                  >
                    {isFavorite ? <Favorite /> : <FavoriteBorder />}
                  </IconButton>
                </Stack>

                {/* Specifications */}
                <Paper elevation={0} sx={{ mt: 4, borderRadius: 4, overflow: 'hidden', border: '1px solid', borderColor: 'divider' }}>
                  <Typography variant="subtitle1" fontWeight={700} sx={{ p: 2, bgcolor: '#f1f5f9', borderBottom: '1px solid', borderColor: 'divider' }}>
                    Specifications
                  </Typography>
                  <Table>
                    <TableBody>
                      <TableRow>
                        <TableCell sx={{ color: 'text.secondary', fontWeight: 600, borderBottom: '1px solid #f1f5f9' }}>Brand</TableCell>
                        <TableCell sx={{ fontWeight: 600, borderBottom: '1px solid #f1f5f9' }}>{product.brand}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell sx={{ color: 'text.secondary', fontWeight: 600, borderBottom: '1px solid #f1f5f9' }}>Category</TableCell>
                        <TableCell sx={{ textTransform: 'capitalize', fontWeight: 600, borderBottom: '1px solid #f1f5f9' }}>{product.category.replace('-', ' ')}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell sx={{ color: 'text.secondary', fontWeight: 600, borderBottom: 'none' }}>SKU</TableCell>
                        <TableCell sx={{ fontWeight: 600, borderBottom: 'none' }}>PRD-{product.id.toString().padStart(6, '0')}</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </Paper>
              </Stack>
            </Box>
          </Grid>
        </Grid>

        {/* Reviews Section */}
        <Box sx={{ mt: 8, mb: 4 }}>
          <Typography variant="h4" fontWeight={800} sx={{ mb: 4, color: '#1e293b' }}>
            Customer Reviews ({product.reviews?.length || 0})
          </Typography>
          
          <Grid container spacing={4}>
            {product.reviews && product.reviews.length > 0 ? (
              product.reviews.map((review, idx) => (
                <Grid size={{ xs: 12, md: 6 }} key={idx}>
                  <Paper 
                    elevation={0}
                    sx={{ 
                      p: 3, 
                      bgcolor: 'white', 
                      borderRadius: 3,
                      height: '100%',
                      border: '1px solid',
                      borderColor: 'divider',
                      transition: 'all 0.2s ease',
                      '&:hover': {
                         boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
                         borderColor: 'primary.main'
                      }
                    }}
                  >
                    <Stack direction="row" spacing={2} alignItems="flex-start">
                      <Avatar sx={{ width: 48, height: 48, bgcolor: 'primary.main', fontSize: '1.2rem', fontWeight: 700 }}>
                        {review.reviewerName[0]}
                      </Avatar>
                      <Box sx={{ flex: 1 }}>
                        <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 0.5 }}>
                          <Typography variant="subtitle1" fontWeight={700}>
                            {review.reviewerName}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            {new Date(review.date).toLocaleDateString()}
                          </Typography>
                        </Stack>
                        <Rating value={review.rating} size="small" readOnly sx={{ mb: 1.5 }} />
                        <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.6 }}>
                          "{review.comment}"
                        </Typography>
                      </Box>
                    </Stack>
                  </Paper>
                </Grid>
              ))
            ) : (
              <Grid size={{ xs: 12 }}>
                <Paper sx={{ p: 4, textAlign: 'center', bgcolor: 'white', borderRadius: 3 }}>
                  <Typography color="text.secondary">No reviews yet for this product.</Typography>
                </Paper>
              </Grid>
            )}
          </Grid>
        </Box>
      </Container>
    </Box>
  );
}
