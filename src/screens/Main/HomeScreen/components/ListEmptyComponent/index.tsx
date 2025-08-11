import React from 'react';
import { View, ActivityIndicator } from 'react-native';

import AppText from 'components/AppText';
import { STRINGS } from 'constants/strings';
import { WHITE } from 'constants/colors';

import styles from './styles';

type Props = {
  loadingInitial: boolean;
};

const ListEmptyComponent: React.FC<Props> = ({ loadingInitial }) =>
  loadingInitial ? (
    <View style={styles.center}>
      <ActivityIndicator size="large" color={WHITE} />
      <AppText>{STRINGS.HOME.LOADING}</AppText>
    </View>
  ) : (
    <View style={styles.center}>
      <AppText variant="subtitle" colorType="secondary">
        {STRINGS.HOME.EMPTY}
      </AppText>
    </View>
  );

export default ListEmptyComponent;
