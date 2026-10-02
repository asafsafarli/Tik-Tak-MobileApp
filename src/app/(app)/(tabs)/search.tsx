import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AppHeader } from '@/components/layout/AppHeader';
import { colors, fonts } from '@/constants/theme';

// Placeholder until the search design is ready.
export default function SearchScreen() {
  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <AppHeader />
      <View style={styles.center}>
        <Text style={styles.text}>Axtarış səhifəsi tezliklə</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  text: { color: colors.muted, fontFamily: fonts.regular, fontSize: 14 },
});
