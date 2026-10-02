import { StyleSheet, Text, type TextStyle } from 'react-native';

import type { Product } from '@/api';
import { colors, fonts } from '@/constants/theme';
import { useBasketQuantity } from '@/hooks/useBasket';
import { formatPrice, measureLabel } from '@/utils/format';

export function ProductPrice({ product, style }: { product: Product; style?: TextStyle }) {
  const quantity = useBasketQuantity(product.id);

  if (quantity === 0) {
    return <Text style={[styles.price, style]}>{formatPrice(product.price)}</Text>;
  }

  return (
    <Text style={[styles.price, style]}>
      <Text style={styles.quantity}>
        {quantity} {measureLabel(product.type)}
      </Text>
      {' = '}
      {formatPrice(Number(product.price) * quantity)}
    </Text>
  );
}

const styles = StyleSheet.create({
  price: {
    color: colors.text,
    fontFamily: fonts.regular,
    fontSize: 13,
    textAlign: 'center',
  },
  quantity: {
    color: colors.danger,
    fontFamily: fonts.bold,
  },
});
