'use client';

import { Box, Container, Typography, Button, Paper, Stack } from '@mui/material';
import { ErrorOutline, Home, Refresh, SupportAgent } from '@mui/icons-material';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function ErrorPage() {
  const router = useRouter();

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
        p: 3,
      }}
    >
      <Container maxWidth="sm">
        <Paper
          elevation={0}
          sx={{
            p: { xs: 4, md: 6 },
            textAlign: 'center',
            borderRadius: 5,
            border: '1px solid',
            borderColor: 'rgba(255, 255, 255, 0.5)',
            bgcolor: 'rgba(255, 255, 255, 0.8)',
            backdropFilter: 'blur(20px)',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.1)',
          }}
        >
          {/* 1. ICON SECTION */}
          <Box
            sx={{
              width: 80,
              height: 80,
              borderRadius: '50%',
              bgcolor: 'rgba(239, 68, 68, 0.1)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto',
              mb: 4,
              animation: 'pulse 2s infinite',
              '@keyframes pulse': {
                '0%': { transform: 'scale(0.95)', boxShadow: '0 0 0 0 rgba(239, 68, 68, 0.4)' },
                '70%': { transform: 'scale(1)', boxShadow: '0 0 0 15px rgba(239, 68, 68, 0)' },
                '100%': { transform: 'scale(0.95)', boxShadow: '0 0 0 0 rgba(239, 68, 68, 0)' },
              },
            }}
          >
            <ErrorOutline sx={{ fontSize: 45, color: '#ef4444' }} />
          </Box>

          {/* 2. TEXT SECTION */}
          <Typography
            variant="h3"
            fontWeight={900}
            sx={{
              mb: 2,
              background: 'linear-gradient(135deg, #1e293b 0%, #475569 100%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              letterSpacing: '-1px',
            }}
          >
            Something Went Wrong
          </Typography>

          <Typography color="text.secondary" sx={{ mb: 5, fontSize: '1.1rem', lineHeight: 1.7 }}>
            We're sorry, but we encountered an unexpected error while processing your request. 
            This might be a temporary issue with our servers or the specific action you tried to perform.
          </Typography>

          {/* 3. ACTION BUTTONS */}
          <Stack spacing={2}>
            <Button
              variant="contained"
              size="large"
              startIcon={<Refresh />}
              onClick={() => window.location.reload()}
              sx={{
                py: 1.8,
                borderRadius: 3,
                textTransform: 'none',
                fontWeight: 700,
                fontSize: '1rem',
                background: 'linear-gradient(135deg, #4338ca 0%, #6366f1 100%)',
                boxShadow: '0 10px 20px -5px rgba(67, 56, 202, 0.4)',
                '&:hover': {
                  background: 'linear-gradient(135deg, #3730a3 0%, #4f46e5 100%)',
                  transform: 'translateY(-2px)',
                },
                transition: 'all 0.2s ease',
              }}
            >
              Try to Refresh
            </Button>

            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
              <Button
                component={Link}
                href="/"
                variant="outlined"
                fullWidth
                startIcon={<Home />}
                sx={{
                  py: 1.5,
                  borderRadius: 3,
                  textTransform: 'none',
                  fontWeight: 600,
                  borderColor: 'divider',
                  color: 'text.primary',
                  '&:hover': {
                    bgcolor: 'rgba(0,0,0,0.02)',
                    borderColor: 'text.primary',
                  },
                }}
              >
                Go to Home
              </Button>
              <Button
                variant="outlined"
                fullWidth
                startIcon={<SupportAgent />}
                sx={{
                  py: 1.5,
                  borderRadius: 3,
                  textTransform: 'none',
                  fontWeight: 600,
                  borderColor: 'divider',
                  color: 'text.primary',
                  '&:hover': {
                    bgcolor: 'rgba(0,0,0,0.02)',
                    borderColor: 'text.primary',
                  },
                }}
              >
                Get Support
              </Button>
            </Stack>
          </Stack>

          {/* 4. FOOTER NOTE */}
          <Box sx={{ mt: 6, pt: 3, borderTop: '1px solid', borderColor: 'rgba(0,0,0,0.05)' }}>
            <Typography variant="caption" color="text.disabled" sx={{ fontWeight: 500 }}>
              ERROR CODE: ERR_UI_STATE_REDIRECT
            </Typography>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}
