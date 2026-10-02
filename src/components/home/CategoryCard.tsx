import { Image } from 'expo-image';
import { router } from 'expo-router';
import { memo } from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';

import type { Category } from '@/api';
import { colors, fonts, radius, shadow } from '@/constants/theme';

export const CategoryCard = memo(function CategoryCard({ category }: { category: Category }) {
  return (
    <Pressable
      onPress={() => router.push({ pathname: '/products', params: { categoryId: category.id } })}
      style={({ pressed }) => [styles.card, pressed && styles.pressed]}>
      <Image
        source={category.img_url}
        style={styles.image}
        contentFit="contain"
        transition={150}
        cachePolicy="memory-disk"
      />
      <Text style={styles.name} numberOfLines={2}>
        {category.name}
      </Text>
    </Pressable>
  );
});

const styles = StyleSheet.create({
  card: {
    flex: 1,
    aspectRatio: 1,
    borderRadius: radius.card,
    backgroundColor: colors.background,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
    gap: 6,
    ...shadow,
  },
  pressed: {
    opacity: 0.7,
  },
  image: {
    width: '70%',
    height: 48,
  },
  name: {
    color: colors.text,
    fontFamily: fonts.regular,
    fontSize: 12,
    textAlign: 'center',
  },
});
