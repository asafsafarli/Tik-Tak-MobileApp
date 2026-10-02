import { api } from '../client';
import type { CheckoutPayload, Order } from '../types';

export const orderService = {
  /** Creates an order from the current basket; the basket is emptied afterwards. */
  checkout: (payload: CheckoutPayload) => api.post<Order>('/orders/checkout', payload),
  list: () => api.get<Order[]>('/orders/user'),
  getById: (id: number) => api.get<Order>(`/orders/user/${id}`),
};
