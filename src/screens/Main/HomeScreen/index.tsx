import React, { JSX, useCallback, useState } from 'react';
import { FlatList, RefreshControl } from 'react-native';

import BaseScreen from 'components/BaseScreen';
import ErrorComponent from 'components/ErrorComponent';
import { WHITE } from 'constants/colors';
import { useHomeCoins } from 'hooks/useHomeCoins';
import { HomeFilters } from 'types/homeFilters';
import { getErrorMessage } from 'utils/errors';

import Header from './components/Header';
import ListEmptyComponent from './components/ListEmptyComponent';
import ListFooterComponent from './components/ListFooterComponent';
import CoinRow from './components/CoinRow';
import styles from './styles';

const INITIAL_FILTERS: HomeFilters = {
  query: '',
  sortDir: 'desc',
  minPrice: undefined,
  maxPrice: undefined,
  variation: 'all',
};

function HomeScreen(): JSX.Element {
  const [filters, setFilters] = useState<HomeFilters>(INITIAL_FILTERS);

  const onChangeFilters = useCallback(
    (patch: Partial<HomeFilters>) =>
      setFilters(prev => ({ ...prev, ...patch })),
    [],
  );

  const {
    data,
    loadingInitial,
    loadingNext,
    loadMore,
    refresh,
    error,
  } = useHomeCoins(filters);

  if (error) {
    return (
      <ErrorComponent
        error={getErrorMessage(error)}
        onRefresh={() => {
          refresh(() => {
            setFilters(INITIAL_FILTERS);
          });
        }}
      />
    );
  }

  return (
    <BaseScreen>
      <Header filters={filters} onChange={onChangeFilters} />
      <FlatList
        data={data}
        keyExtractor={item => item.id}
        refreshing={loadingInitial}
        onRefresh={refresh}
        style={styles.container}
        showsVerticalScrollIndicator={false}
        indicatorStyle="white"
        refreshControl={
          <RefreshControl
            tintColor={WHITE}
            refreshing={loadingNext}
            onRefresh={refresh}
          />
        }
        renderItem={({ item }) => (
          <CoinRow
            name={item.name}
            symbol={item.symbol}
            image={item.image}
            price={item.current_price}
            change24h={item.price_change_percentage_24h}
          />
        )}
        onEndReachedThreshold={0.2}
        onEndReached={loadMore}
        removeClippedSubviews
        initialNumToRender={12}
        maxToRenderPerBatch={8}
        windowSize={7}
        updateCellsBatchingPeriod={50}
        ListEmptyComponent={
          <ListEmptyComponent loadingInitial={loadingInitial} />
        }
        ListFooterComponent={
          <ListFooterComponent loadingNext={loadingNext} />
        }
      />
    </BaseScreen>
  );
}

export default HomeScreen;
