import { StyleSheet, Text, View } from 'react-native';

import { colors, fonts, radius } from '@/constants/theme';
import { useAuth } from '@/context/AuthContext';

export function AddressCard() {
  const { profile } = useAuth();

  return (
    <View style={styles.card}>
      <Text style={styles.title}>Çatdırılma ünvanı:</Text>
      <Text style={styles.address} numberOfLines={1}>
        {profile?.address || 'Ünvan əlavə edilməyib'}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: radius.input,
    paddingHorizontal: 16,
    paddingVertical: 10,
    gap: 2,
  },
  title: {
    color: colors.title,
    fontFamily: fonts.medium,
    fontSize: 13,
  },
  address: {
    color: colors.muted,
    fontFamily: fonts.regular,
    fontSize: 12,
  },
});
