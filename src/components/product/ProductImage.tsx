import Feather from '@expo/vector-icons/Feather';
import { Image } from 'expo-image';
import { StyleSheet, View, type ImageStyle } from 'react-native';

import { colors } from '@/constants/theme';

export function ProductImage({ uri, style }: { uri: string | null; style: ImageStyle }) {
  if (!uri) {
    return (
      <View style={[style as object, styles.placeholder]}>
        <Feather name="image" size={28} color={colors.placeholder} />
      </View>
    );
  }
  return <Image source={uri} style={style} contentFit="contain" transition={200} />;
}

const styles = StyleSheet.create({
  placeholder: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
