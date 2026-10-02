import Feather from '@expo/vector-icons/Feather';
import { router } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AppHeader } from '@/components/layout/AppHeader';
import { Button } from '@/components/ui/Button';
import { colors, fonts, radius, spacing } from '@/constants/theme';
import { useAuth } from '@/context/AuthContext';

// Temporary layout until the account design is ready.
export default function AccountScreen() {
  const { profile, logout } = useAuth();

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <AppHeader />
      <View style={styles.content}>
        <View style={styles.profile}>
          <Text style={styles.name}>{profile?.full_name}</Text>
          <Text style={styles.phone}>{profile?.phone}</Text>
        </View>

        <Pressable
          onPress={() => router.push('/account/orders')}
          style={({ pressed }) => [styles.row, pressed && styles.rowPressed]}>
          <Feather name="package" size={20} color={colors.title} />
          <Text style={styles.rowText}>Sifarişlərim</Text>
          <Feather name="chevron-right" size={20} color={colors.muted} />
        </Pressable>

        <Button title="Çıxış" onPress={logout} style={styles.logout} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  content: { padding: spacing.screen, gap: 16 },
  profile: { alignItems: 'center', gap: 4, paddingVertical: 16 },
  name: { color: colors.title, fontFamily: fonts.medium, fontSize: 20 },
  phone: { color: colors.muted, fontFamily: fonts.regular, fontSize: 14 },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    height: 52,
    paddingHorizontal: 16,
    borderRadius: radius.input,
    backgroundColor: colors.surface,
  },
  rowPressed: { opacity: 0.7 },
  rowText: { flex: 1, color: colors.title, fontFamily: fonts.regular, fontSize: 15 },
  logout: { marginTop: 16 },
});
