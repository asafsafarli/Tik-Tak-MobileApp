import { useMutation, useQuery } from '@tanstack/react-query';

import { basketService, type Basket, type Product } from '@/api';
import { queryClient, queryKeys } from '@/lib/queryClient';

const BASKET_MUTATION_KEY = ['basket-mutation'];

export function useBasket() {
  return useQuery({ queryKey: queryKeys.basket, queryFn: basketService.get });
}

export function useBasketQuantity(productId: number) {
  const { data = 0 } = useQuery({
    queryKey: queryKeys.basket,
    queryFn: basketService.get,
    select: (basket) => basket.items.find((item) => item.product.id === productId)?.quantity ?? 0,
  });
  return data;
}

export function useBasketSummary() {
  const { data } = useQuery({
    queryKey: queryKeys.basket,
    queryFn: basketService.get,
    select: (basket) => ({ count: basket.count, total: basket.total }),
  });
  return data ?? { count: 0, total: '0.00' };
}

type BasketAction = 'add' | 'remove' | 'removeAll';

const basketRequests = {
  add: basketService.add,
  remove: basketService.remove,
  removeAll: basketService.removeAll,
};

function applyAction(basket: Basket, product: Product, action: BasketAction): Basket {
  const existing = basket.items.find((item) => item.product.id === product.id);
  const current = existing?.quantity ?? 0;
  const next = action === 'add' ? current + 1 : action === 'remove' ? current - 1 : 0;
  const price = Number(product.price);

  let items = basket.items;
  if (next <= 0) {
    items = items.filter((item) => item.product.id !== product.id);
  } else if (existing) {
    items = items.map((item) =>
      item === existing
        ? { ...item, quantity: next, total_price: (price * next).toFixed(2) }
        : item,
    );
  } else {
    items = [...items, { id: -product.id, quantity: 1, total_price: price.toFixed(2), product }];
  }

  const total = items.reduce((sum, item) => sum + Number(item.total_price), 0);
  const count = items.reduce((sum, item) => sum + item.quantity, 0);
  return { items, count, total: total.toFixed(2) };
}

export function useBasketActions(product: Product) {
  const mutation = useMutation({
    mutationKey: BASKET_MUTATION_KEY,
    scope: { id: 'basket' },
    mutationFn: (action: BasketAction) => basketRequests[action](product.id),
    onMutate: async (action) => {
      await queryClient.cancelQueries({ queryKey: queryKeys.basket });
      queryClient.setQueryData<Basket>(queryKeys.basket, (old) =>
        old ? applyAction(old, product, action) : old,
      );
    },
    onSuccess: (basket) => {
      const pending = queryClient.isMutating({ mutationKey: BASKET_MUTATION_KEY });
      if (pending <= 1) queryClient.setQueryData<Basket>(queryKeys.basket, basket);
    },
    onError: () => queryClient.invalidateQueries({ queryKey: queryKeys.basket }),
  });

  return {
    add: () => mutation.mutate('add'),
    remove: () => mutation.mutate('remove'),
    removeAll: () => mutation.mutate('removeAll'),
  };
}
