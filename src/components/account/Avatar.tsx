import Ionicons from '@expo/vector-icons/Ionicons';
import { Image } from 'expo-image';
import { StyleSheet, View } from 'react-native';

const AVATAR_BACKGROUND = '#57607D';
const SILHOUETTE = '#E6E9EE';

export function Avatar({ uri, size = 120 }: { uri: string | null | undefined; size?: number }) {
  const shape = { width: size, height: size, borderRadius: size / 2 };

  if (uri) {
    return <Image source={uri} style={shape} contentFit="cover" transition={200} />;
  }

  return (
    <View style={[styles.placeholder, shape]}>
      <Ionicons name="person" size={size * 0.85} color={SILHOUETTE} style={{ marginBottom: -size * 0.18 }} />
    </View>
  );
}

const styles = StyleSheet.create({
  placeholder: {
    backgroundColor: AVATAR_BACKGROUND,
    alignItems: 'center',
    justifyContent: 'flex-end',
    overflow: 'hidden',
  },
});
