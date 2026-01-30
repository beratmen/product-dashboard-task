import { Product } from '@/features/products/types';

const CART_KEY = 'product-dashboard-cart';

export interface CartItem {
  product: Product;
  quantity: number;
}

export const getCart = (): CartItem[] => {
  if (typeof window === 'undefined') return [];
  
  try {
    const stored = localStorage.getItem(CART_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error('Error reading cart from localStorage:', error);
    return [];
  }
};

export const saveCart = (items: CartItem[]): void => {
  if (typeof window === 'undefined') return;
  
  try {
    localStorage.setItem(CART_KEY, JSON.stringify(items));
  } catch (error) {
    console.error('Error saving cart to localStorage:', error);
  }
};

export const clearCart = (): void => {
  if (typeof window === 'undefined') return;
  
  try {
    localStorage.removeItem(CART_KEY);
  } catch (error) {
    console.error('Error clearing cart from localStorage:', error);
  }
};
