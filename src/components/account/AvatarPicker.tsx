import Feather from '@expo/vector-icons/Feather';
import { ActivityIndicator, Pressable, StyleSheet, View } from 'react-native';

import { colors } from '@/constants/theme';
import { useAuth } from '@/context/AuthContext';
import { useAvatarUpload } from '@/hooks/useAvatarUpload';

import { Avatar } from './Avatar';

const SIZE = 120;

export function AvatarPicker() {
  const { profile } = useAuth();
  const { pickAndUpload, uploading } = useAvatarUpload();

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel="Profil şəklini dəyiş"
      onPress={pickAndUpload}
      disabled={uploading}>
      <Avatar uri={profile?.img_url} size={SIZE} />
      {uploading && (
        <View style={styles.overlay}>
          <ActivityIndicator color={colors.white} />
        </View>
      )}
      <View style={styles.badge}>
        <Feather name="camera" size={16} color={colors.white} />
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFill,
    borderRadius: SIZE / 2,
    backgroundColor: 'rgba(0,0,0,0.35)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  badge: {
    position: 'absolute',
    right: 2,
    bottom: 2,
    width: 34,
    height: 34,
    borderRadius: 17,
    borderWidth: 3,
    borderColor: colors.white,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
