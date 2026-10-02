import {
  keepPreviousData,
  useInfiniteQuery,
  useMutation,
  useQuery,
  type InfiniteData,
} from '@tanstack/react-query';
import { useMemo } from 'react';

import {
  campaignService,
  categoryService,
  productService,
  type Paginated,
  type Product,
} from '@/api';
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

export function useProducts(
  { categoryId, search }: ProductFilters,
  { enabled = true, keepPrevious = false } = {},
) {
  const query = useInfiniteQuery({
    queryKey: queryKeys.products({ categoryId, search }),
    queryFn: ({ pageParam }) =>
      productService.list({ page: pageParam, limit: 20, category_id: categoryId, search }),
    enabled,
    placeholderData: keepPrevious ? keepPreviousData : undefined,
    initialPageParam: 1,
    getNextPageParam: (lastPage) => lastPage.pagination.next ?? undefined,
  });

  const products = useMemo(
    () => query.data?.pages.flatMap((page) => page.items) ?? [],
    [query.data],
  );
  return { ...query, products };
}

function findCachedProduct(id: number): Product | undefined {
  const lists = queryClient.getQueriesData<InfiniteData<Paginated<Product>>>({
    queryKey: ['products'],
  });
  for (const [, data] of lists) {
    for (const page of data?.pages ?? []) {
      const product = page.items.find((item) => item.id === id);
      if (product) return product;
    }
  }
  return queryClient.getQueryData<Product[]>(queryKeys.favorites)?.find((item) => item.id === id);
}

export function useProduct(id: number) {
  return useQuery({
    queryKey: queryKeys.product(id),
    queryFn: () => productService.getById(id),
    placeholderData: () => findCachedProduct(id),
  });
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
