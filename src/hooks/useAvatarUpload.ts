import * as ImagePicker from 'expo-image-picker';
import { useState } from 'react';
import { Alert } from 'react-native';

import { profileService, toApiError, uploadService } from '@/api';
import { useAuth } from '@/context/AuthContext';

/** Pick a photo from the library, upload it and save it as the profile picture. */
export function useAvatarUpload() {
  const { profile, setProfile } = useAuth();
  const [uploading, setUploading] = useState(false);

  const pickAndUpload = async () => {
    if (!profile) return;
    // PUT /profile requires an address, so it must be filled in first.
    if (!profile.address) {
      Alert.alert('Ünvan lazımdır', 'Şəkli dəyişmək üçün əvvəlcə Hesab bölməsində ünvanınızı daxil edin.');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.7,
    });
    if (result.canceled) return;

    const asset = result.assets[0];
    setUploading(true);
    try {
      const url = await uploadService.upload({
        uri: asset.uri,
        name: asset.fileName ?? 'avatar.jpg',
        type: asset.mimeType ?? 'image/jpeg',
      });
      setProfile(
        await profileService.update({
          full_name: profile.full_name,
          address: profile.address,
          img_url: url,
        }),
      );
    } catch (e) {
      Alert.alert('Şəkil yüklənmədi', toApiError(e).message);
    } finally {
      setUploading(false);
    }
  };

  return { pickAndUpload, uploading };
}
