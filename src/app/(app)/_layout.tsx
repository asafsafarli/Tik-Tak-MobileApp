import { Stack } from 'expo-router';

import { colors, fonts } from '@/constants/theme';

export default function AppLayout() {
  return (
    <Stack screenOptions={{ headerShown: false, contentStyle: { backgroundColor: colors.background } }}>
      <Stack.Screen name="(tabs)" />
      <Stack.Screen
        name="product/[id]"
        options={{
          presentation: 'formSheet',
          sheetAllowedDetents: 'fitToContents',
          sheetGrabberVisible: true,
          sheetCornerRadius: 24,
        }}
      />
      <Stack.Screen
        name="cart"
        options={{
          headerShown: true,
          title: 'Səbət',
          headerBackTitle: 'Geri',
          headerTintColor: colors.title,
          headerTitleStyle: { fontFamily: fonts.medium },
        }}
      />
    </Stack>
  );
}
