import { FlatList, RefreshControl, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import type { Order } from '@/api';
import { ScreenHeader } from '@/components/layout/ScreenHeader';
import { EmptyState } from '@/components/ui/EmptyState';
import { LoadingView } from '@/components/ui/LoadingView';
import { colors, fonts, radius, spacing } from '@/constants/theme';
import { useOrders } from '@/hooks/useOrders';
import { formatDateTime, formatPrice, orderStatusLabel } from '@/utils/format';

// Temporary layout until the orders design is ready.
export default function OrdersScreen() {
  const { data: orders = [], isPending, isRefetching, refetch } = useOrders();

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <ScreenHeader title="Sifarişlərim" />
      <FlatList
        data={orders}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => <OrderRow order={item} />}
        contentContainerStyle={styles.list}
        refreshControl={
          <RefreshControl refreshing={isRefetching} onRefresh={refetch} tintColor={colors.primary} />
        }
        ListEmptyComponent={isPending ? <LoadingView /> : <EmptyState message="Hələ sifarişiniz yoxdur" />}
      />
    </SafeAreaView>
  );
}

function OrderRow({ order }: { order: Order }) {
  const itemCount = order.items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <View style={styles.card}>
      <View style={styles.cardTop}>
        <Text style={styles.number}>{order.orderNumber}</Text>
        <Text style={styles.status}>{orderStatusLabel(order.status)}</Text>
      </View>
      <Text style={styles.meta}>{formatDateTime(order.createdAt)}</Text>
      <View style={styles.cardTop}>
        <Text style={styles.meta}>
          {itemCount} məhsul · {order.paymentMethod === 'CASH' ? 'Nağd' : 'Kart'}
        </Text>
        <Text style={styles.total}>{formatPrice(order.total)}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  list: { padding: spacing.screen, gap: 12, flexGrow: 1 },
  card: {
    padding: 16,
    borderRadius: radius.card,
    backgroundColor: colors.surface,
    gap: 6,
  },
  cardTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  number: { color: colors.title, fontFamily: fonts.medium, fontSize: 15 },
  status: { color: colors.primary, fontFamily: fonts.medium, fontSize: 13 },
  meta: { color: colors.muted, fontFamily: fonts.regular, fontSize: 13 },
  total: { color: colors.title, fontFamily: fonts.bold, fontSize: 15 },
});
