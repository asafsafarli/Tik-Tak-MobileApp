import { StyleSheet, Text, TextInput, View, type TextInputProps } from 'react-native';

import { colors, fonts, radius } from '@/constants/theme';

interface TextFieldProps extends TextInputProps {
  label: string;
  prefix?: string;
}

export function TextField({ label, prefix, style, ...inputProps }: TextFieldProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.field}>
        {!!prefix && <Text style={styles.prefix}>{prefix}</Text>}
        <TextInput
          placeholderTextColor={colors.placeholder}
          style={[styles.input, style]}
          {...inputProps}
        />
      </View>
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
  field: {
    height: 48,
    borderRadius: radius.input,
    backgroundColor: colors.inputBackground,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  prefix: {
    color: colors.text,
    fontFamily: fonts.regular,
    fontSize: 14,
  },
  input: {
    flex: 1,
    height: '100%',
    paddingHorizontal: 0,
    paddingVertical: 0,
    color: colors.text,
    fontFamily: fonts.regular,
    fontSize: 14,
  },
});
