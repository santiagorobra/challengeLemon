import React from 'react';
import { View } from 'react-native';

import BaseScreen from 'components/BaseScreen';
import AppText from 'components/AppText';
import AppTextInput from 'components/AppTextInput';
import AppButtonIcon from 'components/AppButtonIcon';
import ErrorComponent from 'components/ErrorComponent';
import { STRINGS } from 'constants/strings';
import { MARINER } from 'constants/colors';
import { useExchange } from 'hooks/useExchange';
import { getErrorMessage } from 'utils/errors';

import CurrencyPickerModal from './components/CurrencyPickerModal';
import SelectField from './components/SelectField';
import styles from './styles';

function ExchangeScreen() {
  const {
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
    error,
  } = useExchange();

  if (error) {
    return <ErrorComponent error={getErrorMessage(error)} />;
  }

  return (
    <BaseScreen>
      <AppText variant="title" style={styles.title}>
        {STRINGS.EXCHANGE.TITLE}
      </AppText>

      <View style={styles.row}>
        <SelectField
          label={STRINGS.EXCHANGE.FROM}
          value={isCryptoToFiat ? crypto?.symbol ?? null : fiat?.symbol ?? null}
          placeholder={
            isCryptoToFiat
              ? STRINGS.EXCHANGE.SELECT_CRYPTO
              : STRINGS.EXCHANGE.SELECT_FIAT
          }
          onPress={() =>
            isCryptoToFiat ? setShowCryptoPicker(true) : setShowFiatPicker(true)
          }
          disabled={isCryptoToFiat ? loadingCoins : loadingFiats}
          containerStyle={styles.col}
          labelStyle={styles.label}
          pillStyle={styles.pill}
        />

        <View style={styles.center}>
          <AppButtonIcon
            onPress={swapDirection}
            name="swap-horizontal"
            color={MARINER}
          />
        </View>

        <SelectField
          label={STRINGS.EXCHANGE.TO}
          value={
            !isCryptoToFiat ? crypto?.symbol ?? null : fiat?.symbol ?? null
          }
          placeholder={
            !isCryptoToFiat
              ? STRINGS.EXCHANGE.SELECT_CRYPTO
              : STRINGS.EXCHANGE.SELECT_FIAT
          }
          onPress={() =>
            !isCryptoToFiat
              ? setShowCryptoPicker(true)
              : setShowFiatPicker(true)
          }
          disabled={!isCryptoToFiat ? loadingCoins : loadingFiats}
          containerStyle={styles.col}
          labelStyle={styles.label}
          pillStyle={styles.pill}
        />
      </View>

      <View style={styles.inputBlock}>
        <AppText variant="body" colorType="secondary" style={styles.label}>
          {STRINGS.EXCHANGE.AMOUNT} (
          {isCryptoToFiat ? crypto?.symbol : fiat?.symbol})
        </AppText>
        <AppTextInput
          value={amount}
          onChangeText={setAmount}
          keyboardType="numeric"
          placeholder={isCryptoToFiat ? '0.00' : '0'}
        />
      </View>

      <View style={styles.preview}>
        <AppText variant="subtitle">{preview}</AppText>
      </View>

      <CurrencyPickerModal
        visible={showCryptoPicker}
        title={STRINGS.EXCHANGE.PICKER_TITLE_CRYPTO}
        items={cryptoItems}
        onClose={() => setShowCryptoPicker(false)}
        onSelect={item => {
          setCrypto(item);
          setShowCryptoPicker(false);
        }}
        showPrice
      />

      <CurrencyPickerModal
        visible={showFiatPicker}
        title={STRINGS.EXCHANGE.PICKER_TITLE_FIAT}
        items={fiatItems}
        onClose={() => setShowFiatPicker(false)}
        onSelect={item => {
          setFiat(item);
          setShowFiatPicker(false);
        }}
      />
    </BaseScreen>
  );
}

export default ExchangeScreen;
