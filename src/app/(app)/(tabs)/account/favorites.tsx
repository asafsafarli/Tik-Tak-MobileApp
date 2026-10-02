import { FlatList, RefreshControl, StyleSheet, type ListRenderItem } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import type { Product } from '@/api';
import { ScreenHeader } from '@/components/layout/ScreenHeader';
import { BasketBar, BASKET_BAR_HEIGHT } from '@/components/product/BasketBar';
import { ProductCard } from '@/components/product/ProductCard';
import { EmptyState } from '@/components/ui/EmptyState';
import { LoadingView } from '@/components/ui/LoadingView';
import { gridListProps } from '@/constants/list';
import { colors, spacing } from '@/constants/theme';
import { useFavorites } from '@/hooks/useCatalog';

const renderProduct: ListRenderItem<Product> = ({ item }) => <ProductCard product={item} />;

export default function FavoritesScreen() {
  const { data: favorites = [], isPending, isRefetching, refetch } = useFavorites();

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <ScreenHeader title="Siyahılarım" />
      <FlatList
        data={favorites}
        keyExtractor={(item) => String(item.id)}
        numColumns={2}
        columnWrapperStyle={styles.column}
        contentContainerStyle={styles.list}
        renderItem={renderProduct}
        {...gridListProps}
        refreshControl={
          <RefreshControl
            refreshing={isRefetching}
            onRefresh={refetch}
            tintColor={colors.primary}
          />
        }
        ListEmptyComponent={
          isPending ? <LoadingView /> : <EmptyState message="Siyahınızda məhsul yoxdur" />
        }
      />
      <BasketBar />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: colors.background,
  },
  list: {
    paddingHorizontal: spacing.screen,
    paddingTop: 8,
    paddingBottom: spacing.screen + BASKET_BAR_HEIGHT + 10,
    gap: 12,
    flexGrow: 1,
  },
  column: {
    gap: 12,
  },
});
