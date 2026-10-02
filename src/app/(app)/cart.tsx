import { router } from 'expo-router';
import { FlatList, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { BasketItemRow } from '@/components/basket/BasketItemRow';
import { OrderTotals } from '@/components/basket/OrderTotals';
import { ScreenHeader } from '@/components/layout/ScreenHeader';
import { Button } from '@/components/ui/Button';
import { EmptyState } from '@/components/ui/EmptyState';
import { LoadingView } from '@/components/ui/LoadingView';
import { colors, spacing } from '@/constants/theme';
import { useBasket } from '@/hooks/useBasket';

export default function CartScreen() {
  const { data: basket, isPending } = useBasket();
  const isEmpty = !basket || basket.items.length === 0;

  return (
    <SafeAreaView style={styles.safe}>
      <ScreenHeader title="Səbətim" />

      {isPending ? (
        <LoadingView />
      ) : (
        <FlatList
          data={basket?.items ?? []}
          keyExtractor={(item) => String(item.id)}
          renderItem={({ item }) => <BasketItemRow item={item} />}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          contentContainerStyle={styles.list}
          ListEmptyComponent={
            <View style={styles.empty}>
              <EmptyState message="Səbətinizdə məhsul yoxdur" />
            </View>
          }
        />
      )}

      {!isEmpty && (
        <View style={styles.footer}>
          <OrderTotals total={basket.total} />
          <Button
            title="Sifarişi tamamla"
            onPress={() => router.push('/checkout')}
            style={styles.button}
          />
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: colors.background,
  },
  list: {
    paddingTop: 8,
    flexGrow: 1,
  },
  separator: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: colors.border,
    marginHorizontal: spacing.screen,
  },
  empty: {
    flex: 1,
    justifyContent: 'center',
    paddingBottom: 120,
  },
  footer: {
    paddingHorizontal: spacing.screen,
    paddingTop: 12,
    gap: 16,
  },
  button: {
    backgroundColor: colors.primaryLight,
  },
});
