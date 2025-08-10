import React, { memo } from 'react';
import { View, Image } from 'react-native';

import AppText from 'components/AppText';

import { styles } from './styles';

type Props = {
  name: string;
  symbol: string;
  image: string;
  price: number;
  change24h: number;
};

const CoinRow = ({
  name,
  symbol,
  image,
  price,
  change24h,
}: Props) => {
  const isNegative = change24h < 0;

  return (
    <View style={styles.row}>
      <View style={styles.left}>
        <Image source={{ uri: image }} style={styles.icon} />
        <View>
          <AppText variant="body">
            {name}
          </AppText>
          <AppText variant="caption" colorType="secondary">
            {symbol.toUpperCase()}
          </AppText>
        </View>
      </View>

      <View style={styles.right}>
        <AppText variant="body">{`$ ${price.toLocaleString()}`}</AppText>
        <AppText
          variant="caption"
          style={isNegative ? styles.negative : styles.positive}
        >
          {`${isNegative ? '' : '+'}${change24h?.toFixed(2)}%`}
        </AppText>
      </View>
    </View>
  );
}

export default memo(CoinRow);
