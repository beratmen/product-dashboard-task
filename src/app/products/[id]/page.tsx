import { fetchProductById } from '@/services/productService';
import ProductDetailView from '@/components/products/ProductDetailView';

export default async function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const product = await fetchProductById(id);

  return <ProductDetailView product={product} />;
}
