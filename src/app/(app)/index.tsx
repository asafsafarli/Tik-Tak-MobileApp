import { StyleSheet, Text, View } from 'react-native';

import { Button } from '@/components/ui/Button';
import { colors, fonts, spacing } from '@/constants/theme';
import { useAuth } from '@/context/AuthContext';

// Temporary home screen until the real design is built.
export default function HomeScreen() {
  const { profile, logout } = useAuth();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Salam, {profile?.full_name} 👋</Text>
      <Text style={styles.subtitle}>{profile?.phone}</Text>
      <Button title="Çıxış" onPress={logout} style={styles.button} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: spacing.screen,
    backgroundColor: colors.background,
    gap: 8,
  },
  title: {
    color: colors.title,
    fontFamily: fonts.medium,
    fontSize: 22,
    textAlign: 'center',
  },
  subtitle: {
    color: colors.placeholder,
    fontFamily: fonts.regular,
    fontSize: 14,
    textAlign: 'center',
  },
  button: {
    marginTop: 24,
  },
});
