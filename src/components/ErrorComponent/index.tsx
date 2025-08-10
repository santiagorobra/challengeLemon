import React from 'react';
import { View } from 'react-native';

import AppButton from 'components/AppButton';
import AppText from 'components/AppText';
import { STRINGS } from 'constants/strings';

import styles from './styles';

type Props = {
  error: string;
  onRefresh?: () => void;
}

const ErrorComponent = ({ error, onRefresh }: Props) => (
  <View style={styles.center}>
    <AppText colorType="error" style={styles.error}>
      {error}
    </AppText>
    <AppButton
      variant="primary"
      title={STRINGS.GENERIC.RETRY}
      onPress={onRefresh ?? (() => {})}
    />
  </View>
);

export default ErrorComponent;
