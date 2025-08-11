import React, { JSX } from 'react';
import { SectionList, StyleSheet, View } from 'react-native';
import { Camera } from 'react-native-vision-camera';

import BaseScreen from 'components/BaseScreen';
import AppText from 'components/AppText';
import { STRINGS } from 'constants/strings';
import { useWalletScanner } from 'hooks/useWalletScanner';

import HistoryRow from './components/HistoryRow';
import ScannerHeader from './components/ScannerHeader';
import styles from './styles';

function ScannerScreen(): JSX.Element {
  const {
    device,
    hasPermission,
    validatePermission,
    codeScanner,
    error,
    isScanning,
    scan,
    success,
    sections,
  } = useWalletScanner();

  if (isScanning && device) {
    return (
      <Camera
        style={StyleSheet.absoluteFill}
        device={device}
        isActive={true}
        codeScanner={codeScanner}
      />
    );
  }

  return (
    <BaseScreen>
      <SectionList
        sections={sections}
        keyExtractor={item => item.address}
        ListHeaderComponent={
          <ScannerHeader
            hasPermission={hasPermission}
            onRequestPermission={validatePermission}
            onScan={scan}
            success={success}
            error={error}
          />
        }
        contentContainerStyle={styles.listContainer}
        renderItem={({ item }) => (
          <HistoryRow
            address={item.address}
            timestamp={item.timestamp}
            favorite={item.favorite}
          />
        )}
        renderSectionHeader={({ section: { title, data } }) =>
          data.length > 0 ? <AppText variant="subtitle">{title}</AppText> : null
        }
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <AppText variant="body">{STRINGS.SCANNER.EMPTY_STATE}</AppText>
          </View>
        }
      />
    </BaseScreen>
  );
}

export default ScannerScreen;
