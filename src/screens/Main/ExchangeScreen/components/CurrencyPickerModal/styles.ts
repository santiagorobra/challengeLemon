import { StyleSheet } from 'react-native';

import { BACKGROUND } from 'constants/colors';

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
  },
  sheet: {
    backgroundColor: BACKGROUND,
    padding: 16,
  },
  title: {
    marginBottom: 12,
  },
  search: {
    flex: 0,
    marginBottom: 8,
  },
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
  empty: {
    paddingVertical: 24,
    alignItems: 'center',
  },
  closeButton: {
    alignSelf: 'flex-end',
  },
});

export default styles;
