import type { ReactNode } from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';

import { colors, fonts, spacing } from '@/constants/theme';

interface MenuItemProps {
  icon: ReactNode;
  label: string;
  onPress: () => void;
}

export function MenuItem({ icon, label, onPress }: MenuItemProps) {
  return (
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      style={({ pressed }) => [styles.row, pressed && styles.pressed]}>
      {icon}
      <Text style={styles.label}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 24,
    paddingHorizontal: spacing.screen,
    paddingVertical: 13,
  },
  pressed: {
    backgroundColor: colors.surface,
  },
  label: {
    color: colors.title,
    fontFamily: fonts.regular,
    fontSize: 14,
  },
});
