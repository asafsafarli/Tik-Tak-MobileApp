import { useState } from 'react';

import { toApiError } from '@/api';
import { AuthForm } from '@/components/auth/AuthForm';
import { AuthSwitchLink } from '@/components/auth/AuthSwitchLink';
import { Button } from '@/components/ui/Button';
import { TextField } from '@/components/ui/TextField';
import { useAuth } from '@/context/AuthContext';
import { isValidPhone, normalizePhone } from '@/utils/phone';

export default function SignupScreen() {
  const { signup } = useAuth();
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const submit = async () => {
    if (!fullName.trim()) return setError('Ad və soyadınızı daxil edin.');
    if (!isValidPhone(phone)) return setError('Telefon nömrəsini düzgün daxil edin (məs. 050 123 45 67).');
    if (password.length < 4) return setError('Parol ən azı 4 simvol olmalıdır.');

    setError(null);
    setLoading(true);
    try {
      await signup({ full_name: fullName.trim(), phone: normalizePhone(phone), password });
    } catch (e) {
      setError(toApiError(e).message);
      setLoading(false);
    }
  };

  return (
    <AuthForm
      title="Qeydiyyatdan keç"
      error={error}
      footer={
        <>
          <Button title="Qeydiyyat" onPress={submit} loading={loading} />
          <AuthSwitchLink text="Hesabınız varsa" linkText="Daxil olun" href="/login" />
        </>
      }>
      <TextField
        label="Ad, soyad"
        placeholder="ad soyad"
        value={fullName}
        onChangeText={setFullName}
        autoCapitalize="words"
        autoComplete="name"
        textContentType="name"
      />
      <TextField
        label="Telefon"
        placeholder="telefon"
        value={phone}
        onChangeText={setPhone}
        keyboardType="phone-pad"
        autoComplete="tel"
        textContentType="telephoneNumber"
      />
      <TextField
        label="Parol"
        placeholder="parol"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        autoComplete="new-password"
        textContentType="newPassword"
        returnKeyType="go"
        onSubmitEditing={submit}
      />
    </AuthForm>
  );
}
