import { router } from 'expo-router';
import { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

import { toApiError, type PaymentMethod } from '@/api';
import { OrderTotals } from '@/components/basket/OrderTotals';
import { ScreenHeader } from '@/components/layout/ScreenHeader';
import { Button } from '@/components/ui/Button';
import { RadioOption } from '@/components/ui/RadioOption';
import { colors, fonts, radius, spacing } from '@/constants/theme';
import { useAuth } from '@/context/AuthContext';
import { useBasket } from '@/hooks/useBasket';
import { useCheckout } from '@/hooks/useOrders';
import { formatPrice, measureLabel } from '@/utils/format';
import { isValidPhone, normalizePhone } from '@/utils/phone';

export default function CheckoutScreen() {
  const { profile } = useAuth();
  const { data: basket } = useBasket();
  const checkout = useCheckout();
  const { bottom } = useSafeAreaInsets();

  const [address, setAddress] = useState(profile?.address ?? '');
  const [phone, setPhone] = useState(profile?.phone ?? '');
  const [note, setNote] = useState('');
  const [payment, setPayment] = useState<PaymentMethod>('CASH');
  const [error, setError] = useState<string | null>(null);

  const submit = () => {
    if (!address.trim()) return setError('Çatdırılma ünvanını daxil edin.');
    if (!isValidPhone(phone)) return setError('Telefon nömrəsini düzgün daxil edin.');

    setError(null);
    checkout.mutate(
      {
        paymentMethod: payment,
        address: address.trim(),
        phone: normalizePhone(phone),
        ...(note.trim() ? { note: note.trim() } : {}),
      },
      {
        onSuccess: () => router.replace('/order-success'),
        onError: (e) => setError(toApiError(e).message),
      },
    );
  };

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <ScreenHeader title="Sifarişi tamamla" />
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView
          contentContainerStyle={styles.scroll}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}>
          <View style={styles.form}>
            <View style={styles.field}>
              <Text style={styles.label}>Adınız</Text>
              <Text style={styles.value}>{profile?.full_name}</Text>
            </View>
            <View style={styles.field}>
              <Text style={styles.label}>Ünvanınız</Text>
              <TextInput
                value={address}
                onChangeText={setAddress}
                placeholder="Ünvanınızı daxil edin"
                placeholderTextColor={colors.placeholder}
                style={styles.input}
              />
            </View>
            <View style={styles.field}>
              <Text style={styles.label}>Telefon</Text>
              <TextInput
                value={phone}
                onChangeText={setPhone}
                placeholder="Telefon nömrəniz"
                placeholderTextColor={colors.placeholder}
                keyboardType="phone-pad"
                style={styles.input}
              />
            </View>
            <View style={styles.field}>
              <Text style={styles.label}>Əlavə qeydiniz</Text>
              <TextInput
                value={note}
                onChangeText={setNote}
                multiline
                textAlignVertical="top"
                style={styles.textarea}
              />
            </View>

            <View style={styles.payments}>
              <RadioOption
                label="Qapıda nağd"
                selected={payment === 'CASH'}
                onPress={() => setPayment('CASH')}
              />
              <RadioOption
                label="Qapıda kart"
                selected={payment === 'CARD'}
                onPress={() => setPayment('CARD')}
              />
            </View>
          </View>

          <View style={[styles.summary, { paddingBottom: bottom + 8 }]}>
            {basket?.items.map((item) => (
              <View key={item.id} style={styles.line}>
                <Text style={styles.lineText} numberOfLines={1}>
                  {item.quantity} x {item.product.title.trim()} 1 {measureLabel(item.product.type)}
                </Text>
                <Text style={styles.lineText}>{formatPrice(item.total_price)}</Text>
              </View>
            ))}
            <View style={styles.divider} />
            <OrderTotals total={basket?.total ?? 0} />
            {!!error && <Text style={styles.error}>{error}</Text>}
            <Button
              title="Sifarişi tamamla"
              onPress={submit}
              loading={checkout.isPending}
              disabled={!basket?.items.length}
              style={styles.button}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: colors.background,
  },
  flex: {
    flex: 1,
  },
  scroll: {
    flexGrow: 1,
    justifyContent: 'space-between',
  },
  form: {
    paddingHorizontal: spacing.screen,
    paddingTop: 12,
    gap: 18,
  },
  field: {
    gap: 6,
  },
  label: {
    color: colors.title,
    fontFamily: fonts.medium,
    fontSize: 14,
  },
  value: {
    color: colors.text,
    fontFamily: fonts.regular,
    fontSize: 12,
  },
  input: {
    color: colors.text,
    fontFamily: fonts.regular,
    fontSize: 12,
    paddingVertical: 2,
    paddingHorizontal: 0,
  },
  textarea: {
    height: 90,
    borderRadius: radius.input,
    backgroundColor: colors.inputBackground,
    padding: 12,
    color: colors.text,
    fontFamily: fonts.regular,
    fontSize: 13,
  },
  payments: {
    gap: 4,
  },
  summary: {
    marginTop: 28,
    marginHorizontal: 4,
    padding: spacing.screen - 4,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    backgroundColor: colors.surfaceAlt,
    gap: 14,
  },
  line: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  lineText: {
    color: colors.text,
    fontFamily: fonts.regular,
    fontSize: 12,
    flexShrink: 1,
  },
  divider: {
    height: 1,
    backgroundColor: '#ECECEC',
    marginTop: 12,
  },
  error: {
    color: colors.error,
    fontFamily: fonts.regular,
    fontSize: 13,
    textAlign: 'center',
  },
  button: {
    backgroundColor: colors.primaryLight,
  },
});
