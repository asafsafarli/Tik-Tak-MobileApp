import { Stack } from 'expo-router';

import { colors } from '@/constants/theme';

// Deep links to /account/orders still get the account screen underneath for "back".
export const unstable_settings = {
  initialRouteName: 'index',
};

export default function AccountLayout() {
  return (
    <Stack
      screenOptions={{ headerShown: false, contentStyle: { backgroundColor: colors.background } }}
    />
  );
}
