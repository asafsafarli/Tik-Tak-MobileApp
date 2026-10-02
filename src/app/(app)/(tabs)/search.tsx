import Feather from '@expo/vector-icons/Feather';
import { useState } from 'react';
import { FlatList, Pressable, StyleSheet, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AppHeader } from '@/components/layout/AppHeader';
import { BasketBar, BASKET_BAR_HEIGHT } from '@/components/product/BasketBar';
import { SearchResultItem } from '@/components/product/SearchResultItem';
import { EmptyState } from '@/components/ui/EmptyState';
import { LoadingView } from '@/components/ui/LoadingView';
import { colors, fonts, radius, spacing } from '@/constants/theme';
import { useProducts } from '@/hooks/useCatalog';
import { useDebouncedValue } from '@/hooks/useDebouncedValue';

export default function SearchScreen() {
  const [query, setQuery] = useState('');
  const search = useDebouncedValue(query.trim());
  const hasSearch = search.length > 0;

  const { products, isFetching, isFetchingNextPage, fetchNextPage, hasNextPage } = useProducts(
    { search },
    { enabled: hasSearch },
  );

  const renderEmpty = () => {
    if (!hasSearch) return null;
    if (isFetching) return <LoadingView />;
    return <EmptyState message="Axtarışınıza uyğun məhsul tapılmadı" />;
  };

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <AppHeader />

      <View style={styles.inputWrap}>
        <TextInput
          value={query}
          onChangeText={setQuery}
          placeholder="Məhsul axtar"
          placeholderTextColor={colors.placeholder}
          style={styles.input}
          returnKeyType="search"
          autoCorrect={false}
          clearButtonMode="never"
        />
        {query.length > 0 && (
          <Pressable
            accessibilityLabel="Təmizlə"
            hitSlop={10}
            onPress={() => setQuery('')}
            style={styles.clear}>
            <Feather name="x" size={18} color={colors.muted} />
          </Pressable>
        )}
      </View>

      <FlatList
        data={hasSearch ? products : []}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => <SearchResultItem product={item} />}
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="on-drag"
        contentContainerStyle={styles.list}
        onEndReached={() => hasNextPage && !isFetchingNextPage && fetchNextPage()}
        onEndReachedThreshold={0.5}
        ListEmptyComponent={renderEmpty}
        ListFooterComponent={isFetchingNextPage ? <LoadingView /> : null}
      />

      <BasketBar />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: colors.background,
  },
  inputWrap: {
    marginHorizontal: spacing.screen - 8,
    marginTop: 18,
    marginBottom: 20,
    justifyContent: 'center',
  },
  input: {
    height: 48,
    borderRadius: radius.button,
    backgroundColor: colors.inputBackground,
    paddingLeft: 20,
    paddingRight: 44,
    color: colors.text,
    fontFamily: fonts.regular,
    fontSize: 15,
  },
  clear: {
    position: 'absolute',
    right: 16,
  },
  list: {
    paddingBottom: spacing.screen + BASKET_BAR_HEIGHT + 10,
  },
});
