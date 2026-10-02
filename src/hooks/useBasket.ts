import { useMutation, useQuery } from '@tanstack/react-query';

import { basketService, type Basket } from '@/api';
import { queryClient, queryKeys } from '@/lib/queryClient';

export function useBasket() {
  return useQuery({ queryKey: queryKeys.basket, queryFn: basketService.get });
}

/** Quantity of a product in the basket (0 if absent). */
export function useBasketQuantity(productId: number) {
  const { data } = useBasket();
  return data?.items.find((item) => item.product.id === productId)?.quantity ?? 0;
}

type BasketAction = 'add' | 'remove';

/** +1 / -1 for one product. Every basket endpoint returns the fresh basket, so we store it directly. */
export function useBasketActions(productId: number) {
  const mutation = useMutation({
    mutationKey: ['basket', productId],
    mutationFn: (action: BasketAction) =>
      action === 'add' ? basketService.add(productId) : basketService.remove(productId),
    onSuccess: (basket) => queryClient.setQueryData<Basket>(queryKeys.basket, basket),
  });

  return {
    add: () => mutation.mutate('add'),
    remove: () => mutation.mutate('remove'),
    isPending: mutation.isPending,
  };
}
