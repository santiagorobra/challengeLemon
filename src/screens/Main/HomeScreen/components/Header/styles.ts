import { StyleSheet } from 'react-native';

import { BACKGROUND } from 'constants/colors';

const styles = StyleSheet.create({
  header: {
    backgroundColor: BACKGROUND,
    paddingTop: 8,
    paddingBottom: 12,
  },
  sortBar: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 10,
  },
  flex: {
    flex: 1,
  },
  filtersRow: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 8,
  },
  searchInput: {
    marginTop: 12,
  },
});

export default styles;
