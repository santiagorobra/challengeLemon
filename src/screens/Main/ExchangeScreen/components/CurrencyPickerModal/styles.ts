import { StyleSheet } from 'react-native';

import { BACKGROUND } from 'constants/colors';

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
  },
  flex: {
    flex: 1,
  },
  sheet: {
    backgroundColor: BACKGROUND,
    padding: 16,
  },
  closeButton: {
    alignSelf: 'flex-end',
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
  empty: {
    paddingVertical: 24,
    alignItems: 'center',
  },
});

export default styles;
