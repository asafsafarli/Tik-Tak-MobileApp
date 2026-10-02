import { focusManager, QueryClient } from '@tanstack/react-query';
import { AppState } from 'react-native';

focusManager.setEventListener((setFocused) => {
  const subscription = AppState.addEventListener('change', (state) =>
    setFocused(state === 'active'),
  );
  return () => subscription.remove();
});

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60_000,
      retry: 1,
    },
  },
});

export const queryKeys = {
  categories: ['categories'] as const,
  campaigns: ['campaigns'] as const,
  products: (filters: { categoryId?: number; search?: string }) => ['products', filters] as const,
  product: (id: number) => ['product', id] as const,
  favorites: ['favorites'] as const,
  basket: ['basket'] as const,
  orders: ['orders'] as const,
  order: (id: number) => ['order', id] as const,
};
