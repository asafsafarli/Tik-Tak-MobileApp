import Feather from '@expo/vector-icons/Feather';
import { router } from 'expo-router';
import { useCallback, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ScreenHeader } from '@/components/layout/ScreenHeader';
import { colors, fonts, spacing } from '@/constants/theme';

const REDIRECT_DELAY_MS = 3000;

export default function OrderSuccessScreen() {
  const goToOrders = useCallback(() => {
    router.dismissAll();
    router.navigate('/account/orders');
  }, []);

  useEffect(() => {
    const timer = setTimeout(goToOrders, REDIRECT_DELAY_MS);
    return () => clearTimeout(timer);
  }, [goToOrders]);

  return (
    <SafeAreaView style={styles.safe}>
      <ScreenHeader title="Sifarişi tamamla" onBack={goToOrders} />
      <View style={styles.content}>
        <View style={styles.ring}>
          <View style={styles.circle}>
            <Feather name="check" size={58} color={colors.white} />
          </View>
        </View>
        <Text style={styles.title}>Sifariş uğurla tamamlandı</Text>
        <Text style={styles.subtitle}>
          Əməkdaşlarımız sizinlə əlaqə saxlayıb sifarişinizi göndərəcəklər.
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    alignItems: 'center',
    paddingHorizontal: spacing.screen * 2,
    paddingTop: 90,
  },
  ring: {
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: '#F2F9EC',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 44,
  },
  circle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    color: colors.text,
    fontFamily: fonts.medium,
    fontSize: 17,
    textAlign: 'center',
  },
  subtitle: {
    color: colors.text,
    fontFamily: fonts.regular,
    fontSize: 13,
    lineHeight: 19,
    textAlign: 'center',
    marginTop: 8,
  },
});
