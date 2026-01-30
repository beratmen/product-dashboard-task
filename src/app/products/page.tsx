import { fetchProducts } from '@/features/products/services/productService';
import ProductsView from '@/features/products/components/ProductsView';

export default async function ProductsPage() {
  // SSR Fetch
  const initialData = await fetchProducts(20, 0);

  return <ProductsView initialData={initialData} />;
}
