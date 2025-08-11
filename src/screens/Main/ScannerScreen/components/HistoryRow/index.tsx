import React from 'react';
import { View } from 'react-native';
import { useDispatch } from 'react-redux';

import { deleteItem, toggleFavorite } from 'store/scannerHistorySlice';
import AppText from 'components/AppText';
import AppButtonIcon from 'components/AppButtonIcon';
import { GRAY, RED, YELLOW } from 'constants/colors';

import styles from './styles';

type Props = {
  address: string;
  timestamp: number;
  favorite: boolean;
};

const HistoryRow: React.FC<Props> = ({ address, timestamp, favorite }) => {
  const dispatch = useDispatch();

  return (
    <View style={styles.row}>
      <View style={styles.container}>
        <AppText>{address}</AppText>
        <AppText>• {new Date(timestamp).toLocaleString()}</AppText>
      </View>

      <AppButtonIcon
        onPress={() => dispatch(toggleFavorite(address))}
        name="star"
        color={favorite ? YELLOW : GRAY}
      />
      <AppButtonIcon
        onPress={() => dispatch(deleteItem(address))}
        name="trash"
        color={RED}
      />
    </View>
  );
};

export default HistoryRow;
