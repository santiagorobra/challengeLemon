import React from 'react';
import { View } from 'react-native';

import AppText from 'components/AppText';
import AppButton from 'components/AppButton';
import AppTextInput from 'components/AppTextInput';
import { STRINGS } from 'constants/strings';
import { HomeFilters } from 'types/homeFilters';

import styles from './styles';

type Props = {
  filters: HomeFilters;
  onChange: (patch: Partial<HomeFilters>) => void;
};

export default function Header({ filters, onChange }: Props) {
  const { query, sortDir, minPrice, maxPrice, variation } = filters;

  const changeNumber = (v: string, key: 'minPrice' | 'maxPrice') => {
    let value = (v ?? '').trim().replace(',', '.');

    if (value === '') {
      onChange({ [key]: undefined });
      return;
    }

    onChange({ [key]: value });
  };

  return (
    <View style={styles.header}>
      <AppText variant="title">{STRINGS.HOME.TITLE}</AppText>
      <AppTextInput
        placeholder={STRINGS.HOME.SEARCH}
        value={query}
        onChangeText={t => onChange({ query: t })}
        style={styles.searchInput}
      />
      <View style={styles.sortBar}>
        <AppButton
          title={
            variation === 'all'
              ? STRINGS.HOME.VARIATION_ACTION.ALL
              : variation === 'positive'
              ? STRINGS.HOME.VARIATION_ACTION.POSITIVE
              : STRINGS.HOME.VARIATION_ACTION.NEGATIVE
          }
          onPress={() =>
            onChange({
              variation:
                variation === 'all'
                  ? 'positive'
                  : variation === 'positive'
                  ? 'negative'
                  : 'all',
            })
          }
          variant="outline"
          style={styles.flex}
        />
        <AppButton
          title={
            sortDir === 'asc'
              ? STRINGS.HOME.SORT_ASC_ACTION
              : STRINGS.HOME.SORT_DESC_ACTION
          }
          onPress={() =>
            onChange({ sortDir: sortDir === 'asc' ? 'desc' : 'asc' })
          }
          variant="outline"
          style={styles.flex}
        />
      </View>

      <View style={styles.filtersRow}>
        <AppTextInput
          keyboardType="numeric"
          placeholder={STRINGS.HOME.MIN_PRICE}
          value={minPrice?.toString()}
          onChangeText={t => changeNumber(t, 'minPrice')}
          style={styles.flex}
        />
        <AppTextInput
          keyboardType="numeric"
          placeholder={STRINGS.HOME.MAX_PRICE}
          value={maxPrice?.toString()}
          onChangeText={t => changeNumber(t, 'maxPrice')}
          style={styles.flex}
        />
      </View>
    </View>
  );
}
