import Feather from '@expo/vector-icons/Feather';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import type { BasketItem } from '@/api';
import { ProductImage } from '@/components/product/ProductImage';
import { colors, fonts, spacing } from '@/constants/theme';
import { useBasketActions } from '@/hooks/useBasket';
import { formatPrice, measureLabel } from '@/utils/format';

export function BasketItemRow({ item }: { item: BasketItem }) {
  const { product, quantity } = item;
  const { add, remove, removeAll } = useBasketActions(product);
  const isLast = quantity <= 1;

  return (
    <View style={styles.row}>
      <ProductImage uri={product.img_url} style={styles.image} />
      <View style={styles.info}>
        <Text style={styles.title} numberOfLines={2}>
          {product.title.trim()} 1 {measureLabel(product.type)}
        </Text>
        <Text style={styles.price}>{formatPrice(product.price)}</Text>
      </View>

      <View style={styles.stepper}>
        <Pressable
          accessibilityLabel={isLast ? 'Səbətdən sil' : 'Azalt'}
          onPress={isLast ? removeAll : remove}
          style={({ pressed }) => [styles.stepButton, pressed && styles.stepPressed]}>
          <Feather
            name={isLast ? 'trash-2' : 'minus'}
            size={isLast ? 15 : 18}
            color={colors.white}
          />
        </Pressable>
        <Text style={styles.quantity}>{quantity}</Text>
        <Pressable
          accessibilityLabel="Artır"
          onPress={add}
          style={({ pressed }) => [styles.stepButton, pressed && styles.stepPressed]}>
          <Feather name="plus" size={18} color={colors.white} />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.screen,
    paddingVertical: 14,
    gap: 16,
  },
  image: {
    width: 48,
    height: 44,
  },
  info: {
    flex: 1,
    gap: 3,
  },
  title: {
    color: colors.text,
    fontFamily: fonts.bold,
    fontSize: 14,
  },
  price: {
    color: colors.text,
    fontFamily: fonts.regular,
    fontSize: 12,
  },
  stepper: {
    width: 100,
    height: 34,
    borderRadius: 8,
    backgroundColor: colors.primaryLight,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 4,
  },
  stepButton: {
    width: 26,
    height: 26,
    borderRadius: 6,
    backgroundColor: 'rgba(255,255,255,0.35)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepPressed: {
    backgroundColor: 'rgba(255,255,255,0.55)',
  },
  quantity: {
    color: colors.white,
    fontFamily: fonts.regular,
    fontSize: 17,
  },
});
