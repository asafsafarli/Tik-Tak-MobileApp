import Feather from '@expo/vector-icons/Feather';
import { StyleSheet, Text, View } from 'react-native';

import { colors, fonts } from '@/constants/theme';

export function EmptyState({ message }: { message: string }) {
  return (
    <View style={styles.container}>
      <View style={styles.outer}>
        <View style={styles.inner}>
          <Feather name="x" size={44} color={colors.white} />
        </View>
      </View>
      <Text style={styles.text}>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingTop: 40,
    gap: 28,
  },
  outer: {
    width: 130,
    height: 130,
    borderRadius: 65,
    backgroundColor: '#F4F4F6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inner: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: '#E2E2E6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: colors.placeholder,
    fontFamily: fonts.regular,
    fontSize: 13,
  },
});
