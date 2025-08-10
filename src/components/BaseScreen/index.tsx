import React from 'react';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import styles from './styles';

type Props = {
  children: React.ReactNode;
};

function BaseScreen({ children }: Props) {
  return (
    <>
      <SafeAreaView style={styles.safeArea} edges={['top']} />
      <View style={styles.container}>{children}</View>
    </>
  );
}

export default BaseScreen;
