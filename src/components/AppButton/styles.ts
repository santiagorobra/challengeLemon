import { StyleSheet, ViewStyle } from 'react-native';

import { ERROR, MARINER } from 'constants/colors';
import { ButtonVariant } from 'types/button';

export const styles = StyleSheet.create({
  base: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontWeight: '600',
  },
  disabled: {
    opacity: 0.6,
  },
});

export const variantStyles: Record<ButtonVariant, ViewStyle> = {
  primary: { 
    backgroundColor: MARINER 
  },
  error: { 
    backgroundColor: ERROR 
  },
  outline: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: MARINER,
  },
};
