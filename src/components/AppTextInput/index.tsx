import React from 'react';
import { TextInput, TextInputProps, TextStyle } from 'react-native';

import { GRAY } from 'constants/colors';

import { styles } from './styles';

type Props = TextInputProps & {
  style?: TextStyle;
  placeholder: string;
  value: string | undefined;
  onChangeText: (text: string) => void;
};

const AppTextInput: React.FC<Props> = ({
  placeholder,
  value,
  onChangeText,
  style,
  ...rest
}) => (
  <TextInput
    placeholder={placeholder}
    placeholderTextColor={GRAY}
    value={value}
    onChangeText={onChangeText}
    style={[styles.container, style]}
    {...rest}
  />
);

export default AppTextInput;
