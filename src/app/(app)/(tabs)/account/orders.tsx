import Feather from '@expo/vector-icons/Feather';
import { router } from 'expo-router';
import { FlatList, Pressable, RefreshControl, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import type { Order } from '@/api';
import { ScreenHeader } from '@/components/layout/ScreenHeader';
import { EmptyState } from '@/components/ui/EmptyState';
import { LoadingView } from '@/components/ui/LoadingView';
import { colors, fonts, spacing } from '@/constants/theme';
import { useOrders } from '@/hooks/useOrders';

export default function OrdersScreen() {
  const { data: orders = [], isPending, isRefetching, refetch } = useOrders();

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <ScreenHeader title="Sifariş tarixçəsi" />
      <FlatList
        data={orders}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => <OrderRow order={item} />}
        contentContainerStyle={styles.list}
        refreshControl={
          <RefreshControl refreshing={isRefetching} onRefresh={refetch} tintColor={colors.primary} />
        }
        ListEmptyComponent={
          isPending ? <LoadingView /> : <EmptyState message="Hələ sifarişiniz yoxdur" />
        }
      />
    </SafeAreaView>
  );
}

function OrderRow({ order }: { order: Order }) {
  return (
    <Pressable
      onPress={() => router.push({ pathname: '/order/[id]', params: { id: order.id } })}
      style={({ pressed }) => [styles.row, pressed && styles.pressed]}>
      <View style={styles.numberCol}>
        <Text style={styles.label}>No</Text>
        <Text style={styles.value} numberOfLines={1}>
          #{order.orderNumber.split('-').pop()}
        </Text>
      </View>
      <View style={styles.addressCol}>
        <Text style={styles.label}>Çatdırılma ünvanı</Text>
        <Text style={styles.value} numberOfLines={1}>
          {order.address}
        </Text>
      </View>
      <Feather name="chevron-right" size={20} color={colors.title} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: colors.background,
  },
  list: {
    paddingTop: 4,
    flexGrow: 1,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.screen,
    paddingVertical: 12,
    gap: 16,
  },
  pressed: {
    backgroundColor: colors.surface,
  },
  numberCol: {
    width: 70,
    gap: 3,
  },
  addressCol: {
    flex: 1,
    gap: 3,
  },
  label: {
    color: colors.title,
    fontFamily: fonts.regular,
    fontSize: 11,
  },
  value: {
    color: colors.text,
    fontFamily: fonts.regular,
    fontSize: 12,
  },
});
