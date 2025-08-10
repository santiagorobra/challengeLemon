import React from 'react';
import { SectionList, StyleSheet, View } from 'react-native';
import { Camera } from 'react-native-vision-camera';

import BaseScreen from 'components/BaseScreen';
import AppButton from 'components/AppButton';
import AppText from 'components/AppText';
import { STRINGS } from 'constants/strings';
import { useWalletScanner } from 'hooks/useWalletScanner';

import { HistoryRow } from './components/HistoryRow';
import styles from './styles';

function ScannerScreen() {
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
          <>
            <AppText style={styles.title} variant="title">
              {STRINGS.SCANNER.TITLE}
            </AppText>
            {!hasPermission ? (
              <AppButton
                variant="primary"
                title={STRINGS.SCANNER.PERMISSION_ACTION}
                onPress={validatePermission}
              />
            ) : (
              <>
                <AppButton
                  style={styles.scanButton}
                  variant="primary"
                  title={STRINGS.SCANNER.SCAN_ACTION}
                  onPress={scan}
                />
                {!!success && <AppText colorType="success">{success}</AppText>}
                {!!error && <AppText colorType="error">{error}</AppText>}
              </>
            )}
          </>
        }
        contentContainerStyle={styles.listContainer}
        renderItem={({ item }) => (
          <HistoryRow
            address={item.address}
            ts={item.ts}
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
