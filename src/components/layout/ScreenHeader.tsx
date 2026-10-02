import Feather from '@expo/vector-icons/Feather';
import { router } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { colors, fonts, spacing } from '@/constants/theme';

interface ScreenHeaderProps {
  title: string;
  /** Defaults to going back one screen. */
  onBack?: () => void;
  showBack?: boolean;
}

export function ScreenHeader({ title, onBack, showBack = true }: ScreenHeaderProps) {
  return (
    <View style={styles.header}>
      {showBack && (
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Geri"
          hitSlop={12}
          onPress={onBack ?? (() => router.back())}
          style={styles.back}>
          <Feather name="arrow-left" size={24} color={colors.title} />
        </Pressable>
      )}
      <Text style={styles.title} numberOfLines={1}>
        {title}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    height: 56,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.screen + 36,
  },
  back: {
    position: 'absolute',
    left: spacing.screen - 4,
  },
  title: {
    color: colors.title,
    fontFamily: fonts.medium,
    fontSize: 18,
  },
});
