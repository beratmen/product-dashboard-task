'use client';

import { Box, Container, Typography, Button, Paper } from '@mui/material';
import { Home } from '@mui/icons-material';
import Link from 'next/link';

export default function NotFound() {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: '#f8fafc',
        p: 2,
      }}
    >
      <Container maxWidth="sm">
        <Paper
          elevation={0}
          sx={{
            p: 5,
            textAlign: 'center',
            borderRadius: 4,
            border: '1px solid',
            borderColor: 'divider',
            bgcolor: 'white',
            boxShadow: '0 4px 24px rgba(0,0,0,0.05)',
          }}
        >
          <Typography
            variant="h1"
            sx={{
              fontSize: '6rem',
              fontWeight: 800,
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              mb: 2,
              lineHeight: 1,
            }}
          >
            404
          </Typography>
          
          <Typography variant="h5" fontWeight={700} sx={{ mb: 2, color: '#1e293b' }}>
            Page Not Found
          </Typography>

          <Typography color="text.secondary" sx={{ mb: 4, lineHeight: 1.6 }}>
            The page you are looking for doesn't exist or has been moved.
          </Typography>

          <Button
            component={Link}
            href="/"
            variant="contained"
            size="large"
            startIcon={<Home />}
            sx={{
              borderRadius: 2,
              textTransform: 'none',
              fontWeight: 600,
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              boxShadow: '0 8px 16px rgba(102, 126, 234, 0.24)',
            }}
          >
            Back to Home
          </Button>
        </Paper>
      </Container>
    </Box>
  );
}
