import { api } from '../client';
import type { CheckoutPayload, Order } from '../types';

export const orderService = {
  checkout: (payload: CheckoutPayload) => api.post<Order>('/orders/checkout', payload),
  list: () => api.get<Order[]>('/orders/user'),
  getById: (id: number) => api.get<Order>(`/orders/user/${id}`),
};
