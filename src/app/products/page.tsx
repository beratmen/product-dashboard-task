import { fetchProducts } from '@/services/productService';
import ProductsView from '@/components/products/ProductsView';

export default async function ProductsPage() {
  // SSR Fetch
  const initialData = await fetchProducts(20, 0);

  return <ProductsView initialData={initialData} />;
}
