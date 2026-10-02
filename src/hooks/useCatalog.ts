import { useInfiniteQuery, useMutation, useQuery } from '@tanstack/react-query';

import { campaignService, categoryService, productService, type Product } from '@/api';
import { queryClient, queryKeys } from '@/lib/queryClient';

export function useCategories() {
  return useQuery({ queryKey: queryKeys.categories, queryFn: categoryService.list });
}

export function useCampaigns() {
  return useQuery({ queryKey: queryKeys.campaigns, queryFn: campaignService.list });
}

interface ProductFilters {
  categoryId?: number;
  search?: string;
}

export function useProducts({ categoryId, search }: ProductFilters, { enabled = true } = {}) {
  const query = useInfiniteQuery({
    queryKey: queryKeys.products({ categoryId, search }),
    queryFn: ({ pageParam }) =>
      productService.list({ page: pageParam, limit: 20, category_id: categoryId, search }),
    enabled,
    initialPageParam: 1,
    getNextPageParam: (lastPage) => lastPage.pagination.next ?? undefined,
  });

  const products = query.data?.pages.flatMap((page) => page.items) ?? [];
  return { ...query, products };
}

export function useProduct(id: number) {
  return useQuery({ queryKey: queryKeys.product(id), queryFn: () => productService.getById(id) });
}

export function useFavorites() {
  return useQuery({ queryKey: queryKeys.favorites, queryFn: productService.favorites });
}

export function useToggleFavorite(id: number) {
  return useMutation({
    mutationFn: () => productService.toggleFavorite(id),
    onMutate: () => {
      queryClient.setQueryData<Product>(queryKeys.product(id), (old) =>
        old ? { ...old, is_favorite: !old.is_favorite } : old,
      );
    },
    onError: () => {
      queryClient.setQueryData<Product>(queryKeys.product(id), (old) =>
        old ? { ...old, is_favorite: !old.is_favorite } : old,
      );
    },
    onSettled: () => queryClient.invalidateQueries({ queryKey: queryKeys.favorites }),
  });
}
