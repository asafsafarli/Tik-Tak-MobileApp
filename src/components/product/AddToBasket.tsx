import Feather from '@expo/vector-icons/Feather';
import { ActivityIndicator, Pressable, StyleSheet, Text, View } from 'react-native';

import type { Product } from '@/api';
import { colors, fonts } from '@/constants/theme';
import { useBasketActions, useBasketQuantity } from '@/hooks/useBasket';
import { measureLabel } from '@/utils/format';

interface AddToBasketProps {
  product: Product;
  size?: 'small' | 'large';
}

/** "Səbətə əlavə et" button that turns into  [ − ] [ + 1 kq ]  once the product is in the basket. */
export function AddToBasket({ product, size = 'small' }: AddToBasketProps) {
  const quantity = useBasketQuantity(product.id);
  const { add, remove, isPending } = useBasketActions(product.id);
  const large = size === 'large';
  const height = large ? 46 : 30;

  if (quantity === 0) {
    return (
      <Pressable
        onPress={add}
        disabled={isPending}
        style={({ pressed }) => [styles.add, { height }, pressed && styles.pressed]}>
        {isPending ? (
          <ActivityIndicator color={colors.white} size="small" />
        ) : (
          <Text style={[styles.addText, large && styles.largeText]}>Səbətə əlavə et</Text>
        )}
      </Pressable>
    );
  }

  return (
    <View style={styles.row}>
      <Pressable
        accessibilityLabel="Azalt"
        onPress={remove}
        disabled={isPending}
        style={({ pressed }) => [styles.minus, { height, width: height }, pressed && styles.pressed]}>
        <Feather name="minus" size={large ? 20 : 16} color={colors.white} />
      </Pressable>
      <Pressable
        accessibilityLabel="Artır"
        onPress={add}
        disabled={isPending}
        style={({ pressed }) => [styles.plus, { height }, pressed && styles.pressed]}>
        <Feather name="plus" size={large ? 20 : 16} color={colors.white} />
        <Text style={[styles.addText, large && styles.largeText]}>1 {measureLabel(product.type)}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  add: {
    borderRadius: 8,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 12,
  },
  addText: {
    color: colors.white,
    fontFamily: fonts.medium,
    fontSize: 12,
  },
  largeText: {
    fontSize: 16,
  },
  row: {
    flexDirection: 'row',
    gap: 8,
  },
  minus: {
    borderRadius: 8,
    backgroundColor: colors.dangerSoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
  plus: {
    flex: 1,
    flexDirection: 'row',
    borderRadius: 8,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
  },
  pressed: {
    opacity: 0.75,
  },
});
