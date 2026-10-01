import { StyleSheet, Text, TextInput, View, type TextInputProps } from 'react-native';

import { colors, fonts, radius } from '@/constants/theme';

interface TextFieldProps extends TextInputProps {
  label: string;
}

export function TextField({ label, style, ...inputProps }: TextFieldProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        placeholderTextColor={colors.placeholder}
        style={[styles.input, style]}
        {...inputProps}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 8,
  },
  label: {
    color: colors.label,
    fontFamily: fonts.regular,
    fontSize: 14,
  },
  input: {
    height: 48,
    borderRadius: radius.input,
    backgroundColor: colors.inputBackground,
    paddingHorizontal: 20,
    color: colors.text,
    fontFamily: fonts.regular,
    fontSize: 14,
  },
});
