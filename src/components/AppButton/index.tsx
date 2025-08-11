import React from 'react';
import {
  TouchableOpacity,
  ActivityIndicator,
  ViewStyle,
  TextStyle,
} from 'react-native';

import { TEXT_PRIMARY } from 'constants/colors';
import AppText from 'components/AppText';
import { ButtonVariant } from 'types/button';

import { styles, variantStyles } from './styles';

interface Props {
  title: string;
  onPress: () => void;
  variant?: ButtonVariant;
  loading?: boolean;
  disabled?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

const AppButton: React.FC<Props> = ({
  title,
  onPress,
  variant = 'primary',
  loading = false,
  disabled = false,
  style,
  textStyle,
}) => (
  <TouchableOpacity
    style={[
      styles.base,
      variantStyles[variant],
      disabled && styles.disabled,
      style,
    ]}
    onPress={onPress}
    disabled={disabled || loading}
  >
    {loading ? (
      <ActivityIndicator color={TEXT_PRIMARY} />
    ) : (
      <AppText
        style={[styles.text, !!textStyle && textStyle]}
        colorType="primary"
        variant="body"
      >
        {title}
      </AppText>
    )}
  </TouchableOpacity>
);

export default AppButton;
