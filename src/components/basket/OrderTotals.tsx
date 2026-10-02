import { StyleSheet, Text, View } from 'react-native';

import { colors, fonts } from '@/constants/theme';
import { formatPrice } from '@/utils/format';

export function OrderTotals({
  total,
  deliveryFee = 0,
}: {
  total: string | number;
  deliveryFee?: number;
}) {
  const final = Number(total) + deliveryFee;

  return (
    <View style={styles.row}>
      <View style={styles.left}>
        <Text style={styles.small}>Ümumi: {formatPrice(total)}</Text>
        <Text style={styles.small}>
          Çatdırılma: {deliveryFee > 0 ? formatPrice(deliveryFee) : 'Pulsuz'}
        </Text>
      </View>
      <View>
        <Text style={styles.bold}>Yekun məbləğ:</Text>
        <Text style={styles.bold}>{formatPrice(final)}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  left: {
    gap: 4,
    paddingTop: 2,
  },
  small: {
    color: colors.text,
    fontFamily: fonts.regular,
    fontSize: 12,
  },
  bold: {
    color: colors.text,
    fontFamily: fonts.bold,
    fontSize: 14,
    lineHeight: 20,
  },
});
