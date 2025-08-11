import React from 'react';
import { View, Image, TouchableOpacity } from 'react-native';

import AppText from 'components/AppText';
import { PickerItem } from 'types/currencyPickerModal';

import styles from './styles';

type Props = {
  item: PickerItem;
  showPrice?: boolean;
  onSelect: (item: PickerItem) => void;
};

const CurrencyPickerItem: React.FC<Props> = ({ item, showPrice, onSelect }) => (
  <TouchableOpacity style={styles.row} onPress={() => onSelect(item)}>
    {item.image ? (
      <Image source={{ uri: item.image }} style={styles.icon} />
    ) : (
      <View style={[styles.icon, styles.iconFallback]}>
        <AppText>{item.symbol?.[0]}</AppText>
      </View>
    )}
    <View style={styles.flex}>
      <AppText variant="body">{item.name}</AppText>
      <AppText variant="caption" colorType="secondary">
        {item.symbol}
      </AppText>
    </View>
    {showPrice && (
      <View style={styles.priceBox}>
        {typeof item.price === 'number' && (
          <AppText variant="body">${item.price.toLocaleString()}</AppText>
        )}
        {typeof item.change24h === 'number' && (
          <AppText
            variant="caption"
            colorType={item.change24h >= 0 ? 'success' : 'error'}
            style={styles.change}
          >
            {item.change24h >= 0 ? '+' : ''}
            {item.change24h.toFixed(2)}%
          </AppText>
        )}
      </View>
    )}
  </TouchableOpacity>
);

export default CurrencyPickerItem;
