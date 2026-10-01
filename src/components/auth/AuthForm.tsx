import type { ReactNode } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { colors, fonts, spacing } from '@/constants/theme';

interface AuthFormProps {
  title: string;
  error?: string | null;
  /** Input fields */
  children: ReactNode;
  /** Submit button + switch link */
  footer: ReactNode;
}

/** Shared layout for the login and signup screens. */
export function AuthForm({ title, error, children, footer }: AuthFormProps) {
  return (
    <SafeAreaView style={styles.safe}>
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView
          contentContainerStyle={styles.content}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}>
          <Text style={styles.title}>{title}</Text>
          {children}
          <Text style={styles.error}>{error ?? ''}</Text>
          {footer}
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
    paddingTop: 110,
    paddingBottom: 24,
    gap: 16,
  },
  title: {
    color: colors.title,
    fontFamily: fonts.medium,
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 36,
  },
  error: {
    color: colors.error,
    fontFamily: fonts.regular,
    fontSize: 13,
    textAlign: 'center',
    minHeight: 34,
    marginTop: 4,
  },
});
