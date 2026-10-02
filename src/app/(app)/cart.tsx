import { StyleSheet, Text, View } from 'react-native';

import { colors, fonts } from '@/constants/theme';
import { useBasket } from '@/hooks/useBasket';
import { formatPrice } from '@/utils/format';

// Placeholder until the basket design is ready.
export default function CartScreen() {
  const { data: basket } = useBasket();

  return (
    <View style={styles.center}>
      <Text style={styles.text}>Səbət dizaynı tezliklə</Text>
      {basket && (
        <Text style={styles.text}>
          {basket.count} məhsul · {formatPrice(basket.total)}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  center: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 6 },
  text: { color: colors.muted, fontFamily: fonts.regular, fontSize: 14 },
});
