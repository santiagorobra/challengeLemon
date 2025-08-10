import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { useGetCoinsQuery } from 'services/coinGeckoApi';
import type { HomeFilters } from 'types/homeFilters';

const PER_PAGE = 50;
const DEBOUNCE_DELAY = 800;
const VS_CURRENCY = 'usd';

export function useHomeCoins(filters: HomeFilters) {
  const { query, sortDir, minPrice, maxPrice, variation } = filters;
  const [page, setPage] = useState(1);
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const {
    data = [],
    isLoading,
    isFetching,
    error,
  } = useGetCoinsQuery(
    {
      vs_currency: VS_CURRENCY,
      per_page: PER_PAGE,
      page,
      search: debouncedQuery || undefined,
      price_min: minPrice,
      price_max: maxPrice,
      variation: variation === 'all' ? undefined : variation,
    },
    {
      refetchOnReconnect: true,
    },
  );

  const sorted = useMemo(() => {
    return [...data].sort((a, b) => {
      const aVal = a.current_price;
      const bVal = b.current_price;
      return sortDir === 'asc' ? aVal - bVal : bVal - aVal;
    });
  }, [data, sortDir]);

  const loadingInitial = isLoading && isFetching && page === 1;
  const loadingNext = isLoading && isFetching && page > 1;
  const hasMore = Array.isArray(data) && data.length >= PER_PAGE;

  const refresh = useCallback(async (moreActions?: () => void) => {
    setPage(1);
    setDebouncedQuery('');
    moreActions?.();
  }, []);

  const loadMore = useCallback(() => {
    if (!loadingNext && hasMore) {
      setPage(p => p + 1);
    }
  }, [loadingNext, hasMore]);

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      setDebouncedQuery(query.trim().toLowerCase());
      setPage(1);
    }, DEBOUNCE_DELAY);
    return () => {
      debounceRef.current && clearTimeout(debounceRef.current);
    };
  }, [query]);

  return {
    data: sorted,
    loadingInitial,
    loadingNext,
    loadMore,
    refresh,
    error,
  };
}
