import { useLocalSearchParams } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import type { OrderItem } from '@/api';
import { ProductImage } from '@/components/product/ProductImage';
import { LoadingView } from '@/components/ui/LoadingView';
import { colors, fonts, spacing } from '@/constants/theme';
import { useOrder } from '@/hooks/useOrders';
import { formatDate, formatPrice, measureLabel, orderStatusLabel } from '@/utils/format';

export default function OrderSheet() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { data: order } = useOrder(Number(id));
  const { bottom } = useSafeAreaInsets();

  if (!order) {
    return (
      <View style={styles.container}>
        <LoadingView />
      </View>
    );
  }

  const itemCount = order.items.reduce((sum, item) => sum + item.quantity, 0);
  const deliveryFee = Number(order.deliveryFee);

  return (
    <View style={[styles.container, { paddingBottom: bottom + 12 }]}>
      <View style={styles.grid}>
        <Info label="Tarix" value={formatDate(order.createdAt)} />
        <Info label="No" value={`#${order.orderNumber.split('-').pop()}`} />
        <Info label="Məhsul sayı" value={String(itemCount)} />
        <Info label="Çatdırılma ünvanı" value={order.address} />
        <Info label="Status" value={orderStatusLabel(order.status)} />
        <Info
          label="Subtotal/Çatdırılma"
          value={`${formatPrice(order.total)}/${deliveryFee > 0 ? formatPrice(deliveryFee) : 'pulsuz'}`}
        />
      </View>

      {/* Plain View on purpose: a ScrollView inside a fitToContents sheet gets detached
          and drawn over the content by the native sheet. */}
      <View>
        {order.items.map((item, index) => (
          <ItemRow key={item.id} item={item} last={index === order.items.length - 1} />
        ))}
      </View>
    </View>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.info}>
      <Text style={styles.infoLabel}>{label}</Text>
      <Text style={styles.infoValue} numberOfLines={1}>
        {value}
      </Text>
    </View>
  );
}

function ItemRow({ item, last }: { item: OrderItem; last: boolean }) {
  const unit = measureLabel(item.product.type);

  return (
    <View style={[styles.itemRow, !last && styles.itemBorder]}>
      <ProductImage uri={item.product.img_url} style={styles.itemImage} />
      <View style={styles.itemInfo}>
        <Text style={styles.itemText} numberOfLines={2}>
          {item.product.title.trim()} 1 {unit} / {item.quantity} {unit}
        </Text>
        <Text style={styles.itemText}>{formatPrice(item.total_price)}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: spacing.screen + 4,
    paddingTop: 36,
    backgroundColor: colors.background,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    rowGap: 14,
    marginBottom: 10,
  },
  info: {
    width: '50%',
    paddingRight: 12,
    gap: 3,
  },
  infoLabel: {
    color: colors.title,
    fontFamily: fonts.medium,
    fontSize: 12,
  },
  infoValue: {
    color: colors.muted,
    fontFamily: fonts.regular,
    fontSize: 12,
  },
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
  itemBorder: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.border,
  },
  itemImage: {
    width: 60,
    height: 48,
  },
  itemInfo: {
    flex: 1,
    marginLeft: 20,
    gap: 4,
  },
  itemText: {
    color: colors.muted,
    fontFamily: fonts.regular,
    fontSize: 13,
  },
});
