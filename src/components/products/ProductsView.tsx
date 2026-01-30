'use client';

import React, { useEffect, useCallback } from 'react';
import {
  Container, TextField, MenuItem, Box, CircularProgress, Stack,
  InputAdornment, Typography, Button, Chip, Rating, IconButton, Pagination
} from '@mui/material';
import { Search as SearchIcon, ShoppingCart, Favorite, FavoriteBorder } from '@mui/icons-material';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { fetchProductsAsync, setProducts } from '@/store/slices/productSlice';
import { setSearchQuery, setPage, setSortBy, setCategory } from '@/store/slices/uiSlice';
import { toggleFavorite, loadFavorites } from '@/store/slices/favoritesSlice';
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

  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      {/* Header */}
      <Box sx={{ mb: { xs: 4, md: 8 } }}>
        <Typography
          variant="h2"
          sx={{
            fontWeight: 900,
            mb: 2,
            background: 'linear-gradient(135deg, #4338ca 0%, #7c3aed 100%)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            fontSize: { xs: '1.8rem', sm: '2.2rem', md: '2.5rem' },
          }}
        >
          Shop Products
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 4, fontSize: { xs: '0.95rem', sm: '1.05rem' } }}>
          {total} products available
        </Typography>

        {/* Filters */}
        <Stack 
          direction={{ xs: 'column', md: 'row' }} 
          spacing={{ xs: 1.5, sm: 2 }}
          sx={{ flexWrap: 'wrap' }}
        >
          <TextField
            placeholder="Search products..."
            variant="outlined"
            onChange={handleSearch}
            size="small"
            InputProps={{
              startAdornment: <InputAdornment position="start"><SearchIcon /></InputAdornment>,
            }}
            sx={{ flex: { xs: '0 0 100%', md: 1 } }}
          />
          <TextField
            select
            label="Category"
            value={selectedCategory || ''}
            onChange={handleCategoryChange}
            size="small"
            sx={{ minWidth: { xs: '100%', sm: 150 } }}
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
            size="small"
            sx={{ minWidth: { xs: '100%', sm: 150 } }}
          >
            <MenuItem value="none">Default</MenuItem>
            <MenuItem value="price">Price: Low to High</MenuItem>
            <MenuItem value="rating">Rating: High to Low</MenuItem>
          </TextField>
        </Stack>
      </Box>

      {/* Error */}
      {error && (
        <Box sx={{ bgcolor: 'rgba(239, 68, 68, 0.1)', border: '1px solid #ef4444', borderRadius: 2, p: 2, mb: 4 }}>
          <Typography color="error" sx={{ fontWeight: 600 }}>⚠️ {error}</Typography>
        </Box>
      )}

      {/* Loading */}
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 12 }}>
          <CircularProgress />
        </Box>
      ) : sortedItems.length === 0 ? (
        <Box sx={{ textAlign: 'center', py: 12 }}>
          <Typography variant="h5" color="text.secondary" sx={{ mb: 2 }}>
            No products found
          </Typography>
          <Typography color="text.secondary">Try adjusting your search or filters</Typography>
        </Box>
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
              gap: { xs: 2, sm: 2.5, md: 3 },
              mb: 6,
            }}
          >
            {sortedItems.map((product) => (
              <Link key={product.id} href={`/products/${product.id}`} style={{ textDecoration: 'none', width: '100%', display: 'block' }}>
                <Box
                  sx={{
                    backgroundColor: '#fff',
                    borderRadius: 2,
                    overflow: 'hidden',
                    transition: 'all 0.3s ease',
                    border: '1px solid #e5e7eb',
                    display: 'flex',
                    flexDirection: 'column',
                    height: '100%',
                    width: '100%',
                    cursor: 'pointer',
                    '&:hover': {
                      transform: 'translateY(-8px)',
                      boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
                      borderColor: '#4338ca',
                    },
                  }}
                >
                  {/* Image */}
                  <Box
                    sx={{
                      position: 'relative',
                      width: '100%',
                      height: 200,
                      backgroundColor: '#f3f4f6',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      overflow: 'hidden',
                      flexShrink: 0,
                    }}
                  >
                    <img
                      src={product.thumbnail}
                      alt={product.title}
                      style={{
                        maxWidth: '85%',
                        maxHeight: '85%',
                        objectFit: 'contain',
                      }}
                    />

                    {/* Discount Badge */}
                    {product.discountPercentage > 0 && (
                      <Chip
                        label={`-${Math.round(product.discountPercentage)}%`}
                        size="small"
                        sx={{
                          position: 'absolute',
                          top: 10,
                          right: 10,
                          background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
                          color: 'white',
                          fontWeight: 700,
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
                        top: 10,
                        left: 10,
                        backgroundColor: 'rgba(255, 255, 255, 0.9)',
                        '&:hover': {
                          backgroundColor: '#fff',
                        },
                      }}
                      size="small"
                    >
                      {favoriteIds.includes(product.id) ? (
                        <Favorite sx={{ color: '#ef4444' }} fontSize="small" />
                      ) : (
                        <FavoriteBorder fontSize="small" />
                      )}
                    </IconButton>
                  </Box>

                  {/* Content */}
                  <Box sx={{ p: { xs: 2, sm: 2.5, md: 3 }, display: 'flex', flexDirection: 'column', flex: 1 }}>
                    {/* Category */}
                    <Typography
                      variant="caption"
                      sx={{
                        color: '#4338ca',
                        fontWeight: 700,
                        mb: 1,
                        textTransform: 'uppercase',
                        letterSpacing: '0.5px',
                        fontSize: { xs: '0.65rem', sm: '0.7rem' },
                      }}
                    >
                      {product.category.replace(/-/g, ' ')}
                    </Typography>

                    {/* Title */}
                    <Typography
                      sx={{
                        fontSize: { xs: '0.9rem', sm: '0.95rem' },
                        fontWeight: 700,
                        mb: 2,
                        height: '1.4em',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {product.title}
                    </Typography>

                    {/* Rating */}
                    <Stack direction="row" alignItems="center" spacing={0.5} sx={{ mb: 'auto' }}>
                      <Rating value={product.rating} readOnly size="small" sx={{ color: '#fbbf24' }} />
                      <Typography variant="caption" sx={{ fontWeight: 700, color: '#6b7280', fontSize: { xs: '0.7rem', sm: '0.75rem' } }}>
                        {product.rating.toFixed(1)}
                      </Typography>
                    </Stack>

                    {/* Price & Button */}
                    <Stack direction="row" justifyContent="space-between" alignItems="flex-end" sx={{ mt: 3, pt: 3, borderTop: '1px solid #e5e7eb', gap: 1 }}>
                      <Box>
                        {product.discountPercentage > 0 && (
                          <Typography
                            variant="caption"
                            sx={{
                              textDecoration: 'line-through',
                              color: '#9ca3af',
                              display: 'block',
                              mb: 0.5,
                              fontSize: { xs: '0.65rem', sm: '0.7rem' },
                            }}
                          >
                            ${(product.price / (1 - product.discountPercentage / 100)).toFixed(2)}
                          </Typography>
                        )}
                        <Typography
                          sx={{
                            fontSize: { xs: '0.95rem', sm: '1.1rem' },
                            fontWeight: 800,
                            color: '#4338ca',
                          }}
                        >
                          ${product.price}
                        </Typography>
                      </Box>
                      <Button
                        variant="contained"
                        size="small"
                        startIcon={<ShoppingCart sx={{ fontSize: { xs: 12, sm: 14 } }} />}
                        sx={{
                          background: 'linear-gradient(135deg, #4338ca 0%, #7c3aed 100%)',
                          textTransform: 'none',
                          fontWeight: 700,
                          padding: { xs: '4px 8px', sm: '6px 12px' },
                          fontSize: { xs: '0.75rem', sm: '0.85rem' },
                          flexShrink: 0,
                        }}
                      >
                        Add
                      </Button>
                    </Stack>
                  </Box>
                </Box>
              </Link>
            ))}
          </Box>

          {/* Pagination */}
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <Pagination
              count={Math.ceil(total / itemsPerPage)}
              page={currentPage}
              onChange={handlePageChange}
              color="primary"
              size="large"
            />
          </Box>
        </>
      )}
    </Container>
  );
}
