import { useState } from 'react';
import { Alert, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { profileService, toApiError, type UpdateProfilePayload } from '@/api';
import { ScreenHeader } from '@/components/layout/ScreenHeader';
import { Button } from '@/components/ui/Button';
import { TextField } from '@/components/ui/TextField';
import { colors, fonts, spacing } from '@/constants/theme';
import { useAuth } from '@/context/AuthContext';

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function AccountInfoScreen() {
  const { profile, setProfile } = useAuth();

  const [fullName, setFullName] = useState(profile?.full_name ?? '');
  const [address, setAddress] = useState(profile?.address ?? '');
  const [email, setEmail] = useState(profile?.email ?? '');
  const [password, setPassword] = useState('');
  const [passwordRepeat, setPasswordRepeat] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  const save = async () => {
    if (!fullName.trim()) return setError('Ad və soyadınızı daxil edin.');
    if (!address.trim()) return setError('Ünvanınızı daxil edin.');
    if (email.trim() && !EMAIL_PATTERN.test(email.trim())) return setError('E-mail düzgün deyil.');
    if (password || passwordRepeat) {
      if (password.length < 4) return setError('Şifrə ən azı 4 simvol olmalıdır.');
      if (password !== passwordRepeat) return setError('Şifrələr eyni deyil.');
    }

    const payload: UpdateProfilePayload = { full_name: fullName.trim(), address: address.trim() };
    if (email.trim()) payload.email = email.trim();
    if (password) {
      payload.password = password;
      payload.password_repeat = passwordRepeat;
    }

    setError(null);
    setSaving(true);
    try {
      setProfile(await profileService.update(payload));
      setPassword('');
      setPasswordRepeat('');
      Alert.alert('Yadda saxlanıldı', 'Hesab məlumatlarınız yeniləndi.');
    } catch (e) {
      setError(toApiError(e).message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <ScreenHeader title="Hesab" />
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView
          contentContainerStyle={styles.content}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}>
          <TextField
            label="Ad Soyad"
            placeholder="Ad, Soyad"
            value={fullName}
            onChangeText={setFullName}
            autoCapitalize="words"
          />
          <TextField label="Ünvan" placeholder="ünvan" value={address} onChangeText={setAddress} />
          <TextField
            label="Telefon nömrəsi"
            value={profile?.phone ?? ''}
            editable={false}
            style={styles.readOnly}
          />
          <TextField
            label="E-mail"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            autoComplete="email"
          />
          <TextField
            label="Şifrə"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            autoComplete="new-password"
            textContentType="newPassword"
          />
          <TextField
            label="Şifrənin təkrarı"
            value={passwordRepeat}
            onChangeText={setPasswordRepeat}
            secureTextEntry
            autoComplete="new-password"
            textContentType="newPassword"
          />

          <Text style={styles.error}>{error ?? ''}</Text>
          <Button title="Yadda saxla" onPress={save} loading={saving} />
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
  content: {
    paddingHorizontal: spacing.screen,
    paddingTop: 8,
    paddingBottom: 24,
    gap: 14,
  },
  readOnly: {
    color: colors.muted,
  },
  error: {
    color: colors.error,
    fontFamily: fonts.regular,
    fontSize: 13,
    textAlign: 'center',
    minHeight: 18,
  },
});
