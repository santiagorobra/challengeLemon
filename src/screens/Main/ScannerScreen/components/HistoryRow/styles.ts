import { StyleSheet } from 'react-native';

import { MIDNIGHT_VAULT } from 'constants/colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  row: {
    flexDirection: 'row',
    gap: 12,
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: MIDNIGHT_VAULT,
  },
});

export default styles;
