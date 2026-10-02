import Ionicons from '@expo/vector-icons/Ionicons';
import { useLocalSearchParams } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { AddToBasket } from '@/components/product/AddToBasket';
import { ProductImage } from '@/components/product/ProductImage';
import { ProductPrice } from '@/components/product/ProductPrice';
import { LoadingView } from '@/components/ui/LoadingView';
import { colors, fonts, spacing } from '@/constants/theme';
import { useProduct, useToggleFavorite } from '@/hooks/useCatalog';
import { measureLabel } from '@/utils/format';

export default function ProductSheet() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const productId = Number(id);
  const { data: product, isPending } = useProduct(productId);
  const toggleFavorite = useToggleFavorite(productId);
  const { bottom } = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingBottom: bottom + 16 }]}>
      {isPending || !product ? (
        <LoadingView />
      ) : (
        <>
          <Pressable
            accessibilityLabel={product.is_favorite ? 'Favorilərdən çıxar' : 'Favorilərə əlavə et'}
            hitSlop={12}
            onPress={() => toggleFavorite.mutate()}
            style={styles.favorite}>
            <Ionicons
              name={product.is_favorite ? 'heart' : 'heart-outline'}
              size={26}
              color={product.is_favorite ? colors.primary : colors.title}
            />
          </Pressable>

          <ProductImage uri={product.img_url} style={styles.image} />

          <Text style={styles.title}>
            {product.title.trim()} 1 {measureLabel(product.type)}
          </Text>
          {!!product.description && <Text style={styles.description}>{product.description}</Text>}

          <ProductPrice product={product} style={styles.price} />

          <View style={styles.action}>
            <AddToBasket product={product} size="large" />
          </View>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: spacing.screen + 16,
    paddingTop: 36,
    alignItems: 'center',
    backgroundColor: colors.background,
  },
  favorite: {
    position: 'absolute',
    top: 24,
    right: spacing.screen,
    zIndex: 1,
  },
  image: {
    width: '80%',
    height: 180,
    marginBottom: 20,
  },
  title: {
    color: colors.title,
    fontFamily: fonts.bold,
    fontSize: 17,
    textAlign: 'center',
  },
  description: {
    color: colors.muted,
    fontFamily: fonts.regular,
    fontSize: 13,
    lineHeight: 19,
    textAlign: 'center',
    marginTop: 8,
  },
  price: {
    fontFamily: fonts.bold,
    fontSize: 18,
    marginTop: 24,
  },
  action: {
    alignSelf: 'stretch',
    marginTop: 22,
    paddingHorizontal: 20,
  },
});
