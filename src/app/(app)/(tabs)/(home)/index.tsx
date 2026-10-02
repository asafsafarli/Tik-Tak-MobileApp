import { useMemo } from 'react';
import { RefreshControl, ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AddressCard } from '@/components/home/AddressCard';
import { CampaignCarousel } from '@/components/home/CampaignCarousel';
import { CategoryCard } from '@/components/home/CategoryCard';
import { AppHeader } from '@/components/layout/AppHeader';
import { BasketBar, BASKET_BAR_HEIGHT } from '@/components/product/BasketBar';
import { LoadingView } from '@/components/ui/LoadingView';
import { colors, spacing } from '@/constants/theme';
import { useCampaigns, useCategories } from '@/hooks/useCatalog';

const COLUMNS = 3;

export default function HomeScreen() {
  const categories = useCategories();
  const campaigns = useCampaigns();

  const refreshing = categories.isRefetching || campaigns.isRefetching;
  const refresh = () => {
    categories.refetch();
    campaigns.refetch();
  };

  const rows = useMemo(() => chunk(categories.data ?? [], COLUMNS), [categories.data]);

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <AppHeader />
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={refresh} tintColor={colors.primary} />
        }>
        <AddressCard />
        <CampaignCarousel campaigns={campaigns.data ?? []} />

        {categories.isPending ? (
          <LoadingView />
        ) : (
          <View style={styles.grid}>
            {rows.map((row, i) => (
              <View key={i} style={styles.row}>
                {row.map((category) => (
                  <CategoryCard key={category.id} category={category} />
                ))}
                {Array.from({ length: COLUMNS - row.length }, (_, k) => (
                  <View key={`spacer-${k}`} style={styles.spacer} />
                ))}
              </View>
            ))}
          </View>
        )}
      </ScrollView>
      <BasketBar />
    </SafeAreaView>
  );
}

function chunk<T>(items: T[], size: number): T[][] {
  const out: T[][] = [];
  for (let i = 0; i < items.length; i += size) out.push(items.slice(i, i + size));
  return out;
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    padding: spacing.screen,
    paddingBottom: spacing.screen + BASKET_BAR_HEIGHT + 10,
    gap: 16,
  },
  grid: {
    gap: 12,
  },
  row: {
    flexDirection: 'row',
    gap: 12,
  },
  spacer: {
    flex: 1,
  },
});
