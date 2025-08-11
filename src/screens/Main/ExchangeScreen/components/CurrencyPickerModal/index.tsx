import React, { useMemo, useState } from 'react';
import {
  Modal,
  View,
  FlatList,
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

import CurrencyPickerItem from '../CurrencyPickerItem';
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
  const [searchQuery, setSearchQuery] = useState('');

  const filtered = useMemo(() => {
    const s = searchQuery.trim().toLowerCase();
    if (!s) return items;
    return items.filter(
      it =>
        it.symbol.toLowerCase().includes(s) ||
        it.name.toLowerCase().includes(s),
    );
  }, [searchQuery, items]);

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
              value={searchQuery}
              onChangeText={setSearchQuery}
              autoFocus
            />

            <FlatList
              data={filtered}
              keyExtractor={i => i.id}
              renderItem={({ item }) => (
                <CurrencyPickerItem
                  key={item.id}
                  item={item}
                  showPrice={showPrice}
                  onSelect={onSelect}
                />
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
