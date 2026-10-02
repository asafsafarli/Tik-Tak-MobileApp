import { api } from '../client';
import type { Campaign, Category, Product, ProductListParams } from '../types';

export const productService = {
  list: (params: ProductListParams = {}) => api.getPaginated<Product>('/products', { params }),
  getById: (id: number) => api.get<Product>(`/products/${id}`),

  favorites: () => api.get<Product[]>('/products/favorites'),
  /** Toggles: adds the product to favorites, or removes it if already there. */
  toggleFavorite: (id: number) => api.post<null>(`/products/${id}/favorite`),
};

export const categoryService = {
  list: () => api.get<Category[]>('/categories'),
};

export const campaignService = {
  list: () => api.get<Campaign[]>('/campaigns'),
};
