import React, { useMemo, useState } from 'react';
import {
  Modal,
  View,
  FlatList,
  Image,
  TouchableOpacity,
  KeyboardAvoidingView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import AppText from 'components/AppText';
import AppTextInput from 'components/AppTextInput';
import AppButtonIcon from 'components/AppButtonIcon';
import { STRINGS } from 'constants/strings';
import { WHITE } from 'constants/colors';
import { PickerItem } from 'types/currencyPickerModal';
import { isIOS } from 'utils/platform';

import styles from './styles';

type Props = {
  visible: boolean;
  title: string;
  items: PickerItem[];
  onSelect: (item: PickerItem) => void;
  onClose: () => void;
  showPrice?: boolean;
};

const CurrencyPickerModal: React.FC<Props> = ({
  visible,
  title,
  items,
  onSelect,
  onClose,
  showPrice,
}) => {
  const [q, setQ] = useState('');

  const filtered = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return items;
    return items.filter(
      it =>
        it.symbol.toLowerCase().includes(s) ||
        it.name.toLowerCase().includes(s),
    );
  }, [q, items]);

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent
      onRequestClose={onClose}
    >
      <SafeAreaView style={styles.backdrop}>
        <KeyboardAvoidingView
          behavior={isIOS ? 'padding' : 'height'}
          style={styles.flex}
          keyboardVerticalOffset={0}
        >
          <View style={styles.sheet}>
            <View style={styles.closeButton}>
              <AppButtonIcon
                name="close"
                size={30}
                color={WHITE}
                onPress={onClose}
              />
            </View>
            <AppText variant="title" style={styles.title}>
              {title}
            </AppText>

            <AppTextInput
              style={styles.search}
              placeholder={STRINGS.EXCHANGE.SEARCH_PLACEHOLDER}
              value={q}
              onChangeText={setQ}
              autoFocus
            />

            <FlatList
              data={filtered}
              keyExtractor={i => i.id}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.row}
                  onPress={() => onSelect(item)}
                >
                  {item.image ? (
                    <Image source={{ uri: item.image }} style={styles.icon} />
                  ) : (
                    <View style={[styles.icon, styles.iconFallback]}>
                      <AppText>{item.symbol?.[0]}</AppText>
                    </View>
                  )}
                  <View style={styles.flex}>
                    <AppText variant="body">{item.name}</AppText>
                    <AppText variant="caption" colorType="secondary">
                      {item.symbol}
                    </AppText>
                  </View>
                  {showPrice && (
                    <View style={styles.priceBox}>
                      {typeof item.price === 'number' && (
                        <AppText variant="body">
                          ${item.price.toLocaleString()}
                        </AppText>
                      )}
                      {typeof item.change24h === 'number' && (
                        <AppText
                          variant="caption"
                          colorType={item.change24h >= 0 ? 'success' : 'error'}
                          style={styles.change}
                        >
                          {item.change24h >= 0 ? '+' : ''}
                          {item.change24h.toFixed(2)}%
                        </AppText>
                      )}
                    </View>
                  )}
                </TouchableOpacity>
              )}
              ListEmptyComponent={
                <View style={styles.empty}>
                  <AppText variant="body">{STRINGS.HOME.EMPTY}</AppText>
                </View>
              }
            />
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </Modal>
  );
};

export default CurrencyPickerModal;
