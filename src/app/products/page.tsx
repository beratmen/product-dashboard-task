import { fetchProducts } from '@/features/products/services/productService';
import ProductsView from '@/features/products/components/ProductsView';

import { Suspense } from 'react';
import { CircularProgress, Box } from '@mui/material';

export default async function ProductsPage() {
  // SSR Fetch
  const initialData = await fetchProducts(20, 0);

  return (
    <Suspense fallback={
      <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
        <CircularProgress />
      </Box>
    }>
      <ProductsView initialData={initialData} />
    </Suspense>
  );
}
