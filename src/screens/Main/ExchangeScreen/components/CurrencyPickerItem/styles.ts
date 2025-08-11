import { StyleSheet } from 'react-native';

import { BACKGROUND } from 'constants/colors';

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
  icon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginRight: 12,
    backgroundColor: BACKGROUND,
  },
  iconFallback: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  flex: {
    flex: 1,
  },
  priceBox: {
    alignItems: 'flex-end',
  },
  change: {
    marginTop: 2,
  },
});

export default styles;
