import { useMutation, useQuery } from '@tanstack/react-query';

import { orderService, type Basket, type CheckoutPayload } from '@/api';
import { queryClient, queryKeys } from '@/lib/queryClient';

export function useOrders() {
  return useQuery({ queryKey: queryKeys.orders, queryFn: orderService.list });
}

export function useCheckout() {
  return useMutation({
    mutationFn: (payload: CheckoutPayload) => orderService.checkout(payload),
    onSuccess: () => {
      // The server empties the basket after checkout.
      queryClient.setQueryData<Basket>(queryKeys.basket, { items: [], total: '0.00', count: 0 });
      queryClient.invalidateQueries({ queryKey: queryKeys.orders });
    },
  });
}
