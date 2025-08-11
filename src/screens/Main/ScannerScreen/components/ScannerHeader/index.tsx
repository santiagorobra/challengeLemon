import React from 'react';

import AppText from 'components/AppText';
import AppButton from 'components/AppButton';
import { STRINGS } from 'constants/strings';

import styles from './styles';

type Props = {
  hasPermission: boolean;
  onRequestPermission: () => void;
  onScan: () => void;
  success?: string | null;
  error?: string | null;
};

const ScannerHeader: React.FC<Props> = ({
  hasPermission,
  onRequestPermission,
  onScan,
  success,
  error,
}) => (
  <>
    <AppText style={styles.title} variant="title">
      {STRINGS.SCANNER.TITLE}
    </AppText>
    {!hasPermission ? (
      <AppButton
        variant="primary"
        title={STRINGS.SCANNER.PERMISSION_ACTION}
        onPress={onRequestPermission}
      />
    ) : (
      <>
        <AppButton
          style={styles.scanButton}
          variant="primary"
          title={STRINGS.SCANNER.SCAN_ACTION}
          onPress={onScan}
        />
        {!!success && <AppText colorType="success">{success}</AppText>}
        {!!error && <AppText colorType="error">{error}</AppText>}
      </>
    )}
  </>
);

export default ScannerHeader;
