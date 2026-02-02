'use client';

import { Box, Container, Paper, Typography, Avatar, Grid, Stack, Chip, Divider, List, ListItem, ListItemText, ListItemAvatar } from '@mui/material';
import { Person, Email, Phone, LocationOn, ShoppingBag, LocalShipping, CheckCircle } from '@mui/icons-material';
import { useRouter } from 'next/navigation';


// Mock Data
const USER = {
  name: 'Berat MEN',
  email: 'beratmen@example.com',
  phone: '+90 555 123 45 67',
  location: 'Istanbul, Turkey',
  joinDate: 'January 2024',
  role: 'Premium Member'
};

const ORDERS = [
  {
    id: '#ORD-2024-001',
    date: '2024-01-28',
    status: 'Delivered',
    total: 2499.00,
    items: 3
  },
  {
    id: '#ORD-2024-002',
    date: '2024-01-15',
    status: 'Processing',
    total: 129.50,
    items: 1
  },
  {
    id: '#ORD-2023-089',
    date: '2023-12-20',
    status: 'Delivered',
    total: 899.00,
    items: 2
  }
];

export default function ProfileView() {
  const router = useRouter();

  return (
    <Box sx={{ minHeight: '100vh', pb: 8, background: 'linear-gradient(to bottom, #f8fafc 0%, #ffffff 100%)' }}>
      <Container maxWidth="lg" sx={{ pt: 6 }}>
        {/* Header Section */}
        <Paper
          elevation={0}
          sx={{
            p: 4,
            mb: 4,
            borderRadius: 4,
            background: 'linear-gradient(135deg, #4338ca 0%, #7c3aed 100%)',
            color: 'white',
            position: 'relative',
            overflow: 'hidden',
            boxShadow: '0 20px 40px -12px rgba(67, 56, 202, 0.4)'
          }}
        >
          {/* Decorative Circles */}
          <Box sx={{ position: 'absolute', top: -100, right: -100, width: 300, height: 300, borderRadius: '50%', background: 'rgba(255,255,255,0.1)' }} />
          <Box sx={{ position: 'absolute', bottom: -50, left: -50, width: 200, height: 200, borderRadius: '50%', background: 'rgba(255,255,255,0.05)' }} />

          <Stack direction={{ xs: 'column', md: 'row' }} alignItems="center" spacing={4} sx={{ position: 'relative', zIndex: 1 }}>
            <Avatar
              sx={{
                width: 120,
                height: 120,
                border: '4px solid rgba(255,255,255,0.3)',
                boxShadow: '0 8px 32px rgba(0,0,0,0.2)',
                background: '#fff',
                color: '#4338ca',
                fontSize: '3rem',
                fontWeight: 800
              }}
            >
              {USER.name.charAt(0)}
            </Avatar>
            <Box sx={{ textAlign: { xs: 'center', md: 'left' } }}>
              <Typography variant="h3" fontWeight={800} sx={{ mb: 1, letterSpacing: '-1px' }}>
                {USER.name}
              </Typography>
              <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} alignItems="center" sx={{ opacity: 0.9 }}>
                <Typography variant="body1" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Email fontSize="small" /> {USER.email}
                </Typography>
                <Chip 
                  label={USER.role} 
                  size="small" 
                  sx={{ 
                    bgcolor: 'rgba(255,255,255,0.2)', 
                    color: 'white', 
                    fontWeight: 600,
                    backdropFilter: 'blur(4px)'
                  }} 
                />
              </Stack>
            </Box>
          </Stack>
        </Paper>

        <Grid container spacing={4}>
          {/* Left Column: Personal Info */}
          <Grid size={{ xs: 12, md: 4 }}>
            <Paper
              elevation={0}
              sx={{
                p: 3,
                borderRadius: 3,
                border: '1px solid',
                borderColor: 'divider',
                background: 'rgba(255, 255, 255, 0.8)',
                backdropFilter: 'blur(10px)',
              }}
            >
              <Typography variant="h6" fontWeight={700} sx={{ mb: 3, display: 'flex', alignItems: 'center', gap: 1 }}>
                <Person sx={{ color: '#4338ca' }} /> Personal Info
              </Typography>
              
              <List disablePadding>
                <ListItem sx={{ px: 0, py: 1.5, borderBottom: '1px solid rgba(0,0,0,0.04)' }}>
                  <ListItemAvatar>
                    <Avatar sx={{ bgcolor: 'rgba(67, 56, 202, 0.1)', color: '#4338ca' }}><Phone fontSize="small" /></Avatar>
                  </ListItemAvatar>
                  <ListItemText primary="Phone" secondary={USER.phone} primaryTypographyProps={{ fontWeight: 600, fontSize: '0.9rem' }} />
                </ListItem>
                <ListItem sx={{ px: 0, py: 1.5, borderBottom: '1px solid rgba(0,0,0,0.04)' }}>
                  <ListItemAvatar>
                    <Avatar sx={{ bgcolor: 'rgba(67, 56, 202, 0.1)', color: '#4338ca' }}><LocationOn fontSize="small" /></Avatar>
                  </ListItemAvatar>
                  <ListItemText primary="Location" secondary={USER.location} primaryTypographyProps={{ fontWeight: 600, fontSize: '0.9rem' }} />
                </ListItem>
                <ListItem sx={{ px: 0, py: 1.5 }}>
                  <ListItemAvatar>
                    <Avatar sx={{ bgcolor: 'rgba(67, 56, 202, 0.1)', color: '#4338ca' }}><CheckCircle fontSize="small" /></Avatar>
                  </ListItemAvatar>
                  <ListItemText primary="Member Since" secondary={USER.joinDate} primaryTypographyProps={{ fontWeight: 600, fontSize: '0.9rem' }} />
                </ListItem>
              </List>
            </Paper>
          </Grid>

          {/* Right Column: Order History */}
          <Grid size={{ xs: 12, md: 8 }}>
            <Paper
              elevation={0}
              sx={{
                p: 3,
                borderRadius: 3,
                border: '1px solid',
                borderColor: 'divider',
                background: 'rgba(255, 255, 255, 0.8)',
                backdropFilter: 'blur(10px)',
              }}
            >
              <Typography variant="h6" fontWeight={700} sx={{ mb: 3, display: 'flex', alignItems: 'center', gap: 1 }}>
                <ShoppingBag sx={{ color: '#4338ca' }} /> Order History
              </Typography>

              <Stack spacing={2}>
                {ORDERS.map((order) => (
                  <Paper
                    key={order.id}
                    elevation={0}
                    onClick={() => {
                      router.push('/not-found');
                    }}
                    sx={{
                      p: 2.5,
                      borderRadius: 2,
                      border: '1px solid',
                      borderColor: 'rgba(0,0,0,0.06)',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                      '&:hover': {
                        borderColor: '#4338ca',
                        bgcolor: 'rgba(67, 56, 202, 0.02)',
                        transform: 'translateY(-2px)'
                      }
                    }}
                  >
                    <Stack direction={{ xs: 'column', sm: 'row' }} justifyContent="space-between" alignItems={{ sm: 'center' }} spacing={2}>
                      <Box>
                        <Stack direction="row" alignItems="center" spacing={1.5} sx={{ mb: 0.5 }}>
                          <Typography variant="subtitle1" fontWeight={700} color="#1e293b">
                            {order.id}
                          </Typography>
                          <Chip 
                            label={order.status} 
                            size="small"
                            sx={{
                              height: 24,
                              fontWeight: 600,
                              fontSize: '0.75rem',
                              bgcolor: order.status === 'Delivered' ? 'rgba(34, 197, 94, 0.1)' : 'rgba(234, 179, 8, 0.1)',
                              color: order.status === 'Delivered' ? '#16a34a' : '#ca8a04',
                            }}
                          />
                        </Stack>
                        <Typography variant="caption" color="text.secondary">
                          {order.date} • {order.items} items
                        </Typography>
                      </Box>

                      <Stack direction="row" alignItems="center" spacing={3}>
                        <Typography variant="h6" fontWeight={800} color="#4338ca">
                          ${order.total.toFixed(2)}
                        </Typography>
                      </Stack>
                    </Stack>
                  </Paper>
                ))}
              </Stack>
            </Paper>
          </Grid>
        </Grid>

      </Container>
    </Box>
  );
}
