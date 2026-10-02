import { Link, type Href } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';

import { colors, fonts } from '@/constants/theme';

interface AuthSwitchLinkProps {
  text: string;
  linkText: string;
  href: Href;
}

export function AuthSwitchLink({ text, linkText, href }: AuthSwitchLinkProps) {
  return (
    <View style={styles.row}>
      <Text style={styles.text}>{text}</Text>
      <Link href={href} replace style={styles.link}>
        {linkText}
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 6,
  },
  text: {
    color: colors.text,
    fontFamily: fonts.regular,
    fontSize: 12,
  },
  link: {
    color: colors.primary,
    fontFamily: fonts.regular,
    fontSize: 12,
  },
});
