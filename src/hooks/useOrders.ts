import { useMutation, useQuery } from '@tanstack/react-query';

import { orderService, type Basket, type CheckoutPayload, type Order } from '@/api';
import { queryClient, queryKeys } from '@/lib/queryClient';

export function useOrders() {
  return useQuery({ queryKey: queryKeys.orders, queryFn: orderService.list });
}

export function useOrder(id: number) {
  return useQuery({
    queryKey: queryKeys.order(id),
    queryFn: () => orderService.getById(id),
    placeholderData: () =>
      queryClient.getQueryData<Order[]>(queryKeys.orders)?.find((order) => order.id === id),
  });
}

export function useCheckout() {
  return useMutation({
    mutationFn: (payload: CheckoutPayload) => orderService.checkout(payload),
    onSuccess: () => {
      queryClient.setQueryData<Basket>(queryKeys.basket, { items: [], total: '0.00', count: 0 });
      queryClient.invalidateQueries({ queryKey: queryKeys.orders });
    },
  });
}
