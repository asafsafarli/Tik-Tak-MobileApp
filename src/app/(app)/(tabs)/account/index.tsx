import Feather from '@expo/vector-icons/Feather';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { router } from 'expo-router';
import { Alert, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AvatarPicker } from '@/components/account/AvatarPicker';
import { MenuItem } from '@/components/account/MenuItem';
import { ScreenHeader } from '@/components/layout/ScreenHeader';
import { colors, fonts } from '@/constants/theme';
import { useAuth } from '@/context/AuthContext';

const ICON_SIZE = 22;

export default function AccountScreen() {
  const { profile, logout } = useAuth();

  const confirmLogout = () =>
    Alert.alert('Çıxış', 'Hesabdan çıxmaq istədiyinizə əminsiniz?', [
      { text: 'Ləğv et', style: 'cancel' },
      { text: 'Çıxış', style: 'destructive', onPress: logout },
    ]);

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <ScreenHeader title="Hesabım" showBack={false} />
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.profile}>
          <AvatarPicker />
          <Text style={styles.name}>{profile?.full_name}</Text>
          <Text style={styles.phone}>{profile?.phone}</Text>
        </View>

        <MenuItem
          label="Hesab məlumatlarım"
          icon={
            <MaterialCommunityIcons
              name="card-account-details-outline"
              size={ICON_SIZE}
              color={colors.title}
            />
          }
          onPress={() => router.push('/account/info')}
        />
        <MenuItem
          label="Siyahılarım"
          icon={<Feather name="heart" size={ICON_SIZE} color={colors.title} />}
          onPress={() => router.push('/account/favorites')}
        />
        <MenuItem
          label="Sifariş tarixçəsi"
          icon={<Feather name="clock" size={ICON_SIZE} color={colors.title} />}
          onPress={() => router.push('/account/orders')}
        />
        <MenuItem
          label="Çıxış"
          icon={<Feather name="log-out" size={ICON_SIZE} color={colors.title} />}
          onPress={confirmLogout}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    paddingBottom: 24,
  },
  profile: {
    alignItems: 'center',
    paddingTop: 12,
    paddingBottom: 28,
  },
  name: {
    color: colors.title,
    fontFamily: fonts.medium,
    fontSize: 15,
    marginTop: 18,
  },
  phone: {
    color: colors.muted,
    fontFamily: fonts.regular,
    fontSize: 12,
    marginTop: 4,
  },
});
