import Feather from '@expo/vector-icons/Feather';
import { router, useLocalSearchParams } from 'expo-router';
import { FlatList, Pressable, RefreshControl, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AppHeader } from '@/components/layout/AppHeader';
import { BasketBar, BASKET_BAR_HEIGHT } from '@/components/product/BasketBar';
import { CategoryChips } from '@/components/product/CategoryChips';
import { ProductCard } from '@/components/product/ProductCard';
import { EmptyState } from '@/components/ui/EmptyState';
import { LoadingView } from '@/components/ui/LoadingView';
import { colors, fonts, radius, spacing } from '@/constants/theme';
import { useCategories, useProducts } from '@/hooks/useCatalog';

export default function ProductsScreen() {
  const params = useLocalSearchParams<{ categoryId?: string }>();
  const categoryId = params.categoryId ? Number(params.categoryId) : undefined;

  const { data: categories = [] } = useCategories();
  const { products, isPending, isRefetching, refetch, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useProducts(categoryId);

  const backToCategories = () => (router.canGoBack() ? router.back() : router.replace('/'));

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <AppHeader />

      <View style={styles.top}>
        <Pressable
          onPress={backToCategories}
          style={({ pressed }) => [styles.allButton, pressed && styles.pressed]}>
          <Feather name="grid" size={20} color={colors.white} />
          <Text style={styles.allText}>Əsas kateqoriyalara bax</Text>
        </Pressable>
      </View>

      <View style={styles.chips}>
        <CategoryChips
          categories={categories}
          selectedId={categoryId}
          onSelect={(id) => router.setParams({ categoryId: String(id) })}
        />
      </View>

      <FlatList
        data={products}
        keyExtractor={(item) => String(item.id)}
        numColumns={2}
        columnWrapperStyle={styles.column}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => <ProductCard product={item} />}
        onEndReached={() => hasNextPage && !isFetchingNextPage && fetchNextPage()}
        onEndReachedThreshold={0.5}
        refreshControl={
          <RefreshControl refreshing={isRefetching} onRefresh={refetch} tintColor={colors.primary} />
        }
        ListEmptyComponent={
          isPending ? <LoadingView /> : <EmptyState message="Bu kateqoriyada məhsul yoxdur" />
        }
        ListFooterComponent={isFetchingNextPage ? <LoadingView /> : null}
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
  top: {
    paddingHorizontal: spacing.screen,
    paddingTop: 14,
  },
  allButton: {
    height: 46,
    borderRadius: radius.button,
    backgroundColor: colors.primary,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    gap: 14,
  },
  pressed: {
    backgroundColor: colors.primaryPressed,
  },
  allText: {
    color: colors.white,
    fontFamily: fonts.regular,
    fontSize: 16,
  },
  chips: {
    paddingVertical: 14,
  },
  list: {
    paddingHorizontal: spacing.screen,
    paddingBottom: spacing.screen + BASKET_BAR_HEIGHT + 10,
    gap: 12,
    flexGrow: 1,
  },
  column: {
    gap: 12,
  },
});
