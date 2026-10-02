import { QueryClient } from '@tanstack/react-query';

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
};
