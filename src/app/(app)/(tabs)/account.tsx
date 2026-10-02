import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AppHeader } from '@/components/layout/AppHeader';
import { Button } from '@/components/ui/Button';
import { colors, fonts, spacing } from '@/constants/theme';
import { useAuth } from '@/context/AuthContext';

// Placeholder until the account design is ready.
export default function AccountScreen() {
  const { profile, logout } = useAuth();

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <AppHeader />
      <View style={styles.content}>
        <Text style={styles.name}>{profile?.full_name}</Text>
        <Text style={styles.phone}>{profile?.phone}</Text>
        <Button title="Çıxış" onPress={logout} style={styles.button} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  content: { flex: 1, justifyContent: 'center', padding: spacing.screen, gap: 6 },
  name: { color: colors.title, fontFamily: fonts.medium, fontSize: 20, textAlign: 'center' },
  phone: { color: colors.muted, fontFamily: fonts.regular, fontSize: 14, textAlign: 'center' },
  button: { marginTop: 24 },
});
