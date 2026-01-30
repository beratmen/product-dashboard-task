import { fetchProductById } from '@/features/products/services/productService';
import ProductDetailView from '@/features/products/components/ProductDetailView';

export default async function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const product = await fetchProductById(id);

  return <ProductDetailView product={product} />;
}
