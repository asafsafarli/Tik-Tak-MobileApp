import { router } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { colors, fonts, radius, spacing } from '@/constants/theme';
import { useBasket } from '@/hooks/useBasket';

export const BASKET_BAR_HEIGHT = 46;

/** Floating "② Sifarişlər   ₼ 15.70" bar shown while the basket has items. */
export function BasketBar() {
  const { data: basket } = useBasket();
  if (!basket || basket.count === 0) return null;

  return (
    <Pressable
      onPress={() => router.push('/cart')}
      style={({ pressed }) => [styles.bar, pressed && styles.pressed]}>
      <View style={styles.left}>
        <View style={styles.count}>
          <Text style={styles.countText}>{basket.count}</Text>
        </View>
        <Text style={styles.text}>Sifarişlər</Text>
      </View>
      <Text style={styles.text}>₼ {Number(basket.total).toFixed(2)}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  bar: {
    position: 'absolute',
    left: spacing.screen - 8,
    right: spacing.screen - 8,
    bottom: 10,
    height: BASKET_BAR_HEIGHT,
    borderRadius: radius.button,
    backgroundColor: colors.primary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 14,
  },
  pressed: {
    backgroundColor: colors.primaryPressed,
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  count: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  countText: {
    color: colors.primary,
    fontFamily: fonts.medium,
    fontSize: 12,
  },
  text: {
    color: colors.white,
    fontFamily: fonts.medium,
    fontSize: 15,
  },
});
