import { StyleSheet } from 'react-native';

import { ERROR, GREEN } from 'constants/colors';

const ICON_SIZE = 32;

export const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 14,
    borderBottomWidth: StyleSheet.hairlineWidth,
    height: 72,
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
  },
  right: {
    flex: 1,
    alignItems: 'flex-end',
  },
  icon: {
    width: ICON_SIZE,
    height: ICON_SIZE,
    borderRadius: ICON_SIZE / 2,
  },
  positive: {
    color: GREEN,
  },
  negative: {
    color: ERROR,
  },
});
