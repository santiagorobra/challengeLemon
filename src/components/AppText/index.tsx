import React from 'react';
import { Text as RNText, TextProps, TextStyle } from 'react-native';

import { ERROR, GREEN, TEXT_PRIMARY, TEXT_SECONDARY } from 'constants/colors';

import { textStyles } from './styles';

export type Variant = 'title' | 'subtitle' | 'body' | 'caption';
type ColorType = 'primary' | 'secondary' | 'error' | 'success';

type Props = TextProps & {
  variant?: Variant;
  colorType?: ColorType;
  style?: TextStyle | TextStyle[];
};

const colorMap: Record<ColorType, string> = {
  primary: TEXT_PRIMARY,
  secondary: TEXT_SECONDARY,
  error: ERROR,
  success: GREEN,
};

const AppText = ({
  variant = 'body',
  colorType = 'primary',
  style,
  children,
  ...rest
}: Props) => (
  <RNText
    style={[textStyles[variant], { color: colorMap[colorType] }, style]}
    {...rest}
  >
    {children}
  </RNText>
);

export default AppText;
