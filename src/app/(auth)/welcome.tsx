import { Image } from 'expo-image';
import { router } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AuthSwitchLink } from '@/components/auth/AuthSwitchLink';
import { Button } from '@/components/ui/Button';
import { colors, fonts, spacing } from '@/constants/theme';

export default function WelcomeScreen() {
  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.hero}>
        <Image
          source={require('@assets/images/apple.png')}
          style={styles.image}
          contentFit="contain"
        />
      </View>

      <View style={styles.bottom}>
        <Text style={styles.text}>
          Sizə daha əlçatan olması üçün qeydiyyatdan keçərək davam edə bilərsiniz 🥰
        </Text>
        <Button title="Qeydiyyat" onPress={() => router.push('/signup')} />
        <AuthSwitchLink text="Hesabınız varsa" linkText="Daxil olun" href="/login" />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: colors.background,
  },
  hero: {
    alignItems: 'center',
    paddingTop: 50,
    // The artwork leans right, so nudge it left like in the Figma frame.
    paddingRight: 48,
  },
  image: {
    width: 267,
    height: 247,
  },
  bottom: {
    paddingHorizontal: spacing.screen,
    marginTop: 64,
    gap: 16,
  },
  text: {
    color: colors.text,
    fontFamily: fonts.regular,
    fontSize: 12,
    lineHeight: 19,
    textAlign: 'center',
    paddingHorizontal: 16,
    marginBottom: 6,
  },
});
