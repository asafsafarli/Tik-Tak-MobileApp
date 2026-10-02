import { router } from 'expo-router';
import { memo } from 'react';
import { Pressable, StyleSheet, Text, View, useWindowDimensions } from 'react-native';

import type { Product } from '@/api';
import { colors, fonts, radius, shadow, spacing } from '@/constants/theme';
import { measureLabel } from '@/utils/format';

import { AddToBasket } from './AddToBasket';
import { ProductImage } from './ProductImage';
import { ProductPrice } from './ProductPrice';

export const PRODUCT_GRID_GAP = 12;

export const ProductCard = memo(function ProductCard({ product }: { product: Product }) {
  const { width } = useWindowDimensions();
  const cardWidth = (width - spacing.screen * 2 - PRODUCT_GRID_GAP) / 2;

  return (
    <View style={[styles.card, { width: cardWidth }]}>
      <Pressable
        onPress={() => router.push({ pathname: '/product/[id]', params: { id: product.id } })}
        style={({ pressed }) => [styles.body, pressed && styles.pressed]}>
        <ProductImage uri={product.img_url} style={styles.image} />
        <Text style={styles.title} numberOfLines={1}>
          {product.title.trim()}
        </Text>
        <Text style={styles.unit}>1 {measureLabel(product.type)}</Text>
        <ProductPrice product={product} style={styles.price} />
      </Pressable>
      <AddToBasket product={product} />
    </View>
  );
});

const styles = StyleSheet.create({
  card: {
    borderRadius: radius.card,
    backgroundColor: colors.background,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 12,
    gap: 8,
    ...shadow,
  },
  body: {
    alignItems: 'center',
  },
  pressed: {
    opacity: 0.7,
  },
  image: {
    width: '100%',
    height: 90,
    marginBottom: 10,
  },
  title: {
    color: colors.title,
    fontFamily: fonts.bold,
    fontSize: 13,
    textAlign: 'center',
  },
  unit: {
    color: colors.title,
    fontFamily: fonts.bold,
    fontSize: 13,
  },
  price: {
    marginTop: 4,
  },
});
