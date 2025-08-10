import React from 'react';

import BaseScreen from 'components/BaseScreen';
import AppText from 'components/AppText';
import { STRINGS } from 'constants/strings';

import styles from './styles';

function HomeScreen() {
  return (
    <BaseScreen>
      <AppText variant="title" style={styles.title}>
        {STRINGS.HOME.TITLE}
      </AppText>
    </BaseScreen>
  );
}

export default HomeScreen;
