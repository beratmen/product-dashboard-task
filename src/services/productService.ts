import axiosInstance from '@/lib/axios';
import { Product, ProductResponse } from '@/types';

const handleApiError = (error: any, context: string) => {
  const errorMessage = error.response?.data?.message || error.message || 'An error occurred';
  const status = error.response?.status || 500;
  
  console.error(`[${context}] Error:`, { status, message: errorMessage });
  
  if (status === 404) {
    throw new Error(`${context}: Resource not found`);
  }
  if (status === 500) {
    throw new Error(`${context}: Server error. Please try again later.`);
  }
  if (status === 503) {
    throw new Error(`${context}: Service unavailable. Please try again later.`);
  }
  
  throw new Error(errorMessage);
};

export const fetchProducts = async (
  limit: number = 20, 
  skip: number = 0, 
  q: string = '', 
  category: string | null = null
): Promise<ProductResponse> => {
  try {
    let endpoint: string;
    
    if (category) {
      endpoint = `/products/category/${encodeURIComponent(category)}?limit=${limit}&skip=${skip}`;
    } else if (q) {
      endpoint = `/products/search?q=${encodeURIComponent(q)}&limit=${limit}&skip=${skip}`;
    } else {
      endpoint = `/products?limit=${limit}&skip=${skip}`;
    }
    
    const response = await axiosInstance.get<ProductResponse>(endpoint);
    
    // Validate response data
    if (!response.data || !response.data.products) {
      throw new Error('Invalid response data format');
    }
    
    return response.data;
  } catch (error) {
    handleApiError(error, 'fetchProducts');
    throw error;
  }
};

export const fetchProductById = async (id: string): Promise<Product> => {
  try {
    if (!id || id.trim() === '') {
      throw new Error('Product ID is required');
    }
    
    const response = await axiosInstance.get<Product>(`/products/${encodeURIComponent(id)}`);
    
    if (!response.data || !response.data.id) {
      throw new Error('Invalid product data');
    }
    
    return response.data;
  } catch (error) {
    handleApiError(error, 'fetchProductById');
    throw error;
  }
};

export const fetchCategories = async (): Promise<string[]> => {
  try {
    const response = await axiosInstance.get<string[]>('/products/categories');
    
    if (!Array.isArray(response.data)) {
      throw new Error('Invalid categories data format');
    }
    
    return response.data;
  } catch (error) {
    handleApiError(error, 'fetchCategories');
    // Return empty array on error to prevent app crash
    return [];
  }
};

