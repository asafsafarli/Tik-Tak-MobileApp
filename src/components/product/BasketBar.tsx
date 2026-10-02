import { router } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { colors, fonts, radius, spacing } from '@/constants/theme';
import { useBasketSummary } from '@/hooks/useBasket';

export const BASKET_BAR_HEIGHT = 46;

export function BasketBar() {
  const { count, total } = useBasketSummary();
  if (count === 0) return null;

  return (
    <Pressable
      onPress={() => router.push('/cart')}
      style={({ pressed }) => [styles.bar, pressed && styles.pressed]}>
      <View style={styles.left}>
        <View style={styles.count}>
          <Text style={styles.countText}>{count}</Text>
        </View>
        <Text style={styles.text}>Sifarişlər</Text>
      </View>
      <Text style={styles.text}>₼ {Number(total).toFixed(2)}</Text>
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
