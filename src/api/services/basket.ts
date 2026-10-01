import { api } from '../client';
import type { Basket } from '../types';

// Every mutation returns the updated basket. IDs are product IDs, not basket item IDs.
export const basketService = {
  get: () => api.get<Basket>('/basket'),
  /** +1 quantity */
  add: (productId: number) => api.post<Basket>(`/basket/${productId}/add`),
  /** -1 quantity; the item is dropped when it reaches 0 */
  remove: (productId: number) => api.post<Basket>(`/basket/${productId}/remove`),
  /** Removes the product entirely regardless of quantity */
  removeAll: (productId: number) => api.delete<Basket>(`/basket/${productId}/remove-all`),
  clear: () => api.delete<Basket>('/basket/clear'),
};
