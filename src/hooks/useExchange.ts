import { useCallback, useEffect, useMemo, useState } from 'react';
import { useIsFocused } from '@react-navigation/native';

import {
  GetCoinsParams,
  useGetCoinsQuery,
  useGetSupportedFiatsQuery,
} from 'services/coinGeckoApi';
import { PickerItem } from 'types/currencyPickerModal';

const USD_ID = 'usd';
const BINANCE_ID = 'binance';

const QUERY: GetCoinsParams = {
  vs_currency: USD_ID,
  page: 1,
  per_page: 100,
};

const POLL_MS = 10000;

export function useExchange() {
  const isFocused = useIsFocused();
  const [amount, setAmount] = useState('0.5');
  const [isCryptoToFiat, setIsCryptoToFiat] = useState(true);
  const [crypto, setCrypto] = useState<PickerItem | null>(null);
  const [fiat, setFiat] = useState<PickerItem | null>(null);
  const [showCryptoPicker, setShowCryptoPicker] = useState(false);
  const [showFiatPicker, setShowFiatPicker] = useState(false);

  const {
    data: coins = [],
    isFetching: loadingCoins,
    error: coinsError,
  } = useGetCoinsQuery(QUERY, {
    pollingInterval: isFocused ? POLL_MS : 0,
    skipPollingIfUnfocused: true,
    refetchOnFocus: true,
    refetchOnReconnect: true,
  });

  const {
    data: fiats = [],
    isFetching: loadingFiats,
    error: fiatsError,
  } = useGetSupportedFiatsQuery(undefined, {
    pollingInterval: isFocused ? POLL_MS : 0,
    skipPollingIfUnfocused: true,
    refetchOnFocus: true,
    refetchOnReconnect: true,
  });

  const cryptoItems: PickerItem[] = useMemo(
    () =>
      coins.map(c => ({
        id: c.id,
        symbol: c.symbol?.toUpperCase(),
        name: c.name,
        image: c.image,
        price: c.current_price,
        change24h: c.price_change_percentage_24h,
      })),
    [coins],
  );

  const fiatItems: PickerItem[] = useMemo(
    () =>
      fiats.map(f => ({
        id: f.id,
        symbol: f.symbol,
        name: f.name,
      })),
    [fiats],
  );

  const preview = useMemo(() => {
    const a = parseFloat(amount || '0') || 0;
    if (!crypto || !fiat) return '—';
    if (isCryptoToFiat) {
      return `≈ ${
        a && crypto.price ? (a * (crypto.price || 0)).toLocaleString() : '--'
      } ${fiat.symbol}`;
    }
    return `≈ ${
      a && crypto.price ? (a / (crypto.price || 1)).toFixed(6) : '--'
    } ${crypto.symbol}`;
  }, [amount, crypto, fiat, isCryptoToFiat]);

  const swapDirection = () => setIsCryptoToFiat(v => !v);

  const handleSelectCurrency = useCallback(() => {
    if (!isCryptoToFiat) {
      setShowCryptoPicker(true);
    } else {
      setShowFiatPicker(true);
    }
  }, [isCryptoToFiat]);

  useEffect(() => {
    if (!crypto && cryptoItems.length) {
      setCrypto(cryptoItems.find(i => i.id === BINANCE_ID) || cryptoItems[0]);
    }
  }, [cryptoItems, crypto]);

  useEffect(() => {
    if (!fiat && fiatItems.length) {
      setFiat(fiatItems.find(i => i.id === USD_ID) || fiatItems[0]);
    }
  }, [fiatItems, fiat]);

  return {
    amount,
    setAmount,
    isCryptoToFiat,
    swapDirection,
    crypto,
    setCrypto,
    fiat,
    setFiat,
    showCryptoPicker,
    setShowCryptoPicker,
    showFiatPicker,
    setShowFiatPicker,
    cryptoItems,
    fiatItems,
    loadingCoins,
    loadingFiats,
    preview,
    error: coinsError || fiatsError,
    handleSelectCurrency,
  };
}
