import React, { useMemo, useState } from 'react';
import { Modal, View, FlatList, KeyboardAvoidingView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';

import AppText from 'components/AppText';
import AppTextInput from 'components/AppTextInput';
import AppButtonIcon from 'components/AppButtonIcon';
import { STRINGS } from 'constants/strings';
import { WHITE } from 'constants/colors';
import { PickerItem } from 'types/currencyPickerModal';
import { isIOS } from 'utils/platform';
import { filterBySearch } from 'utils/coinFilters';

import CurrencyPickerItem from '../CurrencyPickerItem';
import { getStyles } from './styles';

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
  const bottomTabBarHeight = useBottomTabBarHeight();
  const styles = useMemo(
    () => getStyles(bottomTabBarHeight),
    [bottomTabBarHeight],
  );
  const [searchQuery, setSearchQuery] = useState('');
  const filtered = useMemo(() => filterBySearch(items, searchQuery), [items, searchQuery]);

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
              style={styles.list}
              keyExtractor={i => i.id}
              showsVerticalScrollIndicator={false}
              initialNumToRender={12}
              maxToRenderPerBatch={8}
              windowSize={7}
              updateCellsBatchingPeriod={50}
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
