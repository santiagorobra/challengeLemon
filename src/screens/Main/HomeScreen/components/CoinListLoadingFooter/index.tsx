import React from 'react';
import { View, ActivityIndicator } from 'react-native';

import { WHITE } from 'constants/colors';

import styles from './styles';

type Props = {
  loadingNext: boolean;
};

const CoinListLoadingFooter: React.FC<Props> = ({ loadingNext }) =>
  loadingNext ? (
    <View style={styles.container}>
      <ActivityIndicator size="large" color={WHITE} />
    </View>
  ) : null;

export default CoinListLoadingFooter;
