import { StyleSheet } from 'react-native';

import { BACKGROUND } from 'constants/colors';

export const getStyles = (bottomTabBarHeight: number) =>
  StyleSheet.create({
    backdrop: {
      flex: 1,
      backgroundColor: BACKGROUND,
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
    list: {
      marginBottom: bottomTabBarHeight,
    },
  });
