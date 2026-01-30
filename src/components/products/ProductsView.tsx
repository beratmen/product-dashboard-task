'use client';

import React, { useEffect, useCallback } from 'react';
import {
  Container, TextField, MenuItem, Box, CircularProgress, Stack,
  InputAdornment, Typography, Button, Chip, Rating, IconButton, Pagination, Paper
} from '@mui/material';
import { Search as SearchIcon, ShoppingCart, Favorite, FavoriteBorder } from '@mui/icons-material';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { fetchProductsAsync, setProducts } from '@/store/slices/productSlice';
import { setSearchQuery, setPage, setSortBy, setCategory } from '@/store/slices/uiSlice';
import { toggleFavorite, loadFavorites } from '@/store/slices/favoritesSlice';
import { addToCart, loadCart } from '@/store/slices/cartSlice';
import { ProductResponse } from '@/types';
import { debounce } from '@/utils/debounce';
import Link from 'next/link';
import { useSearchParams, useRouter } from 'next/navigation';
import { fetchCategories } from '@/services/productService';

interface ProductsViewProps {
  initialData: ProductResponse;
}

export default function ProductsView({ initialData }: ProductsViewProps) {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const searchParams = useSearchParams();
  const { items, total, loading, error } = useAppSelector((state) => state.products);
  const { searchQuery, currentPage, itemsPerPage, sortBy, selectedCategory } = useAppSelector((state) => state.ui);
  const { favoriteIds, isHydrated } = useAppSelector((state) => state.favorites);
  const { isHydrated: isCartHydrated } = useAppSelector((state) => state.cart);
  const [categories, setCategories] = React.useState<string[]>([]);

  useEffect(() => {
    fetchCategories().then(setCategories).catch(console.error);
  }, []);

  useEffect(() => {
    const categoryParam = searchParams.get('category');
    if (categoryParam && categoryParam !== selectedCategory) {
      dispatch(setCategory(categoryParam));
    }
  }, [searchParams, dispatch, selectedCategory]);

  useEffect(() => {
    if (!isHydrated) {
      dispatch(loadFavorites());
    }
  }, [dispatch, isHydrated]);

  useEffect(() => {
    if (!isCartHydrated) {
      dispatch(loadCart());
    }
  }, [dispatch, isCartHydrated]);

  useEffect(() => {
    if (initialData && items.length === 0) {
      dispatch(setProducts(initialData));
    }
  }, [dispatch, initialData, items.length]);

  const debouncedSearch = useCallback(
    debounce((q: string) => {
      dispatch(setSearchQuery(q));
    }, 500),
    [dispatch]
  );

  useEffect(() => {
    const skip = (currentPage - 1) * itemsPerPage;
    dispatch(fetchProductsAsync({ limit: itemsPerPage, skip, q: searchQuery, category: selectedCategory }));
  }, [dispatch, currentPage, searchQuery, itemsPerPage, selectedCategory]);

  const sortedItems = [...items].sort((a, b) => {
    if (sortBy === 'price') return a.price - b.price;
    if (sortBy === 'rating') return b.rating - a.rating;
    return 0;
  });

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    debouncedSearch(e.target.value);
  };

  const handlePageChange = (_: React.ChangeEvent<unknown>, page: number) => {
    dispatch(setPage(page));
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSortBy(e.target.value as 'price' | 'rating' | 'none'));
  };

  const handleFavoriteClick = (e: React.MouseEvent, productId: number) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(toggleFavorite(productId));
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newCategory = e.target.value || null;
    dispatch(setCategory(newCategory));

    const params = new URLSearchParams(searchParams.toString());
    if (newCategory) {
      params.set('category', newCategory);
    } else {
      params.delete('category');
    }
    router.push(`?${params.toString()}`, { scroll: false });
  };

  const handleAddToCart = (e: React.MouseEvent, product: typeof items[0]) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(addToCart(product));
  };

  return (
    <Box sx={{ 
      minHeight: '100vh',
      background: 'linear-gradient(to bottom, #f8fafc 0%, #ffffff 100%)',
      pb: 8
    }}>
      <Container maxWidth="lg" sx={{ pt: 6 }}>
        {/* Header with Glassmorphism */}
        <Paper 
          elevation={0}
          sx={{ 
            mb: 6,
            p: 4,
            background: 'rgba(255, 255, 255, 0.8)',
            backdropFilter: 'blur(10px)',
            borderRadius: 4,
            border: '1px solid rgba(255, 255, 255, 0.3)',
            boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.07)'
          }}
        >
          <Typography
            variant="h2"
            sx={{
              fontWeight: 900,
              mb: 1.5,
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
              letterSpacing: '-0.02em'
            }}
          >
            Discover Products
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ fontSize: '1.1rem', fontWeight: 500 }}>
            {total} premium products available
          </Typography>
        </Paper>

        {/* Filters - Floating Panel */}
        <Paper
          elevation={0}
          sx={{
            mb: 5,
            p: 3,
            background: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(10px)',
            borderRadius: 3,
            border: '1px solid',
            borderColor: 'divider',
            boxShadow: '0 4px 20px 0 rgba(0, 0, 0, 0.05)'
          }}
        >
          <Stack 
            direction={{ xs: 'column', md: 'row' }} 
            spacing={2}
          >
            <TextField
              placeholder="Search products..."
              variant="outlined"
              onChange={handleSearch}
              size="medium"
              InputProps={{
                startAdornment: <InputAdornment position="start"><SearchIcon /></InputAdornment>,
              }}
              sx={{ 
                flex: { xs: '0 0 100%', md: 1 },
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
                  },
                  '&.Mui-focused': {
                    boxShadow: '0 4px 20px rgba(102, 126, 234, 0.25)',
                  }
                }
              }}
            />
            <TextField
              select
              label="Category"
              value={selectedCategory || ''}
              onChange={handleCategoryChange}
              size="medium"
              sx={{ 
                minWidth: { xs: '100%', sm: 180 },
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2
                }
              }}
            >
              <MenuItem value="">All Categories</MenuItem>
              {categories.map((cat) => {
                const categoryStr = typeof cat === 'string' ? cat : String(cat);
                return (
                  <MenuItem key={categoryStr} value={categoryStr}>
                    {categoryStr.charAt(0).toUpperCase() + categoryStr.slice(1).replace(/-/g, ' ')}
                  </MenuItem>
                );
              })}
            </TextField>
            <TextField
              select
              label="Sort"
              value={sortBy}
              onChange={handleSortChange}
              size="medium"
              sx={{ 
                minWidth: { xs: '100%', sm: 180 },
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2
                }
              }}
            >
              <MenuItem value="none">Default</MenuItem>
              <MenuItem value="price">Price: Low to High</MenuItem>
              <MenuItem value="rating">Rating: High to Low</MenuItem>
            </TextField>
          </Stack>
        </Paper>

        {/* Error */}
        {error && (
          <Paper 
            elevation={0}
            sx={{ 
              bgcolor: 'rgba(239, 68, 68, 0.05)', 
              border: '1px solid rgba(239, 68, 68, 0.2)', 
              borderRadius: 3, 
              p: 3, 
              mb: 4 
            }}
          >
            <Typography color="error" sx={{ fontWeight: 600 }}>⚠️ {error}</Typography>
          </Paper>
        )}

        {/* Loading */}
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 12 }}>
            <CircularProgress size={48} thickness={4} />
          </Box>
        ) : sortedItems.length === 0 ? (
          <Paper
            elevation={0}
            sx={{
              textAlign: 'center',
              py: 12,
              borderRadius: 4,
              background: 'rgba(255, 255, 255, 0.6)',
              backdropFilter: 'blur(10px)',
              border: '1px solid',
              borderColor: 'divider'
            }}
          >
            <Typography variant="h5" color="text.secondary" sx={{ mb: 2, fontWeight: 700 }}>
              No products found
            </Typography>
            <Typography color="text.secondary">Try adjusting your search or filters</Typography>
          </Paper>
        ) : (
          <>
            {/* Products Grid */}
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: {
                  xs: '1fr',
                  sm: 'repeat(2, 1fr)',
                  md: 'repeat(3, 1fr)',
                  lg: 'repeat(4, 1fr)',
                },
                gap: { xs: 2.5, sm: 3, md: 3.5 },
                mb: 6,
              }}
            >
              {sortedItems.map((product) => (
                <Link key={product.id} href={`/products/${product.id}`} style={{ textDecoration: 'none', width: '100%', display: 'block' }}>
                  <Paper
                    elevation={0}
                    sx={{
                      backgroundColor: '#fff',
                      borderRadius: 3,
                      overflow: 'hidden',
                      transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                      border: '1px solid',
                      borderColor: 'rgba(0, 0, 0, 0.06)',
                      display: 'flex',
                      flexDirection: 'column',
                      height: '100%',
                      width: '100%',
                      cursor: 'pointer',
                      position: 'relative',
                      '&:hover': {
                        transform: 'translateY(-12px) scale(1.02)',
                        boxShadow: '0 20px 40px -12px rgba(102, 126, 234, 0.25), 0 0 0 1px rgba(102, 126, 234, 0.1)',
                        borderColor: 'rgba(102, 126, 234, 0.3)',
                        '& .product-image': {
                          transform: 'scale(1.08)',
                        },
                        '& .add-to-cart-btn': {
                          opacity: 1,
                          transform: 'translateY(0)',
                        }
                      },
                    }}
                  >
                    {/* Image */}
                    <Box
                      sx={{
                        position: 'relative',
                        width: '100%',
                        height: 220,
                        background: 'linear-gradient(135deg, #f5f7fa 0%, #ffffff 100%)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        overflow: 'hidden',
                        flexShrink: 0,
                      }}
                    >
                      <Box
                        className="product-image"
                        component="img"
                        src={product.thumbnail}
                        alt={product.title}
                        sx={{
                          maxWidth: '80%',
                          maxHeight: '80%',
                          objectFit: 'contain',
                          transition: 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                          mixBlendMode: 'multiply',
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

                      {/* Discount Badge */}
                      {product.discountPercentage > 0 && (
                        <Chip
                          label={`-${Math.round(product.discountPercentage)}%`}
                          size="small"
                          sx={{
                            position: 'absolute',
                            top: 12,
                            right: 12,
                            background: 'linear-gradient(135deg, #f43f5e 0%, #e11d48 100%)',
                            color: 'white',
                            fontWeight: 800,
                            fontSize: '0.75rem',
                            height: 28,
                            borderRadius: 2,
                            boxShadow: '0 4px 12px rgba(244, 63, 94, 0.4)',
                          }}
                        />
                      )}

                      {/* Favorite Button */}
                      <IconButton
                        onClick={(e) => {
                          e.preventDefault();
                          handleFavoriteClick(e, product.id);
                        }}
                        sx={{
                          position: 'absolute',
                          top: 12,
                          left: 12,
                          backgroundColor: 'rgba(255, 255, 255, 0.95)',
                          backdropFilter: 'blur(8px)',
                          transition: 'all 0.3s ease',
                          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                          '&:hover': {
                            backgroundColor: '#fff',
                            transform: 'scale(1.1)',
                            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
                          },
                        }}
                        size="small"
                      >
                        {favoriteIds.includes(product.id) ? (
                          <Favorite sx={{ color: '#f43f5e', fontSize: 20 }} />
                        ) : (
                          <FavoriteBorder sx={{ fontSize: 20 }} />
                        )}
                      </IconButton>
                    </Box>

                    {/* Content */}
                    <Box sx={{ p: 3, display: 'flex', flexDirection: 'column', flex: 1 }}>
                      {/* Category */}
                      <Chip
                        label={product.category.replace(/-/g, ' ')}
                        size="small"
                        sx={{
                          alignSelf: 'flex-start',
                          mb: 1.5,
                          background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%)',
                          color: '#667eea',
                          fontWeight: 700,
                          fontSize: '0.7rem',
                          textTransform: 'uppercase',
                          letterSpacing: '0.5px',
                          height: 24,
                          borderRadius: 1.5,
                          border: '1px solid rgba(102, 126, 234, 0.2)',
                        }}
                      />

                      {/* Title */}
                      <Typography
                        sx={{
                          fontSize: '1rem',
                          fontWeight: 700,
                          mb: 2,
                          lineHeight: 1.3,
                          height: '2.6em',
                          overflow: 'hidden',
                          display: '-webkit-box',
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: 'vertical',
                          color: '#1e293b',
                        }}
                      >
                        {product.title}
                      </Typography>

                      {/* Rating */}
                      <Stack direction="row" alignItems="center" spacing={0.5} sx={{ mb: 'auto' }}>
                        <Rating 
                          value={product.rating} 
                          readOnly 
                          size="small" 
                          precision={0.5}
                          sx={{ 
                            color: '#fbbf24',
                            '& .MuiRating-iconEmpty': {
                              color: '#e5e7eb'
                            }
                          }} 
                        />
                        <Typography variant="caption" sx={{ fontWeight: 700, color: '#64748b', fontSize: '0.8rem' }}>
                          {product.rating.toFixed(1)}
                        </Typography>
                      </Stack>

                      {/* Price & Button */}
                      <Stack 
                        direction="row" 
                        justifyContent="space-between" 
                        alignItems="center" 
                        sx={{ mt: 3, pt: 3, borderTop: '1px solid rgba(0, 0, 0, 0.06)' }}
                      >
                        <Box>
                          {product.discountPercentage > 0 && (
                            <Typography
                              variant="caption"
                              sx={{
                                textDecoration: 'line-through',
                                color: '#94a3b8',
                                display: 'block',
                                mb: 0.25,
                                fontSize: '0.75rem',
                                fontWeight: 600,
                              }}
                            >
                              ${(product.price / (1 - product.discountPercentage / 100)).toFixed(2)}
                            </Typography>
                          )}
                          <Typography
                            sx={{
                              fontSize: '1.5rem',
                              fontWeight: 800,
                              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                              backgroundClip: 'text',
                              WebkitBackgroundClip: 'text',
                              WebkitTextFillColor: 'transparent',
                              lineHeight: 1,
                            }}
                          >
                            ${product.price}
                          </Typography>
                        </Box>
                        <IconButton
                          className="add-to-cart-btn"
                          onClick={(e) => handleAddToCart(e, product)}
                          sx={{
                            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                            color: 'white',
                            width: 42,
                            height: 42,
                            opacity: 0.8,
                            transform: 'translateY(4px)',
                            transition: 'all 0.3s ease',
                            boxShadow: '0 4px 12px rgba(102, 126, 234, 0.4)',
                            '&:hover': {
                              background: 'linear-gradient(135deg, #5a67d8 0%, #6b46c1 100%)',
                              transform: 'scale(1.1)',
                              boxShadow: '0 6px 20px rgba(102, 126, 234, 0.5)',
                            },
                          }}
                        >
                          <ShoppingCart sx={{ fontSize: 20 }} />
                        </IconButton>
                      </Stack>
                    </Box>
                  </Paper>
                </Link>
              ))}
            </Box>

            {/* Pagination */}
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 6 }}>
              <Paper
                elevation={0}
                sx={{
                  p: 2,
                  borderRadius: 3,
                  background: 'rgba(255, 255, 255, 0.8)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid',
                  borderColor: 'divider',
                  boxShadow: '0 4px 20px 0 rgba(0, 0, 0, 0.05)'
                }}
              >
                <Pagination
                  count={Math.ceil(total / itemsPerPage)}
                  page={currentPage}
                  onChange={handlePageChange}
                  color="primary"
                  size="large"
                  sx={{
                    '& .MuiPaginationItem-root': {
                      fontWeight: 600,
                      borderRadius: 2,
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        transform: 'translateY(-2px)',
                        boxShadow: '0 4px 12px rgba(102, 126, 234, 0.2)',
                      },
                      '&.Mui-selected': {
                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                        fontWeight: 700,
                        boxShadow: '0 4px 12px rgba(102, 126, 234, 0.3)',
                      }
                    }
                  }}
                />
              </Paper>
            </Box>
          </>
        )}
      </Container>
    </Box>
  );
}
