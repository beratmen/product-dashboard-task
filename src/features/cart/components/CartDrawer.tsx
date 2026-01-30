'use client';

import { useState } from 'react';
import {
  Drawer, Box, Typography, IconButton, Stack, Divider, Button, Avatar
} from '@mui/material';
import { Close, Delete, Add, Remove, ShoppingCartOutlined } from '@mui/icons-material';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { removeFromCart, updateQuantity } from '@/features/cart/store/cartSlice';
import Link from 'next/link';

interface CartDrawerProps {
  open: boolean;
  onClose: () => void;
}

export default function CartDrawer({ open, onClose }: CartDrawerProps) {
  const dispatch = useAppDispatch();
  const { items } = useAppSelector((state) => state.cart);

  const total = items.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);

  const handleRemove = (productId: number) => {
    dispatch(removeFromCart(productId));
  };

  const handleUpdateQuantity = (productId: number, newQuantity: number) => {
    dispatch(updateQuantity({ productId, quantity: newQuantity }));
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
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}>
            Shopping Cart
          </Typography>
          <IconButton onClick={onClose} size="small">
            <Close />
          </IconButton>
        </Stack>

        <Divider sx={{ mb: 3 }} />

        {/* Cart Items */}
        <Box sx={{ flex: 1, overflow: 'auto', mb: 3 }}>
          {items.length === 0 ? (
            <Box sx={{ textAlign: 'center', py: 8 }}>
              <ShoppingCartOutlined sx={{ fontSize: 80, color: 'text.disabled', mb: 2 }} />
              <Typography variant="h6" color="text.secondary" fontWeight={600}>
                Your cart is empty
              </Typography>
              <Typography variant="body2" color="text.disabled" sx={{ mt: 1 }}>
                Add some products to get started!
              </Typography>
            </Box>
          ) : (
            <Stack spacing={2}>
              {items.map((item) => (
                <Box
                  key={item.product.id}
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
                    <Link href={`/products/${item.product.id}`} style={{ textDecoration: 'none' }}>
                      <Box
                        component="img"
                        src={item.product.thumbnail}
                        alt={item.product.title}
                        sx={{
                          width: 70,
                          height: 70,
                          objectFit: 'contain',
                          borderRadius: 2,
                          background: '#f5f7fa',
                          cursor: 'pointer',
                        }}
                      />
                    </Link>
                    <Box sx={{ flex: 1 }}>
                      <Link href={`/products/${item.product.id}`} style={{ textDecoration: 'none' }}>
                        <Typography
                          variant="body2"
                          fontWeight={700}
                          sx={{
                            mb: 0.5,
                            color: '#1e293b',
                            cursor: 'pointer',
                            '&:hover': { color: '#667eea' },
                          }}
                        >
                          {item.product.title}
                        </Typography>
                      </Link>
                      <Typography variant="h6" fontWeight={900} sx={{
                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                        backgroundClip: 'text',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        mb: 1,
                      }}>
                        ${item.product.price}
                      </Typography>
                      <Stack direction="row" alignItems="center" spacing={1}>
                        <IconButton
                          size="small"
                          onClick={() => handleUpdateQuantity(item.product.id, item.quantity - 1)}
                          sx={{
                            width: 28,
                            height: 28,
                            bgcolor: 'rgba(102, 126, 234, 0.1)',
                            '&:hover': { bgcolor: 'rgba(102, 126, 234, 0.2)' },
                          }}
                        >
                          <Remove fontSize="small" />
                        </IconButton>
                        <Typography variant="body2" fontWeight={700} sx={{ minWidth: 30, textAlign: 'center' }}>
                          {item.quantity}
                        </Typography>
                        <IconButton
                          size="small"
                          onClick={() => handleUpdateQuantity(item.product.id, item.quantity + 1)}
                          sx={{
                            width: 28,
                            height: 28,
                            bgcolor: 'rgba(102, 126, 234, 0.1)',
                            '&:hover': { bgcolor: 'rgba(102, 126, 234, 0.2)' },
                          }}
                        >
                          <Add fontSize="small" />
                        </IconButton>
                        <IconButton
                          size="small"
                          onClick={() => handleRemove(item.product.id)}
                          sx={{
                            ml: 'auto',
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

        {/* Footer */}
        {items.length > 0 && (
          <>
            <Divider sx={{ mb: 2 }} />
            <Stack spacing={2}>
              <Stack direction="row" justifyContent="space-between" alignItems="center">
                <Typography variant="h6" fontWeight={700}>
                  Total:
                </Typography>
                <Typography variant="h4" fontWeight={900} sx={{
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}>
                  ${total.toFixed(2)}
                </Typography>
              </Stack>
              <Button
                variant="contained"
                size="large"
                fullWidth
                sx={{
                  fontWeight: 800,
                  py: 1.5,
                  fontSize: '1rem',
                  borderRadius: 3,
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  boxShadow: '0 8px 20px rgba(102, 126, 234, 0.4)',
                  '&:hover': {
                    transform: 'translateY(-2px)',
                    boxShadow: '0 12px 28px rgba(102, 126, 234, 0.5)',
                    background: 'linear-gradient(135deg, #5a67d8 0%, #6b46c1 100%)',
                  },
                }}
              >
                Checkout
              </Button>
            </Stack>
          </>
        )}
      </Box>
    </Drawer>
  );
}
