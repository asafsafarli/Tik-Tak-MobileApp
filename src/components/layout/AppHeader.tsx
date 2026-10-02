import Feather from '@expo/vector-icons/Feather';
import { router } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { colors, fonts, spacing } from '@/constants/theme';
import { useBasketSummary } from '@/hooks/useBasket';

export function AppHeader() {
  const { count } = useBasketSummary();

  return (
    <View style={styles.header}>
      <Text style={styles.logo}>TIK TAK</Text>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel="Səbət"
        hitSlop={10}
        onPress={() => router.push('/cart')}>
        <Feather name="shopping-cart" size={24} color={colors.title} />
        {count > 0 && (
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{count > 99 ? '99+' : count}</Text>
          </View>
        )}
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    height: 52,
    paddingHorizontal: spacing.screen,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.background,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.border,
  },
  logo: {
    color: colors.title,
    fontFamily: fonts.bold,
    fontSize: 20,
    letterSpacing: 0.5,
  },
  badge: {
    position: 'absolute',
    top: -6,
    right: -8,
    minWidth: 17,
    height: 17,
    paddingHorizontal: 4,
    borderRadius: 9,
    backgroundColor: colors.danger,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeText: {
    color: colors.white,
    fontFamily: fonts.medium,
    fontSize: 10,
  },
});
