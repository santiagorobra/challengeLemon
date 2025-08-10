import React from 'react';
import { View, ViewStyle, TextStyle } from 'react-native';

import AppText from 'components/AppText';
import AppButton from 'components/AppButton';

type Props = {
  label: string;
  value?: string | null;
  placeholder: string;
  onPress: () => void;
  disabled?: boolean;
  containerStyle?: ViewStyle;
  labelStyle?: TextStyle;
  pillStyle?: ViewStyle;
};

const SelectField = ({
  label,
  value,
  placeholder,
  onPress,
  disabled,
  containerStyle,
  labelStyle,
  pillStyle,
}: Props) => (
  <View style={containerStyle}>
    <AppText variant="body" colorType="secondary" style={labelStyle}>
      {label}
    </AppText>
    <AppButton
      variant="primary"
      title={value || placeholder}
      onPress={onPress}
      style={pillStyle}
      disabled={disabled}
    />
  </View>
);

export default SelectField;
