import { router } from 'expo-router';
import { memo } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import type { Product } from '@/api';
import { colors, fonts, spacing } from '@/constants/theme';
import { measureLabel } from '@/utils/format';

import { ProductImage } from './ProductImage';
import { ProductPrice } from './ProductPrice';

export const SearchResultItem = memo(function SearchResultItem({ product }: { product: Product }) {
  return (
    <Pressable
      onPress={() => router.push({ pathname: '/product/[id]', params: { id: product.id } })}
      style={({ pressed }) => [styles.row, pressed && styles.pressed]}>
      <ProductImage uri={product.img_url} style={styles.image} />
      <View style={styles.info}>
        <Text style={styles.title} numberOfLines={2}>
          {product.title.trim()} 1 {measureLabel(product.type)}
        </Text>
        <ProductPrice product={product} style={styles.price} />
      </View>
    </Pressable>
  );
});

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.screen,
    paddingVertical: 10,
    gap: 28,
  },
  pressed: {
    backgroundColor: colors.surface,
  },
  image: {
    width: 60,
    height: 56,
  },
  info: {
    flex: 1,
    gap: 2,
  },
  title: {
    color: colors.title,
    fontFamily: fonts.bold,
    fontSize: 13,
  },
  price: {
    textAlign: 'left',
  },
});
