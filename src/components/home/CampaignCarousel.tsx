import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { useEffect, useRef, useState } from 'react';
import { FlatList, StyleSheet, Text, View, useWindowDimensions } from 'react-native';

import type { Campaign } from '@/api';
import { colors, fonts, radius, spacing } from '@/constants/theme';

const AUTO_SCROLL_MS = 4000;

export function CampaignCarousel({ campaigns }: { campaigns: Campaign[] }) {
  const { width: screenWidth } = useWindowDimensions();
  const width = screenWidth - spacing.screen * 2;
  const height = width / 2.15;

  const listRef = useRef<FlatList<Campaign>>(null);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (campaigns.length < 2) return;
    const timer = setTimeout(() => {
      const next = (index + 1) % campaigns.length;
      listRef.current?.scrollToOffset({ offset: next * width, animated: true });
    }, AUTO_SCROLL_MS);
    return () => clearTimeout(timer);
  }, [index, campaigns.length, width]);

  if (campaigns.length === 0) return null;

  return (
    <View>
      <FlatList
        ref={listRef}
        data={campaigns}
        keyExtractor={(item) => String(item.id)}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        style={[styles.list, { width, height }]}
        onMomentumScrollEnd={(e) => setIndex(Math.round(e.nativeEvent.contentOffset.x / width))}
        getItemLayout={(_, i) => ({ length: width, offset: width * i, index: i })}
        renderItem={({ item }) => (
          <View style={{ width, height }}>
            <Image source={item.img_url} style={StyleSheet.absoluteFill} contentFit="cover" transition={200} />
            <LinearGradient
              colors={['transparent', 'rgba(0,0,0,0.65)']}
              style={StyleSheet.absoluteFill}
            />
            <View style={styles.caption}>
              <Text style={styles.title} numberOfLines={2}>
                {item.title}
              </Text>
            </View>
          </View>
        )}
      />
      {campaigns.length > 1 && (
        <View style={styles.dots}>
          {campaigns.map((c, i) => (
            <View key={c.id} style={[styles.dot, i === index && styles.dotActive]} />
          ))}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  list: {
    borderRadius: radius.card,
    overflow: 'hidden',
    backgroundColor: colors.surface,
  },
  caption: {
    position: 'absolute',
    left: 16,
    right: 16,
    bottom: 14,
  },
  title: {
    color: colors.white,
    fontFamily: fonts.bold,
    fontSize: 20,
    textTransform: 'uppercase',
  },
  dots: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 6,
    marginTop: 10,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.border,
  },
  dotActive: {
    width: 16,
    backgroundColor: colors.primary,
  },
});
