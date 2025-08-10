import { useCallback, useMemo, useState } from 'react';
import { Linking } from 'react-native';
import {
  useCameraDevice,
  useCameraPermission,
  useCodeScanner,
} from 'react-native-vision-camera';
import { useDispatch, useSelector } from 'react-redux';

import { addOrUpdate, HistoryItem } from 'store/scannerHistorySlice';
import { RootState } from 'store/rootReducer';
import { STRINGS } from 'constants/strings';
import { validateAddress } from 'utils/wallet';
import { useFocusEffect } from '@react-navigation/native';

export function useWalletScanner() {
  const dispatch = useDispatch();
  const device = useCameraDevice('back');
  const { hasPermission, requestPermission } = useCameraPermission();
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const scannerHistory = useSelector(
    (s: RootState) => (s.scannerHistory?.items ?? []) as HistoryItem[],
  );

  const sections = useMemo(() => {
    const favorites = scannerHistory.filter(item => item.favorite);
    const others = scannerHistory.filter(item => !item.favorite);
    return [
      { title: STRINGS.SCANNER.FAVORITES, data: favorites },
      { title: STRINGS.SCANNER.RECENT, data: others },
    ];
  }, [scannerHistory]);

  const codeScanner = useCodeScanner({
    codeTypes: ['qr', 'ean-13'],
    onCodeScanned: codes => {
      try {
        setIsScanning(false);

        if (!codes.length || !codes[0].value) {
          setError(STRINGS.SCANNER.INVALID_QR);
          return;
        }

        const scannedCode = codes[0].value.trim();

        if (!validateAddress(scannedCode)) {
          setError(STRINGS.SCANNER.INVALID_ADDRESS);
          return;
        }

        const exists = sections.some(section =>
          section.data.some(item => item.address === scannedCode),
        );

        if (exists) {
          setError(STRINGS.SCANNER.ERROR_ALREADY_EXISTS);
          return;
        }
        setSuccess(STRINGS.SCANNER.SUCCESS);
        dispatch(
          addOrUpdate({
            address: scannedCode,
            favorite: false,
            ts: Date.now(),
          }),
        );
      } catch (_) {
        setError(STRINGS.SCANNER.GENERIC_ERROR);
      }
    },
  });

  const clearStates = useCallback(() => {
    setError(null);
    setSuccess(null);
  }, [])

  const scan = useCallback(() => {
    clearStates();
    setIsScanning(true);
  }, [clearStates]);

  const openSettings = useCallback(() => {
    Linking.openSettings();
  }, []);

  const validatePermission = useCallback(async () => {
    const permission = await requestPermission();
    if (!permission) {
      openSettings();
    }
  }, [openSettings, requestPermission]);

  useFocusEffect(
    useCallback(() => {
      return () => {
        clearStates();
        setIsScanning(false);
      };
    }, [clearStates]),
  );

  return {
    device,
    hasPermission,
    codeScanner,
    error,
    scan,
    validatePermission,
    isScanning,
    success,
    sections,
  };
}
