'use client';

import { useState } from 'react';
import {
  Container, Grid, Typography, Box, Rating, Chip, Button,
  Paper, Divider, CircularProgress, Alert, Stack, Avatar
} from '@mui/material';
import { Product } from '@/types';
import { fetchProductById } from '@/services/productService';
import { Refresh, ArrowBack, ShoppingCart, Verified, Favorite, FavoriteBorder } from '@mui/icons-material';
import Link from 'next/link';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { toggleFavorite } from '@/store/slices/favoritesSlice';

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

  return (
    <Container maxWidth="xl" sx={{ py: 6 }}>
      <Button 
        component={Link} 
        href="/products" 
        startIcon={<ArrowBack />} 
        sx={{ 
          mb: 4, 
          color: 'text.secondary',
          transition: 'all 0.3s ease',
          '&:hover': { 
            color: 'primary.main', 
            transform: 'translateX(-4px)',
            bgcolor: 'rgba(67, 56, 202, 0.05)'
          } 
        }}
      >
        Back to Products
      </Button>

      {error && (
        <Alert 
          severity="error" 
          sx={{ 
            mb: 4,
            borderRadius: 2,
            animation: 'slideIn 0.3s ease-out'
          }}
        >
          {error}
        </Alert>
      )}

      <Grid container spacing={6}>
        {/* Left Column: Images */}
        <Grid item xs={12} md={5}>
            <Paper elevation={0} sx={{ 
                p: 4, 
                bgcolor: 'linear-gradient(135deg, rgba(67, 56, 202, 0.05) 0%, rgba(168, 85, 247, 0.05) 100%)',
                borderRadius: 3, 
                border: '1px solid', 
                borderColor: 'rgba(0, 0, 0, 0.06)',
                mb: 2,
                position: 'sticky',
                top: 100,
                backdropFilter: 'blur(8px)',
            }}>
                <Box
                    component="img"
                    src={product.thumbnail}
                    alt={product.title}
                    sx={{ 
                      width: '100%', 
                      height: 'auto', 
                      maxHeight: '500px', 
                      objectFit: 'contain',
                      transition: 'transform 0.4s ease',
                      '&:hover': {
                        transform: 'scale(1.05)'
                      }
                    }}
                />
            </Paper>
        </Grid>

        {/* Right Column: Info */}
        <Grid item xs={12} md={7}>
             <Box>
                <Stack direction="row" spacing={1} sx={{ mb: 3, flexWrap: 'wrap' }}>
                    <Chip 
                      label={product.brand} 
                      color="primary" 
                      variant="filled" 
                      size="small" 
                      sx={{
                        background: 'linear-gradient(135deg, #4338ca 0%, #7c3aed 100%)',
                        fontWeight: 600,
                        fontSize: '0.8rem'
                      }}
                    />
                    <Chip 
                      label={product.category.replace(/-/g, ' ')} 
                      variant="outlined" 
                      size="small"
                      sx={{
                        borderColor: 'rgba(67, 56, 202, 0.3)',
                        color: '#4338ca',
                        fontWeight: 600
                      }}
                    />
                    {product.discountPercentage > 0 && (
                      <Chip 
                        label={`Save ${Math.round(product.discountPercentage)}%`} 
                        color="error" 
                        size="small"
                        sx={{
                          fontWeight: 700,
                          background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
                          color: 'white'
                        }}
                      />
                    )}
                </Stack>

                <Typography 
                  variant="h2" 
                  component="h1" 
                  fontWeight={800} 
                  gutterBottom 
                  sx={{ 
                    lineHeight: 1.2,
                    mb: 3,
                    color: 'text.primary'
                  }}
                >
                  {product.title}
                </Typography>

                <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 4 }}>
                   <Rating value={product.rating} readOnly precision={0.5} size="large" sx={{ color: '#fbbf24' }} />
                   <Typography variant="body1" fontWeight={700} color="text.secondary">
                       {product.rating.toFixed(1)} • {product.reviews?.length || 0} Reviews
                   </Typography>
                </Stack>

                <Box sx={{ mb: 4, p: 3, bgcolor: 'rgba(67, 56, 202, 0.05)', borderRadius: 2, border: '1px solid rgba(67, 56, 202, 0.1)' }}>
                  <Typography variant="h4" color="text.secondary" sx={{ fontSize: '0.9rem', fontWeight: 600, mb: 1 }}>
                    Price
                  </Typography>
                  <Stack direction="row" alignItems="center" spacing={2}>
                    <Typography 
                      variant="h3" 
                      color="primary.main" 
                      fontWeight={900}
                      sx={{
                        background: 'linear-gradient(135deg, #4338ca 0%, #7c3aed 100%)',
                        backgroundClip: 'text',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent'
                      }}
                    >
                      ${product.price}
                    </Typography>
                    {product.discountPercentage > 0 && (
                       <Typography 
                         component="span" 
                         variant="h5" 
                         sx={{ 
                           textDecoration: 'line-through', 
                           color: 'text.disabled',
                           fontWeight: 600
                         }}
                       >
                         ${(product.price / (1 - product.discountPercentage / 100)).toFixed(2)}
                       </Typography>
                    )}
                  </Stack>
                </Box>

                <Typography 
                  variant="body1" 
                  paragraph 
                  sx={{ 
                    fontSize: '1.05rem', 
                    color: 'text.secondary', 
                    mb: 4, 
                    lineHeight: 1.8,
                    letterSpacing: '0.3px'
                  }}
                >
                  {product.description}
                </Typography>

                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ mb: 4 }}>
                    <Button 
                      variant="contained" 
                      size="large" 
                      startIcon={<ShoppingCart />} 
                      sx={{ 
                        px: 4, 
                        py: 1.8,
                        flex: 1,
                        background: 'linear-gradient(135deg, #4338ca 0%, #7c3aed 100%)',
                        fontWeight: 700,
                        fontSize: '1rem',
                        boxShadow: '0 4px 15px rgba(67, 56, 202, 0.3)',
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          transform: 'translateY(-2px)',
                          boxShadow: '0 8px 25px rgba(67, 56, 202, 0.4)'
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
                      sx={{ 
                        px: 3,
                        py: 1.8,
                        borderColor: isFavorite ? 'error.main' : 'rgba(67, 56, 202, 0.3)',
                        color: isFavorite ? 'error.main' : 'text.secondary',
                        fontWeight: 700,
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          borderColor: 'error.main',
                          color: 'error.main',
                          transform: 'translateY(-2px)',
                          backgroundColor: 'rgba(239, 68, 68, 0.05)'
                        }
                      }}
                    >
                        {isFavorite ? 'Favorited' : 'Add to Favorites'}
                    </Button>
                </Stack>

                <Divider sx={{ mb: 4, opacity: 0.5 }} />

                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
                    <Typography variant="h5" fontWeight={800} color="text.primary">Customer Reviews</Typography>
                    <Button 
                        startIcon={loading ? <CircularProgress size={20} color="inherit" /> : <Refresh />} 
                        onClick={handleRefresh}
                        disabled={loading}
                        color="inherit"
                        sx={{
                          fontWeight: 700,
                          transition: 'all 0.3s ease',
                          '&:hover': {
                            transform: 'rotate(180deg)',
                            backgroundColor: 'rgba(67, 56, 202, 0.05)'
                          }
                        }}
                    >
                        Refresh
                    </Button>
                </Box>

                <Stack spacing={3}>
                    {product.reviews && product.reviews.length > 0 ? (
                      product.reviews.map((review, index) => (
                        <Paper 
                          key={index} 
                          elevation={0} 
                          sx={{ 
                            p: 3, 
                            bgcolor: 'rgba(67, 56, 202, 0.03)',
                            borderRadius: 2,
                            border: '1px solid rgba(67, 56, 202, 0.1)',
                            transition: 'all 0.3s ease',
                            '&:hover': {
                              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
                              borderColor: 'rgba(67, 56, 202, 0.2)'
                            }
                          }}
                        >
                            <Stack direction="row" justifyContent="space-between" alignItems="flex-start" sx={{ mb: 2 }}>
                                <Stack direction="row" spacing={1.5} alignItems="center">
                                    <Avatar 
                                      sx={{ 
                                        bgcolor: 'linear-gradient(135deg, #4338ca 0%, #7c3aed 100%)', 
                                        color: 'white', 
                                        fontWeight: 'bold',
                                        fontSize: '1.1rem'
                                      }}
                                    >
                                        {review.reviewerName[0]}
                                    </Avatar>
                                    <Box>
                                        <Typography fontWeight={700} variant="subtitle2" color="text.primary">
                                          {review.reviewerName}
                                        </Typography>
                                        <Stack direction="row" alignItems="center" spacing={0.5}>
                                            <Verified fontSize="inherit" color="success" sx={{ fontSize: 14 }} />
                                            <Typography variant="caption" color="text.secondary" fontWeight={600}>Verified Buyer</Typography>
                                        </Stack>
                                    </Box>
                                </Stack>
                                <Rating value={review.rating} readOnly size="small" sx={{ color: '#fbbf24' }} />
                            </Stack>
                            <Typography variant="body2" sx={{ lineHeight: 1.7, color: 'text.secondary', mb: 2 }}>
                              {review.comment}
                            </Typography>
                            <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600 }}>
                                {new Date(review.date).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}
                            </Typography>
                        </Paper>
                      ))
                    ) : (
                      <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center', py: 4 }}>
                        No reviews yet. Be the first to review this product!
                      </Typography>
                    )}
                </Stack>
             </Box>
        </Grid>
      </Grid>
    </Container>
  );
}
