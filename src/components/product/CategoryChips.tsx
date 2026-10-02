import { useEffect, useRef, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, useWindowDimensions } from 'react-native';

import type { Category } from '@/api';
import { colors, fonts, spacing } from '@/constants/theme';

interface CategoryChipsProps {
  categories: Category[];
  selectedId?: number;
  onSelect: (id: number) => void;
}

export function CategoryChips({ categories, selectedId, onSelect }: CategoryChipsProps) {
  const { width: screenWidth } = useWindowDimensions();
  const scrollRef = useRef<ScrollView>(null);
  const layouts = useRef(new Map<number, { x: number; width: number }>());
  const [measured, setMeasured] = useState(0);

  useEffect(() => {
    if (selectedId == null) return;
    const chip = layouts.current.get(selectedId);
    if (!chip) return;
    const x = Math.max(0, chip.x + chip.width / 2 - screenWidth / 2);
    scrollRef.current?.scrollTo({ x, animated: true });
  }, [selectedId, measured, screenWidth]);

  return (
    <ScrollView
      ref={scrollRef}
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.content}>
      {categories.map((item) => {
        const active = item.id === selectedId;
        return (
          <Pressable
            key={item.id}
            onPress={() => onSelect(item.id)}
            onLayout={(e) => {
              const { x, width } = e.nativeEvent.layout;
              layouts.current.set(item.id, { x, width });
              if (item.id === selectedId) setMeasured((n) => n + 1);
            }}
            style={[styles.chip, active && styles.chipActive]}>
            <Text style={[styles.text, active && styles.textActive]}>{item.name}</Text>
          </Pressable>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: spacing.screen,
    gap: 8,
  },
  chip: {
    height: 32,
    paddingHorizontal: 14,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.border,
    justifyContent: 'center',
  },
  chipActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  text: {
    color: colors.muted,
    fontFamily: fonts.regular,
    fontSize: 13,
  },
  textActive: {
    color: colors.white,
  },
});
