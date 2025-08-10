import { StyleSheet } from 'react-native';

import { BACKGROUND } from 'constants/colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: BACKGROUND,
  },
  title: {
    marginBottom: 20,
  },
  error: {
    textAlign: 'center',
    marginTop: 8,
  }
});

export default styles;
