import { api } from '../client';
import type { Basket } from '../types';

export const basketService = {
  get: () => api.get<Basket>('/basket'),
  add: (productId: number) => api.post<Basket>(`/basket/${productId}/add`),
  remove: (productId: number) => api.post<Basket>(`/basket/${productId}/remove`),
  removeAll: (productId: number) => api.delete<Basket>(`/basket/${productId}/remove-all`),
  clear: () => api.delete<Basket>('/basket/clear'),
};
