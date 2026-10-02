import Feather from '@expo/vector-icons/Feather';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import type { Product } from '@/api';
import { colors, fonts } from '@/constants/theme';
import { useBasketActions, useBasketQuantity } from '@/hooks/useBasket';
import { measureLabel } from '@/utils/format';

interface AddToBasketProps {
  product: Product;
  size?: 'small' | 'large';
}

export function AddToBasket({ product, size = 'small' }: AddToBasketProps) {
  const quantity = useBasketQuantity(product.id);
  const { add, remove } = useBasketActions(product);
  const large = size === 'large';
  const height = large ? 46 : 30;

  if (quantity === 0) {
    return (
      <Pressable
        onPress={add}
        style={({ pressed }) => [styles.add, { height }, pressed && styles.pressed]}>
        <Text style={[styles.addText, large && styles.largeText]}>Səbətə əlavə et</Text>
      </Pressable>
    );
  }

  return (
    <View style={styles.row}>
      <Pressable
        accessibilityLabel="Azalt"
        onPress={remove}
        style={({ pressed }) => [
          styles.minus,
          { height, width: height },
          pressed && styles.pressed,
        ]}>
        <Feather name="minus" size={large ? 20 : 16} color={colors.white} />
      </Pressable>
      <Pressable
        accessibilityLabel="Artır"
        onPress={add}
        style={({ pressed }) => [styles.plus, { height }, pressed && styles.pressed]}>
        <Feather name="plus" size={large ? 20 : 16} color={colors.white} />
        <Text style={[styles.addText, large && styles.largeText]}>
          1 {measureLabel(product.type)}
        </Text>
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
