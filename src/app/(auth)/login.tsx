import { useState } from 'react';

import { toApiError } from '@/api';
import { AuthForm } from '@/components/auth/AuthForm';
import { AuthSwitchLink } from '@/components/auth/AuthSwitchLink';
import { Button } from '@/components/ui/Button';
import { TextField } from '@/components/ui/TextField';
import { useAuth } from '@/context/AuthContext';
import { isValidPhone, normalizePhone } from '@/utils/phone';

export default function LoginScreen() {
  const { login } = useAuth();
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const submit = async () => {
    if (!isValidPhone(phone)) return setError('Telefon nömrəsini düzgün daxil edin (məs. 050 123 45 67).');
    if (!password) return setError('Parolu daxil edin.');

    setError(null);
    setLoading(true);
    try {
      await login({ phone: normalizePhone(phone), password });
    } catch (e) {
      setError(toApiError(e).message);
      setLoading(false);
    }
  };

  return (
    <AuthForm
      title="Daxil ol"
      error={error}
      footer={
        <>
          <Button title="Daxil ol" onPress={submit} loading={loading} />
          <AuthSwitchLink text="Hesabınız yoxdursa" linkText="Qeydiyyatdan keç" href="/signup" />
        </>
      }>
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
        autoComplete="current-password"
        textContentType="password"
        returnKeyType="go"
        onSubmitEditing={submit}
      />
    </AuthForm>
  );
}
